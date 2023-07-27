import fetchFromApiServer from "@services/api";
import { getEmpId } from "@services/utils";

export function addCustomer(requestObject) {
  requestObject.createdBy = getEmpId();
  const url = `api/master/addCustomer`;
  return fetchFromApiServer("POST", url, requestObject);
}

export function fetchCustomer(id) {
  const url = `api/master/getCustomer/${id}`;
  return fetchFromApiServer("GET", url);
}

export function modifyCustomer(requestObject) {
  requestObject.updatedBy = getEmpId();
  const url = `api/master/updateCustomer/${requestObject._id}`;
  return fetchFromApiServer("PUT", url, requestObject);
}

export function fetchCustomers() {
  const url = `api/master/getCustomers`;
  return fetchFromApiServer("GET", url);
}
export function removeCustomer(id) {
  const url = `api/master/removeCustomer/${id}`;
  return fetchFromApiServer("DELETE", url, { id: id, updatedBy: getEmpId() });
}
