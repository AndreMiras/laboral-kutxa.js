import assert from "assert";
import fetch, { Response } from "node-fetch";
import { API_URL } from "./index";
import { LoginResponse, MyProductsResponse, Product } from "./types";

const handleStatusCode = async (response: Response) => {
  if (response.ok) return;
  const body = await response.text();
  throw new Error(`HTTP error! Status: ${response.status}. Body: ${body}`);
};

const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const resource = API_URL + "/App/api/Logon";
  const body = {
    primeravez: false,
    dispositivo: { sistemaOperativo: "Android", tipoDispositivo: "Movil" },
    versionApp: "7.2.6",
    usuario: username,
    pwd: password,
  };
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(resource, options);
  await handleStatusCode(response);
  const data = await response.json();
  return data;
};

const getMyProducts = async (token: string): Promise<MyProductsResponse> => {
  const resource = API_URL + "/srv/api/mis-productos";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: `lkId=${token}`,
    },
  };
  const response = await fetch(resource, options);
  await handleStatusCode(response);
  const data = await response.json();
  return data;
};

const showProduct = (product: Product) =>
  console.log({ productAlias: product.alias });

const showProducts = (productsResponse: MyProductsResponse) => {
  productsResponse.misProductos.map(showProduct);
};

const main = async () => {
  const { USERNAME, PASSWORD } = process.env;
  assert.ok(USERNAME);
  assert.ok(PASSWORD);
  const loginResponse = await exports.login(USERNAME, PASSWORD);
  const { token } = loginResponse;
  const products = await exports.getMyProducts(token);
  showProducts(products);
  const { _CuentasCorrientes: currentAccount, _Financiacion: financing } =
    products._Importes;
  console.log({ currentAccount, financing });
};

const mainIsModule = (module: any, main: NodeModule) => main === module;

/* istanbul ignore next */
mainIsModule(require.main, module) && main();

export { login, getMyProducts, main };
