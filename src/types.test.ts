/**
 * This isn't unit tests per se, but rather compile time checks of type definition
 * vs actual backend response data.
 * It also gives more concret examples of backend responses.
 */
import { LoginResponse } from "./types";

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
