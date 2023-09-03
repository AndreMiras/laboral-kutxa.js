/**
 * This isn't unit tests per se, but rather compile time checks of type definition
 * vs actual backend response data.
 * It also gives more concret examples of backend responses.
 */
import { LoginResponse, Aviso, Importes } from "./types";

const loginResponse: LoginResponse = {
  apellido1: "APELLIDO1",
  apellido2: "APELLIDO2",
  codClienteInterno: "0123456789",
  esMiDispositivo: true,
  estaEnrolado: false,
  haSolicitadoEnOtroCanal: false,
  nif: "00000000T",
  nombre: "NOMBRE",
  perfilUsuarioId: "autonomo",
  returnURL:
    "https://lkweb.laboralkutxa.com/Redirect/IniciarWeb.aspx?Usuario=00000000T&Idioma=&userAgent=&modeloDispositivo=&tipoWeb=LKNET&returnURL=&JWTToken=JWTToken&aviso=&avisos_Abiertos=False",
  tieneAlertasContratadas: true,
  tieneCorreo: true,
  token: "JWTToken",
  yaTieneOtroDispositivos: true,
  mensaje: "",
  resultado: 0,
};

const aviso1: Aviso = {
  id: "00000000-0000-0000-0000-000000000001",
  severidad: "ok",
  orden: 1,
  mensaje:
    "Has hecho una transferencia al extranjero en la Banca Online de 1.234,56 EUR.",
  tieneDetalle: true,
  noMostrar: false,
  fechaAlta: "2023-08-31T11:22:33.444Z",
  accion: "generico",
  tipo: "mensaje",
  informacionAviso: {},
};
const aviso2: Aviso = {
  id: "00000000-0000-0000-0000-000000000002",
  severidad: "ok",
  orden: 2,
  mensaje:
    "Has hecho un pago de 123,45€ con la tarjeta 0000000123456789 en el comercio PAYPAL *LEROYMERLIN      3. ",
  tieneDetalle: true,
  noMostrar: false,
  fechaAlta: "2023-09-11T22:33:44.555Z",
  accion: "generico",
  tipo: "mensaje",
  informacionAviso: {},
};

const avisos: Aviso[] = [aviso1, aviso2];

const importes: Importes = {
  _MisAhorros: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  _MisAhorrosParticular: {
    cantidad: 4665.76,
    moneda: "EUR",
  },
  _MisAhorrosNegocio: {
    cantidad: 0,
    moneda: "EUR",
  },
  _CuentasCorrientes: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  _CuentasCorrientesParticular: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  _CuentasCorrientesNegocio: {
    cantidad: 0,
    moneda: "EUR",
  },
  _CuentasAhorro: {
    cantidad: 0,
    moneda: "EUR",
  },
  _CuentasAhorroParticular: {
    cantidad: 0,
    moneda: "EUR",
  },
  _CuentasAhorroNegocio: {
    cantidad: 0,
    moneda: "EUR",
  },
  _Depositos: {
    cantidad: 0,
    moneda: "EUR",
  },
  _Fondos: {
    cantidad: 0,
    moneda: "EUR",
  },
  _Bolsa: {
    cantidad: 0,
    moneda: "EUR",
  },
  _AportacionesLK: {
    cantidad: 0,
    moneda: "EUR",
  },
  _Planes: {
    cantidad: 0,
    moneda: "EUR",
  },
  _Financiacion: {
    cantidad: 123456.78,
    moneda: "EUR",
  },
  _FinanciacionParticular: {
    cantidad: 123456.78,
    moneda: "EUR",
  },
  _FinanciacionNegocio: {
    cantidad: 0,
    moneda: "EUR",
  },
  _RemesasImportacion: {
    cantidad: 0,
    moneda: "EUR",
  },
  _RemesasExportacion: {
    cantidad: 0,
    moneda: "EUR",
  },
  _DispuestoTarjetas: {
    cantidad: 0,
    moneda: "EUR",
  },
};
