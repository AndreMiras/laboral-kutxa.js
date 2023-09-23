# laboral-kutxa.js

[![Tests](https://github.com/AndreMiras/laboral-kutxa.js/workflows/Tests/badge.svg)](https://github.com/AndreMiras/laboral-kutxa.js/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/AndreMiras/laboral-kutxa.js/badge.svg?branch=main)](https://coveralls.io/github/AndreMiras/laboral-kutxa.js?branch=main)
[![Documentation](https://github.com/AndreMiras/laboral-kutxa.js/workflows/Documentation/badge.svg)](https://github.com/AndreMiras/laboral-kutxa.js/actions/workflows/documentation.yml)
[![npm version](https://badge.fury.io/js/laboral-kutxa.svg)](https://badge.fury.io/js/laboral-kutxa)

Unofficial Laboral Kutxa JS library

## Install

```sh
npm install laboral-kutxa
```

## Library Usage

Reading through the `misProductos` list:

```js
import { login, getMyProducts } from "laboral-kutxa";

const main = async () => {
  const { USERNAME, PASSWORD } = process.env;
  const { token } = await login(USERNAME, PASSWORD);
  const products = await getMyProducts(token);
  products.misProductos.map(({ alias, grupo }) => ({ alias, grupo }));
};
```

Output:

```js
[
  { alias: "CUENTA 0,0", grupo: "cuentasCorrientes" },
  { alias: "VISA ELECTRÓN", grupo: "tarjetas" },
  { alias: "PRESTAMO", grupo: "prestamos" },
];
```

Accessing the aggregated amounts per account types:

```js
const products = await getMyProducts(token);
const { _CuentasCorrientes: currentAccount, _Financiacion: financing } =
  products._Importes;
console.log({ currentAccount, financing });
```

Output:

```js
{
  currentAccount: { cantidad: 1234.56, moneda: 'EUR' },
  financing: { cantidad: 123456.78, moneda: 'EUR' }
}
```

## CLI Usage

It's also possible to consume the CLI directly to access the account.

```sh
npx laboral-kutxa --balance
```
