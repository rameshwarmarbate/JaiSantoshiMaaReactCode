// export const API_BASE_PATH_MASTER = "http://localhost:4800/api/master";
// export const API_BASE_PATH_TRANSACTIONS =
//   "http://localhost:4800/api/transactions";
// export const API_BASE_PATH_USER = "http://localhost:4800/api/user";
// export const BILLS_PATH = "http://localhost:4800/bills/lorryReceipts/";
// export const LOADING_SLIPS_PATH = "http://localhost:4800/bills/loadingSlips/";
// export const CUSTOMER_BILLS_PATH = "http://localhost:4800/bills/bills/";
// export const QUOTATIONS_PATH = "http://localhost:4800/bills/quotations/";
// export const VOUCHERS_PATH = "http://localhost:4800/bills/vouchers/";
export const API_BASE_PATH = "http://localhost:4800/";
// export const API_BASE_PATH = "https://api.jaisantoshimaatransport.com/";

export const DELIVERY_TYPES = [
  { label: "Door", value: "Door" },
  { label: "Godown", value: "Godown" },
  { label: "Office", value: "Office" },
];
export const PAY_TYPES = [
  { label: "TBB", value: "TBB" },
  { label: "ToPay", value: "ToPay" },
  { label: "Paid", value: "Paid" },
  { label: "FOC", value: "FOC" },
];
export const TO_BILLED = [
  { label: "Consignor", value: "Consignor" },
  { label: "Consignee", value: "Consignee" },
  { label: "Third party", value: "Third party" },
];
export const SERVICE_TAX_BY = [
  { label: "Consignor", value: "Consignor" },
  { label: "Consignee", value: "Consignee" },
  { label: "NA", value: "NA" },
];
export const PAY_MODE = [
  { label: "By Cash", value: "By Cash" },
  { label: "By Cheque", value: "By Cheque" },
];

export const PAYMENT_MODES = [
  { label: "Cash", value: "Cash" },
  { label: "Cheque", value: "Cheque" },
  { label: "NEFT/RTGS", value: "NEFT/RTGS" },
  { label: "Online banking", value: "Online banking" },
];
