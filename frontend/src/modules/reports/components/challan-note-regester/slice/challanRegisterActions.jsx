import fetchFromApiServer from "@services/api";

export function fetchBranches() {
  const url = `api/master/getBranches`;
  return fetchFromApiServer("GET", url);
}

export function fetchCustomers() {
  const url = `api/master/getCustomers`;
  return fetchFromApiServer("GET", url);
}

export function fetchLoadingSlipForReport(requestObject) {
  const url = `api/transactions/getChallanForReport`;
  return fetchFromApiServer("POST", url, requestObject);
}

export function fetchLRChallanReport(requestObject) {
  const url = `api/transactions/getChallanForReport`;
  return fetchFromApiServer("BLOB", url, requestObject);
}
