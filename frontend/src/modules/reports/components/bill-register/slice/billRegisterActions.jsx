import fetchFromApiServer from "@services/api";

export function verifyUser(requestObject) {
  const url = `api/user/login`;
  return fetchFromApiServer("POST", url, requestObject);
}
