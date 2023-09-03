interface LoginResponse {
  apellido1: string;
  apellido2: string;
  codClienteInterno: string;
  esMiDispositivo: boolean;
  estaEnrolado: boolean;
  haSolicitadoEnOtroCanal: boolean;
  nif: string;
  nombre: string;
  perfilUsuarioId: string;
  returnURL: string;
  tieneAlertasContratadas: boolean;
  tieneCorreo: boolean;
  token: string;
  yaTieneOtroDispositivos: boolean;
  mensaje: string;
  resultado: number;
}

interface Product {
  alias: string;
}

interface Avisos {
  id: string;
  severidad: string;
  orden: number;
  mensaje: string;
  tieneDetalle: boolean;
  noMostrar: boolean;
  fechaAlta: string;
  accion: string;
  tipo: string;
}

interface Importe {
  cantidad: number;
  moneda: string;
}

interface Importes {
  _MisAhorros: Importe;
  _MisAhorrosParticular: Importe;
  _MisAhorrosNegocio: Importe;
  _CuentasCorrientes: Importe;
  _CuentasCorrientesParticular: Importe;
  _CuentasCorrientesNegocio: Importe;
  _CuentasAhorro: Importe;
  _CuentasAhorroParticular: Importe;
  _CuentasAhorroNegocio: Importe;
  _Depositos: Importe;
  _Fondos: Importe;
  _Bolsa: Importe;
  _AportacionesLK: Importe;
  _Planes: Importe;
  _Financiacion: Importe;
  _FinanciacionParticular: Importe;
  _FinanciacionNegocio: Importe;
  _RemesasImportacion: Importe;
  _RemesasExportacion: Importe;
  _DispuestoTarjetas: Importe;
}

interface MyProductsResponse {
  avisos: Avisos[];
  mensaje: string;
  misProductos: Product[];
  numeroOperacionesPendientesFirma: number;
  resultado: number;
  seguros: string[];
  importes: Importes;
}

export type {
  LoginResponse,
  Product,
  Avisos,
  Importe,
  Importes,
  MyProductsResponse,
};
