import { expect } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as pq from "proxyquire";
import * as sinon from "sinon";
import * as api from "./library";
import * as cli from "./cli";
import { APPLICATION_NAME } from "./constants";

const proxyquire = pq.noCallThru();

describe("asyncRead", () => {
  let readStub: sinon.SinonStub;
  let cliProxy: any;

  beforeEach(() => {
    readStub = sinon.stub();
    cliProxy = proxyquire("./cli", { read: readStub });
  });

  it("should resolve with result on successful read", async () => {
    const expected = "successful read";
    readStub.callsFake((_, callback) => callback(null, expected));
    const result = await cliProxy.asyncRead({ prompt: "Enter something: " });
    expect(result).to.equal(expected);
  });

  it("should reject with error on failed read", async () => {
    const expectedError = new Error("failed read");
    readStub.callsFake((_, callback) => callback(expectedError));
    return expect(
      cliProxy.asyncRead({ prompt: "Enter something: " }),
    ).to.eventually.be.rejectedWith(expectedError);
  });
});

describe("promptLogin", () => {
  let readStub: sinon.SinonStub;
  let cliProxy: any;

  beforeEach(() => {
    readStub = sinon.stub();
    cliProxy = proxyquire("./cli", { read: readStub });
  });

  it("should prompt for username and password", async () => {
    const expectedUsername = "username";
    const expectedPassword = "password";
    readStub
      .onCall(0)
      .callsFake((_, callback: (err: any, result: string) => void) =>
        callback(null, expectedUsername),
      );
    readStub
      .onCall(1)
      .callsFake((_, callback: (err: any, result: string) => void) =>
        callback(null, expectedPassword),
      );
    const { username, password } = await cliProxy.promptLogin();
    expect(username).to.equal(expectedUsername);
    expect(password).to.equal(expectedPassword);
    expect(readStub).to.have.been.calledTwice;
  });
});

describe("userCacheDir", () => {
  const originalProcess = process;
  const testCases: { platform: NodeJS.Platform; expected: string }[] = [
    { platform: "linux", expected: "/.cache/someapp" },
    { platform: "darwin", expected: "/Library/Caches/someapp" },
    { platform: "win32", expected: "/AppData/Local/someapp/Cache" },
    { platform: "unknown" as any, expected: "/.cache/someapp" },
  ];

  testCases.forEach(({ platform, expected }) => {
    it(`should return correct path for ${platform}`, () => {
      sinon.stub(process, "platform").value(platform);
      const result = cli.userCacheDir("someapp");
      expect(result)
        .to.be.a("string")
        .and.satisfy((res: string) => res.endsWith(expected));
    });
  });
});

describe("getSessionCachePath", () => {
  it("base", () => {
    const expected = "/laboral-kutxa/session.cache";
    const result = cli.getSessionCachePath();
    expect(result)
      .to.be.a("string")
      .and.satisfy((res: string) => res.endsWith(expected));
  });
});

describe("getCachedSessionInfo", () => {
  let readFileSyncStub: sinon.SinonStub;
  let cliProxy: any;

  beforeEach(() => {
    readFileSyncStub = sinon.stub();
    cliProxy = proxyquire("./cli", { fs: { readFileSync: readFileSyncStub } });
  });

  it("base", () => {
    const expected = { foo: "bar" };
    readFileSyncStub.returns(Buffer.from(JSON.stringify(expected)));
    const result = cliProxy.getCachedSessionInfo();
    expect(result).to.deep.equal(expected);
    expect(readFileSyncStub).to.have.been.calledOnce;
  });
});

describe("cacheSessionInfo", () => {
  let mkdirSyncStub: sinon.SinonStub;
  let writeFileSyncStub: sinon.SinonStub;
  let cliProxy: any;

  beforeEach(() => {
    mkdirSyncStub = sinon.stub();
    writeFileSyncStub = sinon.stub();
    cliProxy = proxyquire("./cli", {
      fs: { mkdirSync: mkdirSyncStub, writeFileSync: writeFileSyncStub },
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should cache session info correctly", () => {
    const token = "token";
    const expectedPath = "path/to/session";
    const expectedSessionInfo = { token };
    sinon.stub(cliProxy, "getSessionCachePath").returns(expectedPath);
    cliProxy.cacheSessionInfo(token);
    expect(mkdirSyncStub).to.have.been.calledOnceWith(
      path.dirname(expectedPath),
      { recursive: true },
    );
    expect(writeFileSyncStub).to.have.been.calledOnceWith(
      expectedPath,
      JSON.stringify(expectedSessionInfo),
    );
  });
});

describe("login", () => {
  let promptLoginStub: sinon.SinonStub;
  let loginStub: sinon.SinonStub;

  beforeEach(() => {
    promptLoginStub = sinon.stub(cli, "promptLogin");
    loginStub = sinon.stub(api, "login");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should prompt for login and return a token", async () => {
    const expectedToken = "token";
    const username = "username";
    const password = "password";
    promptLoginStub.resolves({ username, password });
    loginStub.resolves(expectedToken);
    const token = await cli.login();
    expect(token).to.equal(expectedToken);
    expect(promptLoginStub).to.have.been.calledOnce;
    expect(loginStub).to.have.been.calledOnceWith(username, password);
  });
});

describe("processLogin", () => {
  let loginStub: sinon.SinonStub;
  let cacheSessionInfoStub: sinon.SinonStub;

  beforeEach(() => {
    loginStub = sinon.stub(cli, "login");
    cacheSessionInfoStub = sinon.stub(cli, "cacheSessionInfo");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call login and cacheSessionInfo with correct arguments and return token", async () => {
    const expectedToken = "token";
    loginStub.resolves({ token: expectedToken });
    const actualToken = await cli.processLogin();
    expect(actualToken).to.equal(expectedToken);
    expect(loginStub).to.have.been.calledOnce;
    expect(cacheSessionInfoStub).to.have.been.calledOnceWith(expectedToken);
  });
});

describe("getSessionOrLogin", () => {
  let getCachedSessionInfoStub: sinon.SinonStub;
  let processLoginStub: sinon.SinonStub;

  beforeEach(() => {
    getCachedSessionInfoStub = sinon.stub(cli, "getCachedSessionInfo");
    processLoginStub = sinon.stub(cli, "processLogin");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return token from cache if session is cached", async () => {
    const expectedToken = "token";
    getCachedSessionInfoStub.resolves({ token: expectedToken });
    const actualToken = await cli.getSessionOrLogin();
    expect(actualToken).to.equal(expectedToken);
    expect(getCachedSessionInfoStub).to.have.been.calledOnce;
    expect(processLoginStub).to.not.have.been.called;
  });

  it("should call processLogin if no session is cached", async () => {
    const expectedToken = "token";
    getCachedSessionInfoStub.rejects();
    processLoginStub.resolves(expectedToken);
    const actualToken = await cli.getSessionOrLogin();
    expect(actualToken).to.equal(expectedToken);
    expect(getCachedSessionInfoStub).to.have.been.calledOnce;
    expect(processLoginStub).to.have.been.calledOnce;
  });
});

describe("generateBalanceStrings", () => {
  it("should correctly generate balance strings and filter out zero balances", () => {
    const importes = {
      account1: { cantidad: 100, moneda: "USD" },
      account2: { cantidad: 0, moneda: "USD" },
      account3: { cantidad: 200, moneda: "EUR" },
    } as any;
    const expected = ["account1: 100 USD", "account3: 200 EUR"];
    const actual = cli.generateBalanceStrings(importes);
    expect(actual).to.eql(expected);
  });

  it("should return an empty array when all balances are zero", () => {
    const importes = {
      account1: { cantidad: 0, moneda: "USD" },
      account2: { cantidad: 0, moneda: "USD" },
    } as any;
    const expected: string[] = [];
    const actual = cli.generateBalanceStrings(importes);
    expect(actual).to.eql(expected);
  });

  it("should return an empty array when there is no account", () => {
    const importes = {} as any;
    const expected: string[] = [];
    const actual = cli.generateBalanceStrings(importes);
    expect(actual).to.eql(expected);
  });
});

describe("printBalance", () => {
  let logSpy: sinon.SinonSpy;

  beforeEach(() => {
    logSpy = sinon.spy(console, "log");
  });

  afterEach(() => {
    logSpy.restore();
  });

  it("should correctly print non-zero balances", () => {
    const importes = {
      account1: { cantidad: 100, moneda: "USD" },
      account2: { cantidad: 0, moneda: "USD" },
      account3: { cantidad: 200, moneda: "EUR" },
    } as any;
    cli.printBalance(importes);
    expect(logSpy.calledTwice).to.be.true;
    expect(logSpy.calledWith("account1: 100 USD")).to.be.true;
    expect(logSpy.calledWith("account3: 200 EUR")).to.be.true;
  });
});

describe("processBalance", () => {
  let getSessionOrLoginStub: sinon.SinonStub;
  let getMyProductsStub: sinon.SinonStub;
  let logSpy: sinon.SinonSpy;
  let printBalanceStub: sinon.SinonStub;

  beforeEach(() => {
    getSessionOrLoginStub = sinon.stub(cli, "getSessionOrLogin");
    getMyProductsStub = sinon.stub(api, "getMyProducts");
    logSpy = sinon.spy(console, "log");
    printBalanceStub = sinon.stub(cli, "printBalance");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call the dependent methods with correct arguments", async () => {
    const fakeToken = "token";
    getSessionOrLoginStub.resolves(fakeToken);
    const fakeProducts = {
      _Importes: {
        account1: { cantidad: 100, moneda: "USD" },
      },
    };
    getMyProductsStub.resolves(fakeProducts);
    await cli.processBalance();
    expect(getSessionOrLoginStub.calledOnce).to.be.true;
    expect(getMyProductsStub.calledOnceWith(fakeToken)).to.be.true;
    expect(printBalanceStub.calledOnceWith(fakeProducts._Importes)).to.be.true;
  });
});

describe("version", () => {
  let logSpy: sinon.SinonSpy;
  let originalVersion: string | undefined;

  beforeEach(() => {
    originalVersion = process.env.npm_package_version;
    process.env.npm_package_version = "1.0.0-test";
    logSpy = sinon.spy(console, "log");
  });

  afterEach(() => {
    process.env.npm_package_version = originalVersion;
    logSpy.restore();
  });

  it("should log the correct version", () => {
    cli.version();
    expect(logSpy.calledOnceWith("1.0.0-test")).to.be.true;
  });
});

describe("help", () => {
  let logStub: sinon.SinonStub;

  beforeEach(() => {
    logStub = sinon.stub(console, "log");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should print the help message", () => {
    cli.help();
    expect(logStub.calledOnce).to.be.true;
  });
});

describe("main", () => {
  let processLoginStub: sinon.SinonStub;
  let processBalanceStub: sinon.SinonStub;
  let helpStub: sinon.SinonStub;
  let versionStub: sinon.SinonStub;

  beforeEach(() => {
    processLoginStub = sinon.stub(cli, "processLogin");
    processBalanceStub = sinon.stub(cli, "processBalance");
    helpStub = sinon.stub(cli, "help");
    versionStub = sinon.stub(cli, "version");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call processLogin when argv includes --login", () => {
    cli.main(["node", "script.js", "--login"]);
    expect(processLoginStub.calledOnce).to.be.true;
  });

  it("should call processBalance when argv includes --balance", () => {
    cli.main(["node", "script.js", "--balance"]);
    expect(processBalanceStub.calledOnce).to.be.true;
  });

  it("should call help when argv includes --help or is invalid", () => {
    cli.main(["node", "script.js", "--help"]);
    expect(helpStub.calledOnce).to.be.true;
    helpStub.resetHistory();
    cli.main(["node", "script.js", "--invalidArg"]);
    expect(helpStub.calledOnce).to.be.true;
  });

  it("should call version when argv includes --version", () => {
    cli.main(["node", "script.js", "--version"]);
    expect(versionStub.calledOnce).to.be.true;
  });

  it("should call help by default when no argument is provided", () => {
    cli.main(["node", "script.js"]);
    expect(helpStub.calledOnce).to.be.true;
  });
});
