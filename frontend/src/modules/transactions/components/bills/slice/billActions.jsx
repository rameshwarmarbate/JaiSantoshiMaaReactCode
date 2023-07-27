import fetchFromApiServer from "@services/api";
import { getEmpId } from "@services/utils";

export function fetchBranches() {
  const url = `api/master/getBranches`;
  return fetchFromApiServer("GET", url);
}

export function fetchCustomers() {
  const url = `api/master/getCustomers`;
  return fetchFromApiServer("GET", url);
}

export function addBill(requestObject) {
  requestObject.createdBy = getEmpId();
  const url = `api/transactions/addBill`;
  return fetchFromApiServer("POST", url, requestObject);
}

export function fetchLorryReceiptsByConsignor(requestObject) {
  const url = `api/transactions/getLorryReceiptsByConsignor`;
  return fetchFromApiServer("POST", url, requestObject);
}

export function printBill({ id, email }) {
  const url = `api/transactions/printBill/${id}`;
  return fetchFromApiServer("POST", url, { email: email });
}

export function fetchBills(requestObject) {
  const url = `api/transactions/getBills`;
  return fetchFromApiServer("POST", url, requestObject);
}

export function removeBill(id) {
  const url = `api/transactions/removeBill/${id}`;
  return fetchFromApiServer("DELETE", url, {
    id: id,
    updatedBy: getEmpId(),
  });
}

export function fetchBill(id) {
  const url = `api/transactions/getBill/${id}`;
  return fetchFromApiServer("GET", url);
}

export function modifyBill(requestObject) {
  requestObject.updatedBy = getEmpId();

  const url = `api/transactions/updateBill/${requestObject._id}`;
  return fetchFromApiServer("PUT", url, requestObject);
}
