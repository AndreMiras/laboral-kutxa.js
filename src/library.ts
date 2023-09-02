import assert from "assert";
import { API_URL } from "./constants";

const handleStatusCode = async (response: Response) => {
  if (response.ok) return;
  const body = await response.text();
  throw new Error(`HTTP error! Status: ${response.status}. Body: ${body}`);
};

const login = async (username: string, password: string) => {
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

const main = async () => {
  const { USERNAME, PASSWORD } = process.env;
  assert.ok(USERNAME);
  assert.ok(PASSWORD);
  const data = await login(USERNAME, PASSWORD);
  console.log({ data });
};

if (require?.main === module) {
  main();
}

export { login };
