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

interface Aviso {
  id: string;
  severidad: string;
  orden: number;
  mensaje: string;
  tieneDetalle: boolean;
  noMostrar: boolean;
  fechaAlta: string;
  accion: string;
  tipo: string;
  // we don't know what this one looks like yet
  informacionAviso: any;
}

// Common/shared types and interfaces
interface Amount {
  cantidad: number;
  moneda: string;
}

interface CategoriaC14D {
  grupo: string;
  subgrupo: string;
  orden: string;
}

interface Entidad {
  id: string;
  iconoUrl: string;
  esPrincipal: boolean;
}

interface Permiso {
  nombre: string;
}

// BaseProduct contains common/shared properties
interface BaseProduct {
  familia: string;
  numeroCorto: string;
  categoriaC14D: CategoriaC14D;
  esProductoParticular: boolean;
  origen: string;
  importeASumar: Amount;
  visible: boolean;
  id: string;
  grupo: string;
  alias: string;
  nombreProducto: string;
  aliasEditable: boolean;
  categoriaId: string;
  numero: string;
  titularidadId: string;
  producto: string;
  actualizandoSaldo: boolean;
  entidad: Entidad;
  esDeCarteraAsesorada: boolean;
  permisos: Permiso[];
  esCuentaMultiseguros: boolean;
}

interface CurrentAccountProduct extends BaseProduct {
  esMancomunada: boolean;
  saldo: Amount;
  desactivada: boolean;
  esDeCredito: boolean;
  disponible: Amount;
  avisos: Aviso[];
  esCuentaDomiciliacionTarjeta: boolean;
  esCuentaDomiciliacionTarjetaCredito: boolean;
}

interface PaymentCardProduct extends BaseProduct {
  ordenTarjeta: number;
  desactivada: boolean;
  disponible: Amount;
  imagen: string;
  numeroBeneficiarios: number;
  nombreBeneficiario: string;
  tipo: "debito" | "credito";
  tieneSticker: boolean;
  estaCaducada: boolean;
  estaReemitida: boolean;
  esMorosa: boolean;
  estado: string;
  gastado: Amount;
  avisos: Aviso[];
  validaFirmaOtpReforzada: boolean;
  tieneApplePay: boolean;
  tienePagoMovil: boolean;
}

interface LoanProduct extends BaseProduct {
  esCuentaCreditoPagoAplazado: boolean;
  pendiente: Amount;
  proximaCuota: Amount;
  fecha: string;
  estaExcedido: boolean;
  tipoPrestamo: string;
}

type Product = CurrentAccountProduct | PaymentCardProduct | LoanProduct;

interface Amounts {
  _MisAhorros: Amount;
  _MisAhorrosParticular: Amount;
  _MisAhorrosNegocio: Amount;
  _CuentasCorrientes: Amount;
  _CuentasCorrientesParticular: Amount;
  _CuentasCorrientesNegocio: Amount;
  _CuentasAhorro: Amount;
  _CuentasAhorroParticular: Amount;
  _CuentasAhorroNegocio: Amount;
  _Depositos: Amount;
  _Fondos: Amount;
  _Bolsa: Amount;
  _AportacionesLK: Amount;
  _Planes: Amount;
  _Financiacion: Amount;
  _FinanciacionParticular: Amount;
  _FinanciacionNegocio: Amount;
  _RemesasImportacion: Amount;
  _RemesasExportacion: Amount;
  _DispuestoTarjetas: Amount;
}

interface MyProductsResponse {
  avisos: Aviso[];
  mensaje: string;
  misProductos: Product[];
  numeroOperacionesPendientesFirma: number;
  // we don't know what this one looks like yet
  productosDeOtros: any;
  resultado: number;
  seguros: string[];
  _Importes: Amounts;
}

export type {
  LoginResponse,
  CategoriaC14D,
  Permiso,
  Entidad,
  BaseProduct,
  CurrentAccountProduct,
  PaymentCardProduct,
  LoanProduct,
  Product,
  Aviso,
  Amount,
  Amounts,
  MyProductsResponse,
};
