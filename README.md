# laboral-kutxa.js

[![Tests](https://github.com/AndreMiras/laboral-kutxa.js/workflows/Tests/badge.svg)](https://github.com/AndreMiras/laboral-kutxa.js/actions/workflows/tests.yml)

Unofficial Laboral Kutxa JS library

## Usage

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
