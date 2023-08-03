import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Welcome from "../modules/home/Welcome";

const UserList = lazy(() => import("../modules/user/components/UsersList"));
const UserRegistration = lazy(() =>
  import("../modules/user/components/UserRegistration")
);
const UserPermissions = lazy(() =>
  import("../modules/user/components/UserPermissions")
);
const UserEdit = lazy(() => import("../modules/user/components/UserEdit"));
const Articles = lazy(() =>
  import("../modules/master/components/articles/ArticlesList")
);
const ArticleAdd = lazy(() =>
  import("../modules/master/components/articles/ArticleAdd")
);
const ArticleEdit = lazy(() =>
  import("../modules/master/components/articles/ArticleEdit")
);
const Reports = lazy(() => import("../modules/reports/container"));
const Places = lazy(() =>
  import("../modules/master/components/places/PlacesList")
);
const PlaceAdd = lazy(() =>
  import("../modules/master/components/places/PlaceAdd")
);
const PlaceEdit = lazy(() =>
  import("../modules/master/components/places/PlaceEdit")
);
const BranchList = lazy(() =>
  import("../modules/master/components/branches/BranchList")
);
const BranchAdd = lazy(() =>
  import("../modules/master/components/branches/BranchAdd")
);
const BranchEdit = lazy(() =>
  import("../modules/master/components/branches/BranchEdit")
);
const Customers = lazy(() =>
  import("../modules/master/components/customers/CustomersList")
);
const CustomerAdd = lazy(() =>
  import("../modules/master/components/customers/CustomerAdd")
);
const CustomerEdit = lazy(() =>
  import("../modules/master/components/customers/CustomerEdit")
);
const Drivers = lazy(() =>
  import("../modules/master/components/drivers/DriversList")
);
const DriverAdd = lazy(() =>
  import("../modules/master/components/drivers/DriverAdd")
);
const DriverEdit = lazy(() =>
  import("../modules/master/components/drivers/DriverEdit")
);
const Employees = lazy(() =>
  import("../modules/master/components/employees/EmployeeList")
);
const EmployeeAdd = lazy(() =>
  import("../modules/master/components/employees/EmployeeAdd")
);
const EmployeeEdit = lazy(() =>
  import("../modules/master/components/employees/EmployeeEdit")
);
const Vehicles = lazy(() =>
  import("../modules/master/components/vehicles/VehiclesList")
);
const VehicleAdd = lazy(() =>
  import("../modules/master/components/vehicles/VehicleAdd")
);
const VehicleEdit = lazy(() =>
  import("../modules/master/components/vehicles/VehicleEdit")
);
const VehicleTypes = lazy(() =>
  import("../modules/master/components/vehicle-types/VehicleTypesList")
);
const VehicleTypeAdd = lazy(() =>
  import("../modules/master/components/vehicle-types/VehicleTypeAdd")
);
const VehicleTypeEdit = lazy(() =>
  import("../modules/master/components/vehicle-types/VehicleTypeEdit")
);
const Suppliers = lazy(() =>
  import("../modules/master/components/suppliers/SuppliersList")
);
const SupplierAdd = lazy(() =>
  import("../modules/master/components/suppliers/SupplierAdd")
);
const SupplierEdit = lazy(() =>
  import("../modules/master/components/suppliers/SupplierEdit")
);
const BankList = lazy(() =>
  import("../modules/master/components/banks/BankList")
);
const BankAdd = lazy(() =>
  import("../modules/master/components/banks/BankAdd")
);
const BankEdit = lazy(() =>
  import("../modules/master/components/banks/BankEdit")
);
const BankAccountList = lazy(() =>
  import("../modules/master/components/bank-accounts/BankAccountList")
);
const BankAccountAdd = lazy(() =>
  import("../modules/master/components/bank-accounts/BankAccountAdd")
);
const BankAccountEdit = lazy(() =>
  import("../modules/master/components/bank-accounts/BankAccountEdit")
);

const RateMasterList = lazy(() =>
  import("../modules/master/components/rate-master/RateMasterList")
);

const AddRateMaster = lazy(() =>
  import("../modules/master/components/rate-master/AddRateMaster")
);

const EditRateMaster = lazy(() =>
  import("../modules/master/components/rate-master/EditRateMaster")
);

const LorryReceipts = lazy(() =>
  import("../modules/transactions/components/lorry-receipts/LorryReceipts")
);
const LorryReceiptAdd = lazy(() =>
  import("../modules/transactions/components/lorry-receipts/LorryReceiptAdd")
);
const LorryReceiptEdit = lazy(() =>
  import("../modules/transactions/components/lorry-receipts/LorryReceiptEdit")
);

const FONumAdd = lazy(() =>
  import("../modules/transactions/components/lorry-receipts/FONumAdd")
);
const LoadingSlips = lazy(() =>
  import("../modules/transactions/components/loading-slips/LoadingSlips")
);
const LoadingSlipAdd = lazy(() =>
  import("../modules/transactions/components/loading-slips/LoadingSlipAdd")
);
const LoadingSlipEdit = lazy(() =>
  import("../modules/transactions/components/loading-slips/LoadingSlipEdit")
);
const LRAcknowledgement = lazy(() =>
  import("../modules/transactions/components/acknowledgement/LRAcknowledgement")
);
const LRAcknowledgementEdit = lazy(() =>
  import(
    "../modules/transactions/components/acknowledgement/LRAcknowledgementEdit"
  )
);
const LRAcknowledgementAdd = lazy(() =>
  import(
    "../modules/transactions/components/acknowledgement/LRAcknowledgementAdd"
  )
);
const LocalMemoList = lazy(() =>
  import("../modules/transactions/components/local-memo/LocalMemoList")
);
const BillList = lazy(() =>
  import("../modules/transactions/components/bills/BillList")
);
const BillAdd = lazy(() =>
  import("../modules/transactions/components/bills/BillAdd")
);
const BillEdit = lazy(() =>
  import("../modules/transactions/components/bills/BillEdit")
);
const CashMemoList = lazy(() =>
  import("../modules/transactions/components/cash-memo/CashMemoList")
);
const PaymentCollection = lazy(() =>
  import(
    "../modules/transactions/components/payment-collection/PaymentCollection"
  )
);
const PaymentAdvice = lazy(() =>
  import("../modules/transactions/components/payment-advice/PaymentAdvice")
);
const SupplierBillView = lazy(() =>
  import("../modules/transactions/components/payment-advice/SupplierBillView")
);
const MoneyTransfers = lazy(() =>
  import("../modules/transactions/components/money-transfers/MoneyTransfers")
);
const MoneyTransferAdd = lazy(() =>
  import("../modules/transactions/components/money-transfers/MoneyTransferAdd")
);
const MoneyTransferEdit = lazy(() =>
  import("../modules/transactions/components/money-transfers/MoneyTransferEdit")
);
const PettyCashHistory = lazy(() =>
  import(
    "../modules/transactions/components/petty-cash-history/PettyCashHistory"
  )
);
const PettyCashTransactionAdd = lazy(() =>
  import(
    "../modules/transactions/components/petty-cash-history/PettyCashTransactionAdd"
  )
);

const LorryReceiptRegister = lazy(() =>
  import("../modules/reports/components/lr-register/LorryReceiptRegister")
);
const LoadingTripSheet = lazy(() =>
  import("../modules/reports/components/loading-trip-sheet/LoadingTripSheet")
);
const BillRegister = lazy(() =>
  import("../modules/reports/components/bill-register/BillRegister")
);
const BilledLRStatus = lazy(() =>
  import("../modules/reports/components/billed-lr-status/BilledLRStatus")
);
const PaymentCollectionReport = lazy(() =>
  import(
    "../modules/reports/components/payment-collection/PaymentCollectionReport"
  )
);

const Unauthorized = lazy(() => import("./Unauthorized"));

const NotFound = lazy(() => import("./NotFound"));

const QuotationList = lazy(() =>
  import("../modules/transactions/components/quotations/QuotationList")
);
const QuotationAdd = lazy(() =>
  import("../modules/transactions/components/quotations/QuotationAdd")
);
const QuotationEdit = lazy(() =>
  import("../modules/transactions/components/quotations/QuotationEdit")
);

const Routing = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/users">
          <Route index element={<Navigate to="/users/usersList" />} />
          <Route>
            <Route
              path="usersList"
              element={
                <RequireAuth
                  parent="User"
                  path="UserActivation"
                  process="write"
                >
                  <UserList />
                </RequireAuth>
              }
            />
            <Route
              path="userRegistration"
              element={
                <RequireAuth parent="User" path="UserRegister" process="write">
                  <UserRegistration />
                </RequireAuth>
              }
            />
            <Route
              path="userEdit"
              element={
                <RequireAuth parent="User" path="UserRegister" process="write">
                  <UserEdit />
                </RequireAuth>
              }
            />
            <Route
              path="userPermissions"
              element={
                <RequireAuth parent="User" path="RoleMaster" process="write">
                  <UserPermissions />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
        <Route path="/master">
          <Route
            index
            element={
              <RequireAuth parent="Admin" path="Branch" process="write">
                <Navigate to="/master/branches" />
              </RequireAuth>
            }
          />
          <Route path="branches">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Branch" process="write">
                  <BranchList />
                </RequireAuth>
              }
            />
            <Route
              path="addBranch"
              element={
                <RequireAuth parent="Admin" path="Branch" process="write">
                  <BranchAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editBranch"
              element={
                <RequireAuth parent="Admin" path="Branch" process="write">
                  <BranchEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="articles">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Article" process="write">
                  <Articles />
                </RequireAuth>
              }
            />
            <Route
              path="addArticle"
              element={
                <RequireAuth parent="Admin" path="Article" process="write">
                  <ArticleAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editArticle"
              element={
                <RequireAuth parent="Admin" path="Article" process="write">
                  <ArticleEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="places">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Place" process="write">
                  <Places />
                </RequireAuth>
              }
            />
            <Route
              path="addPlace"
              element={
                <RequireAuth parent="Admin" path="Place" process="write">
                  <PlaceAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editPlace"
              element={
                <RequireAuth parent="Admin" path="Place" process="write">
                  <PlaceEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="customers">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Customers" process="write">
                  <Customers />
                </RequireAuth>
              }
            />
            <Route
              path="addCustomer"
              element={
                <RequireAuth parent="Admin" path="Customers" process="write">
                  <CustomerAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editCustomer"
              element={
                <RequireAuth parent="Admin" path="Customers" process="write">
                  <CustomerEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="vehicleTypes">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="VehicleType" process="write">
                  <VehicleTypes />
                </RequireAuth>
              }
            />
            <Route
              path="addVehicleType"
              element={
                <RequireAuth parent="Admin" path="VehicleType" process="write">
                  <VehicleTypeAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editVehicleType"
              element={
                <RequireAuth parent="Admin" path="VehicleType" process="write">
                  <VehicleTypeEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="vehicles">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Vehicle" process="write">
                  <Vehicles />
                </RequireAuth>
              }
            />
            <Route
              path="addVehicle"
              element={
                <RequireAuth parent="Admin" path="Vehicle" process="write">
                  <VehicleAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editVehicle"
              element={
                <RequireAuth parent="Admin" path="Vehicle" process="write">
                  <VehicleEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="employees">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Employee" process="write">
                  <Employees />
                </RequireAuth>
              }
            />
            <Route
              path="addEmployee"
              element={
                <RequireAuth parent="Admin" path="Employee" process="write">
                  <EmployeeAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editEmployee"
              element={
                <RequireAuth parent="Admin" path="Employee" process="write">
                  <EmployeeEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="drivers">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Driver" process="write">
                  <Drivers />
                </RequireAuth>
              }
            />
            <Route
              path="addDriver"
              element={
                <RequireAuth parent="Admin" path="Driver" process="write">
                  <DriverAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editDriver"
              element={
                <RequireAuth parent="Admin" path="Driver" process="write">
                  <DriverEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="suppliers">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="Supplier" process="write">
                  <Suppliers />
                </RequireAuth>
              }
            />
            <Route
              path="addSupplier"
              element={
                <RequireAuth parent="Admin" path="Supplier" process="write">
                  <SupplierAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editSupplier"
              element={
                <RequireAuth parent="Admin" path="Supplier" process="write">
                  <SupplierEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="banks">
            <Route
              index
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="BankMaster"
                  process="write"
                >
                  <BankList />
                </RequireAuth>
              }
            />
            <Route
              path="addBank"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="BankMaster"
                  process="write"
                >
                  <BankAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editBank"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="BankMaster"
                  process="write"
                >
                  <BankEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="bankAccounts">
            <Route
              index
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="BankAccountMaster"
                  process="write"
                >
                  <BankAccountList />
                </RequireAuth>
              }
            />
            <Route
              path="addBankAccount"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="BankAccountMaster"
                  process="write"
                >
                  <BankAccountAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editBankAccount"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="BankAccountMaster"
                  process="write"
                >
                  <BankAccountEdit />
                </RequireAuth>
              }
            />
          </Route>

          <Route path="RateMasterList">
            <Route
              index
              element={
                <RequireAuth parent="Admin" path="RateMaster" process="read">
                  <RateMasterList />
                </RequireAuth>
              }
            />
            <Route
              path="addRateMaster"
              element={
                <RequireAuth parent="Admin" path="RateMaster" process="write">
                  <AddRateMaster />
                </RequireAuth>
              }
            />
            <Route
              path="editRateMaster"
              element={
                <RequireAuth parent="Admin" path="RateMaster" process="write">
                  <EditRateMaster />
                </RequireAuth>
              }
            />
            <Route
              path="editBankAccount"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="BankAccountMaster"
                  process="write"
                >
                  <BankAccountEdit />
                </RequireAuth>
              }
            />
          </Route>

          {/* RateMasterList
          AddRateMaster */}
        </Route>
        <Route path="/transactions">
          <Route
            index
            element={<Navigate to="/transactions/lorryReceipts" />}
          />
          <Route path="lorryReceipts">
            <Route
              index
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LorryReceipt"
                  process="write"
                >
                  <LorryReceipts />
                </RequireAuth>
              }
            />
            <Route
              path="addLorryReceipt"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LorryReceiptReg"
                  process="write"
                >
                  <LorryReceiptAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editLorryReceipt"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LorryReceiptReg"
                  process="write"
                >
                  <LorryReceiptEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="addFONum"
            element={
              <RequireAuth
                parent="Sales/Purchase"
                path="Add_FO_No"
                process="write"
              >
                <FONumAdd />
              </RequireAuth>
            }
          />
          <Route path="loadingSlips">
            <Route
              index
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LoadingSlip"
                  process="write"
                >
                  <LoadingSlips />
                </RequireAuth>
              }
            />
            <Route
              path="addLoadingSlip"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LoadingSlipRegister"
                  process="write"
                >
                  <LoadingSlipAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editLoadingSlip"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LoadingSlipRegister"
                  process="write"
                >
                  <LoadingSlipEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="lrAcknowledgement">
            <Route
              index
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LRAcknowledge"
                  process="write"
                >
                  <LRAcknowledgement />
                </RequireAuth>
              }
            />
            <Route
              path="editLRAcknowledgement"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LRAcknowledge"
                  process="write"
                >
                  <LRAcknowledgementEdit />
                </RequireAuth>
              }
            />
            <Route
              path="addLRAcknowledgement"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="LRAcknowledge"
                  process="write"
                >
                  <LRAcknowledgementAdd />
                </RequireAuth>
              }
            />
          </Route>

          <Route path="localMemoList">
            <Route index element={<LocalMemoList />} />
            <Route path="addLocalMemoLS" element={<LoadingSlipAdd />} />
            <Route path="editLocalMemoLS" element={<LoadingSlipEdit />} />
          </Route>

          <Route path="billList">
            <Route
              index
              element={
                <RequireAuth parent="Accounts" path="RouteBill" process="write">
                  <BillList />
                </RequireAuth>
              }
            />
            <Route
              path="addBill"
              element={
                <RequireAuth
                  parent="Accounts"
                  path="BillRegister"
                  process="write"
                >
                  <BillAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editBill"
              element={
                <RequireAuth
                  parent="Accounts"
                  path="BillRegister"
                  process="write"
                >
                  <BillEdit />
                </RequireAuth>
              }
            />
          </Route>

          <Route path="/transactions/cashMemoList" element={<CashMemoList />} />
          <Route
            path="/transactions/paymentCollection"
            element={
              <RequireAuth
                parent="Accounts"
                path="PaymentCollection"
                process="write"
              >
                <PaymentCollection />
              </RequireAuth>
            }
          />
          <Route path="/transactions/paymentAdvice">
            <Route
              index
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="PaymentAdvice"
                  process="write"
                >
                  <PaymentAdvice />
                </RequireAuth>
              }
            />
            <Route path="viewSupplierBill" element={<SupplierBillView />} />
          </Route>

          <Route path="moneyTransfers">
            <Route
              index
              element={
                <RequireAuth
                  parent="Admin"
                  path="MoneyTransfer"
                  process="write"
                >
                  <MoneyTransfers />
                </RequireAuth>
              }
            />
            <Route
              path="addMoneyTransfer"
              element={
                <RequireAuth
                  parent="Admin"
                  path="MoneyTransfer"
                  process="write"
                >
                  <MoneyTransferAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editMoneyTransfer"
              element={
                <RequireAuth
                  parent="Admin"
                  path="MoneyTransfer"
                  process="write"
                >
                  <MoneyTransferEdit />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="pettyCashHistory">
            <Route index element={<PettyCashHistory />} />
            <Route
              path="addPettyCashTransaction"
              element={<PettyCashTransactionAdd />}
            />
          </Route>
          <Route path="quotations">
            <Route
              index
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="TripSheet"
                  process="write"
                >
                  <QuotationList />
                </RequireAuth>
              }
            />
            <Route
              path="addQuotation"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="TripSheet"
                  process="write"
                >
                  <QuotationAdd />
                </RequireAuth>
              }
            />
            <Route
              path="editQuotation"
              element={
                <RequireAuth
                  parent="Sales/Purchase"
                  path="TripSheet"
                  process="write"
                >
                  <QuotationEdit />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
        <Route path="/reports">
          <Route
            index
            element={<Navigate to="/reports/lorryReceiptRegister" />}
          />
          <Route
            path="/reports/lorryReceiptRegister"
            element={
              <RequireAuth
                parent="Accounts"
                path="BilledLRStatus"
                process="write"
              >
                <LorryReceiptRegister />
              </RequireAuth>
            }
          />
          <Route
            path="/reports/loadingTripSheet"
            element={
              <RequireAuth parent="Accounts" path="LoadingSlip" process="write">
                <LoadingTripSheet />
              </RequireAuth>
            }
          />
          <Route path="/reports/billRegister" element={<BillRegister />} />
          <Route path="/reports/billedLRStatus" element={<BilledLRStatus />} />
          <Route
            path="/reports/paymentCollectionReport"
            element={<PaymentCollectionReport />}
          />
        </Route>
        <Route path="/reports" element={<Reports />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
