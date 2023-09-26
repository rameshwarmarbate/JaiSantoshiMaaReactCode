import fetchFromApiServer from "@services/api";

export function fetchBranches() {
  const url = `api/master/getBranches`;
  return fetchFromApiServer("GET", url);
}

export function fetchCustomers() {
  const url = `api/master/getCustomers`;
  return fetchFromApiServer("GET", url);
}

export function fetchLorryReceiptsForReport(requestObject) {
  const url = `api/transactions/getLoadedLorryReceiptForReport`;
  return fetchFromApiServer("POST", url, requestObject);
}

export function fetchLRReport(query) {
  const url = `api/transactions/downloadLoadedLRReport`;
  return fetchFromApiServer("BLOB", url, {
    query: query,
  });
}
