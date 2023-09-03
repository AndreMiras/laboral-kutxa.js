/**
 * This isn't unit tests per se, but rather compile time checks of type definition
 * vs actual backend response data.
 * It also gives more concret examples of backend responses.
 */
import {
  LoginResponse,
  Aviso,
  Amounts,
  CurrentAccountProduct,
  PaymentCardProduct,
  LoanProduct,
  Product,
} from "./types";

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

const importes: Amounts = {
  _MisAhorros: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  _MisAhorrosParticular: {
    cantidad: 1234.56,
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

const currentAccountProduct: CurrentAccountProduct = {
  familia: "001",
  numeroCorto: "0123456789",
  categoriaC14D: {
    grupo: "1",
    subgrupo: "1",
    orden: "01",
  },
  esMancomunada: false,
  esProductoParticular: true,
  origen: "",
  importeASumar: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  visible: true,
  id: "0",
  grupo: "cuentasCorrientes",
  alias: "CUENTA 0,0",
  nombreProducto: "CUENTA 0,0",
  aliasEditable: true,
  categoriaId: "1",
  numero: "ES9130350175800123456789",
  desactivada: false,
  saldo: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  titularidadId: "titular",
  producto: "CCP",
  esDeCredito: false,
  disponible: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  actualizandoSaldo: false,
  avisos: [aviso1],
  esCuentaDomiciliacionTarjeta: true,
  esCuentaDomiciliacionTarjetaCredito: false,
  entidad: {
    id: "PRV72400003035",
    iconoUrl: "https://lkweb.laboralkutxa.com/entidades/PRV72400003035-65.png",
    esPrincipal: false,
  },
  esDeCarteraAsesorada: false,
  permisos: [
    {
      nombre: "verMovimientos",
    },
    {
      nombre: "verDetalle",
    },
    {
      nombre: "domiciliarServicioAlertas",
    },
    {
      nombre: "transferenciaBizum",
    },
    {
      nombre: "traspasoDestino",
    },
    {
      nombre: "traspasoOrigen",
    },
    {
      nombre: "transferencia",
    },
    {
      nombre: "halCash",
    },
    {
      nombre: "traspasoOrigenAhorroClick",
    },
    {
      nombre: "domiciliarTarjeta",
    },
    {
      nombre: "domiciliarPrestamo",
    },
    {
      nombre: "domiciliarSeguro",
    },
    {
      nombre: "domiciliarRecibo",
    },
    {
      nombre: "operarRecibo",
    },
    {
      nombre: "operarDepositos",
    },
    {
      nombre: "aportarPlan",
    },
    {
      nombre: "reembolsarFondo",
    },
    {
      nombre: "subscribirFondos",
    },
    {
      nombre: "solicitarCheques",
    },
    {
      nombre: "contratarGDC",
    },
    {
      nombre: "verOrdenesPendientesCobro",
    },
  ],
  esCuentaMultiseguros: false,
};

const paymentCardProduct: PaymentCardProduct = {
  familia: "009",
  numeroCorto: "123456******1234",
  categoriaC14D: {
    grupo: "2",
    subgrupo: "1",
    orden: "01",
  },
  esProductoParticular: true,
  ordenTarjeta: 10,
  origen: "",
  importeASumar: {
    cantidad: 123.45,
    moneda: "EUR",
  },
  visible: true,
  id: "2",
  grupo: "tarjetas",
  alias: "VISA ELECTRÓN",
  nombreProducto: "VISA ELECTRÓN",
  aliasEditable: false,
  categoriaId: "6",
  numero: "123456******1234",
  desactivada: false,
  titularidadId: "titular",
  producto: "ELE",
  disponible: {
    cantidad: 1234.56,
    moneda: "EUR",
  },
  imagen: "electron.png",
  numeroBeneficiarios: 0,
  nombreBeneficiario: "",
  tipo: "debito",
  actualizandoSaldo: false,
  tieneSticker: false,
  estaCaducada: false,
  estaReemitida: false,
  esMorosa: false,
  estado: "encendida",
  gastado: {
    cantidad: 123.45,
    moneda: "EUR",
  },
  avisos: [aviso2],
  validaFirmaOtpReforzada: true,
  tieneApplePay: false,
  tienePagoMovil: true,
  entidad: {
    id: "PRV72400003035",
    iconoUrl: "https://lkweb.laboralkutxa.com/entidades/PRV72400003035-65.png",
    esPrincipal: false,
  },
  esDeCarteraAsesorada: false,
  permisos: [
    {
      nombre: "opcionVerPin",
    },
    {
      nombre: "verPin",
    },
    {
      nombre: "gestionarEstado",
    },
    {
      nombre: "cambiarEstado",
    },
    {
      nombre: "verNumeroCompleto",
    },
    {
      nombre: "bloquearTarjeta",
    },
    {
      nombre: "compraElectronicaSegura",
    },
    {
      nombre: "recargaDeMovil",
    },
    {
      nombre: "consultarEstado",
    },
    {
      nombre: "verMovimientos",
    },
  ],
  esCuentaMultiseguros: false,
};

const loanProduct: LoanProduct = {
  familia: "008",
  numeroCorto: "0123456789",
  categoriaC14D: {
    grupo: "4",
    subgrupo: "1",
    orden: "07",
  },
  esProductoParticular: true,
  esCuentaCreditoPagoAplazado: false,
  origen: "",
  importeASumar: {
    cantidad: 123456.78,
    moneda: "EUR",
  },
  visible: true,
  id: "1",
  grupo: "prestamos",
  alias: "PRESTAMO",
  nombreProducto: "PRESTAMO",
  aliasEditable: true,
  categoriaId: "31",
  numero: "0123456789",
  titularidadId: "titular",
  producto: "PTM",
  actualizandoSaldo: false,
  pendiente: {
    cantidad: 123456.78,
    moneda: "EUR",
  },
  proximaCuota: {
    cantidad: 987.65,
    moneda: "EUR",
  },
  fecha: "2023-09-10T22:00:00Z",
  estaExcedido: false,
  tipoPrestamo: "pgh",
  entidad: {
    id: "PRV72400003035",
    iconoUrl: "https://lkweb.laboralkutxa.com/entidades/PRV72400003035-65.png",
    esPrincipal: false,
  },
  esDeCarteraAsesorada: false,
  permisos: [
    {
      nombre: "amortizar",
    },
    {
      nombre: "simularAmortizacion",
    },
    {
      nombre: "verAvanceInformacionFiscal",
    },
    {
      nombre: "verDetallePrestamo",
    },
    {
      nombre: "verPagosRealizados",
    },
    {
      nombre: "verProximasCuotas",
    },
    {
      nombre: "verPagosRealizados",
    },
  ],
  esCuentaMultiseguros: false,
};

const products: Product[] = [
  currentAccountProduct,
  paymentCardProduct,
  loanProduct,
];
