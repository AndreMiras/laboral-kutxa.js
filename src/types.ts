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

interface MyProductsResponse {
  misProductos: Product[];
}

export type { LoginResponse, Product, MyProductsResponse };
