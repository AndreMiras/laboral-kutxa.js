#!/usr/bin/env node
import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import read from "read";
import * as api from "./index";
import { Amount, Amounts } from "./types";
import { APPLICATION_NAME, SESSION_CACHE_FILENAME } from "./constants";

const asyncRead = (options: any): Promise<string> =>
  new Promise((resolve, reject) =>
    read(
      options,
      (error: any, result: string) =>
        (error && reject(error)) || resolve(result),
    ),
  );

/*
 * Prompt user for credentials and the return them.
 */
const promptLogin = async () => {
  const username = await exports.asyncRead({ prompt: "username: " });
  const password = await exports.asyncRead({
    prompt: "password: ",
    silent: true,
  });
  return { username, password };
};

const getCacheDirWin = (appname: string): string =>
  path.join(os.homedir(), "AppData", "Local", appname, "Cache");

const getCacheDirMac = (appname: string): string =>
  path.join(os.homedir(), "Library", "Caches", appname);

const getCacheDirUnix = (appname: string): string =>
  path.join(os.homedir(), ".cache", appname);

const platformCacheDirMap: Record<string, (appname: string) => string> = {
  win32: getCacheDirWin,
  darwin: getCacheDirMac,
  default: getCacheDirUnix,
};

const getUserCacheDirFn: () => (appname: string) => string = () =>
  platformCacheDirMap[os.platform()] || platformCacheDirMap.default;

/*
 * Return OS dependent base data directory (Python user_cache_dir() port).
 */
const userCacheDir = (appname: string): string => getUserCacheDirFn()(appname);

/*
 * Return file path used to store the session cookie.
 */
const getSessionCachePath = () =>
  path.join(exports.userCacheDir(APPLICATION_NAME), SESSION_CACHE_FILENAME);

/*
 * Return session token from cache.
 */
const getCachedSessionInfo = () =>
  JSON.parse(fs.readFileSync(exports.getSessionCachePath()).toString());

/*
 * Cache session token to disk.
 */
const cacheSessionInfo = (token: string) => {
  const sessionCachePath = exports.getSessionCachePath();
  const cachedSessionInfo = {
    token,
  };
  fs.mkdirSync(path.dirname(sessionCachePath), { recursive: true });
  fs.writeFileSync(sessionCachePath, JSON.stringify(cachedSessionInfo));
};

/*
 * Login and return session token.
 */
const login = async () => {
  const { username, password } = await exports.promptLogin();
  const token = await api.login(username, password);
  return token;
};

/*
 * Login and cache the token.
 */
const processLogin = async () => {
  const { token } = await exports.login();
  exports.cacheSessionInfo(token);
  return token;
};

/*
 * Retrieve session from cache or prompt login then store token.
 */
const getSessionOrLogin = async () => {
  try {
    const { token } = await exports.getCachedSessionInfo();
    return token;
  } catch (error: unknown) {
    return exports.processLogin();
  }
};

const generateBalanceStrings = (importes: Amounts): string[] =>
  Object.entries(importes)
    .filter(([, { cantidad }]) => cantidad !== 0)
    .map(
      ([accountType, { cantidad, moneda }]) =>
        `${accountType}: ${cantidad} ${moneda}`,
    );

/*
 * Print per "importe" balance if not zero.
 */
const printBalance = (importes: Amounts): void =>
  exports
    .generateBalanceStrings(importes)
    .forEach((balance: Amount) => console.log(balance));

/*
 * Retrieve and print balance per card.
 */
const processBalance = async () => {
  const token = await exports.getSessionOrLogin();
  const products = await api.getMyProducts(token);
  exports.printBalance(products._Importes);
};

const version = () => console.log(process.env.npm_package_version);

const help = () => {
  console.log(
    // eslint-disable-line no-console
    "Usage:\n" +
      "laboralkutxa --help\tthis message\n" +
      "laboralkutxa --login\tlogins and caches the session\n" +
      "laboralkutxa --balance\tprints non zero account balances\n" +
      "laboralkutxa --version\tprints the version",
  );
};

const main = (argv: string[]) => {
  const args = argv.slice(2);
  const arg2FunctionMap: { [key: string]: any } = {
    login: exports.processLogin,
    balance: exports.processBalance,
    help: exports.help,
    version: exports.version,
  };
  // defaults to help if unknown
  const arg2Function = (arg: string) => arg2FunctionMap[arg] || exports.help;
  // defaults to help if no args provided
  const arg = args[0] ? args[0].replace(/^--/, "") : "help";
  const fun = arg2Function(arg);
  fun();
};

const mainIsModule = (module: any, main: NodeModule) => main === module;

export {
  asyncRead,
  promptLogin,
  userCacheDir,
  getSessionCachePath,
  getCachedSessionInfo,
  cacheSessionInfo,
  login,
  processLogin,
  getSessionOrLogin,
  generateBalanceStrings,
  printBalance,
  processBalance,
  help,
  version,
  main,
};

/* istanbul ignore next */
mainIsModule(require.main, module) && main(process.argv);
