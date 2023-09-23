import React from "react";
import { FiUsers, FiCreditCard, FiEdit, FiList } from "react-icons/fi";
const navItems = [
  {
    label: "Users",
    to: "/users",
    icon: <FiUsers />,
    children: [
      {
        label: "Users list",
        to: "/users/usersList",
      },
      {
        label: "User registration",
        to: "/users/userRegistration",
      },
      {
        label: "User persmissions",
        to: "/users/userPermissions",
      },
    ],
  },
  {
    label: "Master",
    to: "/master",
    icon: <FiList />,
    children: [
      {
        label: "Branches",
        to: "/master/branches",
      },
      {
        label: "Places",
        to: "/master/places",
      },
      {
        label: "Articles",
        to: "/master/articles",
      },
      {
        label: "Employees",
        to: "/master/employees",
      },
      {
        label: "Drivers",
        to: "/master/drivers",
      },
      {
        label: "Customers",
        to: "/master/customers",
      },
      {
        label: "Suppliers",
        to: "/master/suppliers",
      },
      {
        label: "Vehicle Types",
        to: "/master/vehicleTypes",
      },
      {
        label: "Vehicles",
        to: "/master/vehicles",
      },
      {
        label: "Bank List",
        to: "/master/banks",
      },
      {
        label: "Bank Account List",
        to: "/master/bankAccounts",
      },
      {
        label: "Rate Master",
        to: "/master/rateMasterList",
      },
    ],
  },
  {
    label: "Transactions",
    to: "/transactions",
    icon: <FiCreditCard />,
    children: [
      {
        label: "Lorry Receipts",
        to: "/transactions/lorryReceipts",
      },
      {
        label: "Add FO Num",
        to: "/transactions/addFONum",
      },
      {
        label: "Lorry Freight Challan List",
        to: "/transactions/loadingSlips",
      },
      {
        label: "LR Acknowledgement",
        to: "/transactions/lrAcknowledgement",
      },
      // {
      //   label: "Local Memo List",
      //   to: "/transactions/localMemoList",
      // },
      {
        label: "Bill List",
        to: "/transactions/billList",
      },
      // {
      //   label: "Cash Memo List",
      //   to: "/transactions/cashMemoList",
      // },
      {
        label: "Payment Collection",
        to: "/transactions/paymentCollection",
      },
      {
        label: "Payment Advice",
        to: "/transactions/paymentAdvice",
      },
      {
        label: "Money Transfers",
        to: "/transactions/moneyTransfers",
      },
      // {
      //   label: "Petty Cash History",
      //   to: "/transactions/pettyCashHistory",
      // },
      {
        label: "Quotations",
        to: "/transactions/quotations",
      },
    ],
  },
  {
    label: "Reports",
    to: "/reports",
    icon: <FiEdit />,
    children: [
      {
        label: "Pending LR Stock Status",
        to: "/reports/pendingLRStatus",
      },
      {
        label: "Lorry Receipt Status",
        to: "/reports/lorryReceiptStatus",
      },
      {
        label: "Lorry Receipt Register",
        to: "/reports/lorryReceiptRegister",
      },
      {
        label: "Challan Register",
        to: "/reports/challanRegister",
      },
      {
        label: "Delivery Status Report",
        to: "/reports/deliveryStatus",
      },
      {
        label: "Add FO Number",
        to: "/reports/addFONumber",
      },
      {
        label: "Loading Trip Sheet Register",
        to: "/reports/loadingTripSheet",
      },
      {
        label: "Transaction Detail",
        to: "/reports/transactionDetails",
      },
      {
        label: "User Register",
        to: "/reports/userRegister",
      },
    ],
  },
];

export default navItems;
