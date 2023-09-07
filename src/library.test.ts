import chai, { expect } from "chai";
import sinon from "sinon";
import nock from "nock";
import sinonChai from "sinon-chai";
import * as library from "./library";
import { LoginResponse, MyProductsResponse, Product } from "./types";
import { API_URL } from "./constants";

chai.use(require("chai-as-promised"));
chai.use(sinonChai);

describe("Library", () => {
  afterEach(() => {
    nock.cleanAll();
    sinon.restore();
  });

  describe("login", () => {
    it("should login successfully", async () => {
      const mockResponse = {
        token: "testToken",
      };
      nock(API_URL).post("/App/api/Logon").reply(200, mockResponse);
      const result = await library.login("testUser", "testPass");
      expect(result).to.deep.equal(mockResponse);
    });

    it("should throw an error on unsuccessful login", async () => {
      nock(API_URL).post("/App/api/Logon").reply(400, "Error logging in");
      await expect(library.login("testUser", "testPass")).to.be.rejectedWith(
        Error,
        "HTTP error! Status: 400. Body: Error logging in",
      );
    });
  });

  describe("getMyProducts", () => {
    it("should fetch products successfully", async () => {
      const mockResponse = {
        misProductos: [{ alias: "testProduct" }],
      };
      nock(API_URL, {
        reqheaders: {
          cookie: "lkId=testToken",
        },
      })
        .get("/srv/api/mis-productos")
        .reply(200, mockResponse);
      const result = await library.getMyProducts("testToken");
      expect(result).to.deep.equal(mockResponse);
    });

    it("should throw an error on unsuccessful fetch", async () => {
      nock(API_URL, {
        reqheaders: {
          cookie: "lkId=testToken",
        },
      })
        .get("/srv/api/mis-productos")
        .reply(400, "Error fetching products");
      await expect(library.getMyProducts("testToken")).to.be.rejectedWith(
        Error,
        "HTTP error! Status: 400. Body: Error fetching products",
      );
    });
  });

  describe("main", () => {
    let originalUsername: string | undefined;
    let originalPassword: string | undefined;

    beforeEach(() => {
      // Store the original values
      originalUsername = process.env.USERNAME;
      originalPassword = process.env.PASSWORD;
    });

    afterEach(() => {
      process.env.USERNAME = originalUsername;
      process.env.PASSWORD = originalPassword;
    });

    it("should log the correct information", async () => {
      const consoleLogSpy = sinon.spy(console, "log");
      sinon
        .stub(library, "login")
        .resolves({ token: "testToken" } as LoginResponse);
      sinon.stub(library, "getMyProducts").resolves({
        misProductos: [{ alias: "product1" }, { alias: "product2" }],
        _Importes: {
          _CuentasCorrientes: 123,
          _Financiacion: 456,
        },
      } as any);
      process.env.USERNAME = "username";
      process.env.PASSWORD = "password";
      await library.main();
      expect(consoleLogSpy).to.have.been.calledWith({
        productAlias: "product1",
      });
      expect(consoleLogSpy).to.have.been.calledWith({
        productAlias: "product2",
      });
      expect(consoleLogSpy).to.have.been.calledWith({
        currentAccount: 123,
        financing: 456,
      });
    });
  });
});
