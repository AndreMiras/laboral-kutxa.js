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

interface MyProductsResponse {
  avisos: Avisos[];
  mensaje: string;
  misProductos: Product[];
  numeroOperacionesPendientesFirma: number;
  resultado: number;
  seguros: string[];
}

export type { LoginResponse, Product, Avisos, MyProductsResponse };
