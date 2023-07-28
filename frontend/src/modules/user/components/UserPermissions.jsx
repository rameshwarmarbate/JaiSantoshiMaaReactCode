import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Divider,
  Switch,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import { Alert, Stack } from "@mui/material";
import classes from "./UserPermissions.module.css";
import { LoadingSpinner } from "../../../ui-controls";
import {
  getUserDetail,
  getBranches,
  getUsersByBranch,
  updateUserPermissions,
  selectIsLoading,
} from "../slice/userSlice";

const UserPermissions = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoading = useSelector(selectIsLoading);
  const [branchUsers, setBranchUsers] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(
    user.branch ? user.branch : ""
  );
  const [selectedUser, setSelectedUser] = useState("");
  const [fetchedUser, setFetchedUser] = useState({});
  const [permissions, setPermissions] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (permissions) {
      let selectAllTrue = true;
      for (const key in permissions) {
        for (const key1 in permissions[key]) {
          if (permissions[key][key1].write === false) {
            selectAllTrue = false;
            break;
          }
        }
      }
      setSelectAll(selectAllTrue);
    }
  }, [permissions]);

  const goToUsersList = useCallback(() => {
    navigate("/users/usersList");
  }, [navigate]);

  useEffect(() => {
    dispatch(getBranches())
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setBranches(payload?.data);
          setHttpError("");
        }
      })
      .catch(() => {
        setHttpError(
          "Something went wrong! Please try later or contact Administrator."
        );
      });
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      dispatch(getUsersByBranch(selectedBranch))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            if (user.type.toLowerCase() === "superadmin") {
              setBranchUsers(payload?.data);
            } else {
              setBranchUsers(
                payload?.data?.filter(({ id }) => user._id !== id)
              );
            }
          }
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
        });
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getUserDetail(selectedUser))
        .then(({ payload = {} }) => {
          setFetchedUser({
            ...(payload?.data || {}),
          });
          setPermissions(payload?.data?.permissions);
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
        });
    } else {
      setFetchedUser({});
    }
  }, [selectedUser]);

  const branchChangeHandler = (e) => {
    setSelectedBranch(e.target.value);
    setBranchUsers([]);
  };

  const userChangeHandler = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSwitchChange = (e, checked) => {
    if (e.target.name === "Sales/Purchase_Add_FO_No_write") {
      const mainSection = "Sales/Purchase";
      const subSection = "Add_FO_No";
      const type = "write";
      setPermissions((currPermissions) => {
        const updatedPermissions = { ...currPermissions };
        updatedPermissions[mainSection][subSection][type] = checked;
        return updatedPermissions;
      });
    } else {
      const name = e.target.name;
      const mainSection = name.split("_")[0];
      const subSection = name.split("_")[1];
      const type = name.split("_")[2];
      setPermissions((currPermissions) => {
        const updatedPermissions = { ...currPermissions };
        updatedPermissions[mainSection][subSection][type] = checked;
        return updatedPermissions;
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const requestObject = {
      id: selectedUser,
      permissions: permissions,
    };

    dispatch(updateUserPermissions(requestObject))
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setHttpError("");
          goToUsersList();
        }
      })
      .catch(() => {
        setHttpError(
          "Something went wrong! Please try later or contact Administrator."
        );
      });
  };

  const cancelButtonHandler = () => {
    goToUsersList();
  };

  const handleSelectAll = (e, checked) => {
    setSelectAll(checked);
    if (!checked) {
      setPermissions((currPermissions) => {
        for (const key in currPermissions) {
          for (const key1 in currPermissions[key]) {
            currPermissions[key][key1].read = false;
            currPermissions[key][key1].write = false;
          }
        }
        return currPermissions;
      });
    } else {
      setPermissions((currPermissions) => {
        for (const key in currPermissions) {
          for (const key1 in currPermissions[key]) {
            currPermissions[key][key1].read = true;
            currPermissions[key][key1].write = true;
          }
        }
        return currPermissions;
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <h1 className="pageHead">User permissions</h1>
      <div className="inner-wrap">
        {httpError !== "" && (
          <Stack
            sx={{
              width: "100%",
              margin: "0 0 30px 0",
              border: "1px solid red",
              borderRadius: "4px",
            }}
            spacing={2}
          >
            <Alert severity="error">{httpError}</Alert>
          </Stack>
        )}

        <form className="frm-bottom-spc" action="" onSubmit={submitHandler}>
          <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
            <div className="grid grid-6-col">
              <div className="grid-item">
                {branches && branches.length > 0 && (
                  <FormControl fullWidth size="small">
                    <InputLabel id="branch">Branch</InputLabel>
                    <Select
                      labelId="branch"
                      name="branch"
                      value={selectedBranch}
                      label="Branch"
                      onChange={branchChangeHandler}
                      disabled={user.type.toLowerCase() !== "superadmin"}
                    >
                      {branches.map((branch) => (
                        <MenuItem
                          value={branch._id}
                          key={branch._id}
                          className="menuItem"
                        >
                          {branch.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
              <div className="grid-item">
                {branches && branches.length > 0 && (
                  <FormControl fullWidth size="small">
                    <InputLabel id="users">Users</InputLabel>
                    <Select
                      labelId="users"
                      name="users"
                      value={selectedUser}
                      label="Users"
                      onChange={userChangeHandler}
                    >
                      <MenuItem value="" className="menuItem">
                        Select
                      </MenuItem>
                      {branchUsers &&
                        branchUsers.length &&
                        branchUsers.map((user) => (
                          <MenuItem
                            value={user.id}
                            key={user.id}
                            className="menuItem"
                          >
                            {user.username}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
          </Paper>
          {fetchedUser.employee && (
            <>
              <Divider sx={{ marginBottom: "20px" }} />

              <Paper
                sx={{ padding: "20px", marginBottom: "20px", overflow: "auto" }}
              >
                <div>
                  Select All{" "}
                  <Switch
                    name="selectAll"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>

                <table className={classes.tbl_permissions}>
                  <tbody>
                    <tr>
                      <td colSpan={10} className={classes.head}>
                        Admin
                      </td>
                    </tr>
                    <tr>
                      <td width="10%">MoneyTransfer</td>
                      <td width="10%">
                        <Switch
                          name="Admin_MoneyTransfer_write"
                          checked={permissions.Admin.MoneyTransfer.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td width="10%">Place</td>
                      <td width="10%">
                        <Switch
                          name="Admin_Place_write"
                          checked={permissions.Admin.Place.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td width="10%">Branch</td>
                      <td width="10%">
                        <Switch
                          name="Admin_Branch_write"
                          checked={permissions.Admin.Branch.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td width="10%">Article</td>
                      <td width="10%">
                        <Switch
                          name="Admin_Article_write"
                          checked={permissions.Admin.Article.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td width="10%">Package</td>
                      <td width="10%">
                        <Switch
                          name="Admin_Package_write"
                          checked={permissions.Admin.Package.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Vehicle</td>
                      <td>
                        <Switch
                          name="Admin_Vehicle_write"
                          checked={permissions.Admin.Vehicle.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Customers</td>
                      <td>
                        <Switch
                          name="Admin_Customers_write"
                          checked={permissions.Admin.Customers.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Employee</td>
                      <td>
                        <Switch
                          name="Admin_Employee_write"
                          checked={permissions.Admin.Employee.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Driver</td>
                      <td>
                        <Switch
                          name="Admin_Driver_write"
                          checked={permissions.Admin.Driver.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Supplier</td>
                      <td>
                        <Switch
                          name="Admin_Supplier_write"
                          checked={permissions.Admin.Supplier.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>VehicleTaxPay</td>
                      <td>
                        <Switch
                          name="Admin_VehicleTaxPay_write"
                          checked={permissions.Admin.VehicleTaxPay.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>VehicleType</td>
                      <td>
                        <Switch
                          name="Admin_VehicleType_write"
                          checked={permissions.Admin.VehicleType.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>GCNoteStatement</td>
                      <td>
                        <Switch
                          name="Admin_GCNoteStatement_write"
                          checked={permissions.Admin.GCNoteStatement.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Tyre</td>
                      <td>
                        <Switch
                          name="Admin_Tyre_write"
                          checked={permissions.Admin.Tyre.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Kilometer</td>
                      <td>
                        <Switch
                          name="Admin_Kilometer_write"
                          checked={permissions.Admin.Kilometer.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>TyreFitRemove</td>
                      <td>
                        <Switch
                          name="Admin_TyreFitRemove_write"
                          checked={permissions.Admin.TyreFitRemove.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>TyreOutward</td>
                      <td>
                        <Switch
                          name="Admin_TyreOutward_write"
                          checked={permissions.Admin.TyreOutward.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Rate Master (read)</td>
                      <td>
                        <Switch
                          name="Admin_RateMaster_read"
                          checked={permissions["Admin"].RateMaster.read}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Rate Master</td>
                      <td>
                        <Switch
                          name="Admin_RateMaster_write"
                          checked={permissions["Admin"].RateMaster.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={10} className={classes.head}>
                        Sales/Purchase
                      </td>
                    </tr>
                    <tr>
                      <td>TripSheet</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_TripSheet_write"
                          checked={
                            permissions["Sales/Purchase"].TripSheet.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>BankTransaction1</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_BankTransaction1_write"
                          checked={
                            permissions["Sales/Purchase"].BankTransaction1.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>BankPettyCash</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_BankPettyCash_write"
                          checked={
                            permissions["Sales/Purchase"].BankPettyCash.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>ChallanReceiptReg</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_ChallanReceiptReg_write"
                          checked={
                            permissions["Sales/Purchase"].ChallanReceiptReg
                              .write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>MaterialInwardRegisterReport</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_MaterialInwardRegisterReport_write"
                          checked={
                            permissions["Sales/Purchase"]
                              .MaterialInwardRegisterReport.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>MaterialOutwardRegReport</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_MaterialOutwardRegReport_write"
                          checked={
                            permissions["Sales/Purchase"]
                              .MaterialOutwardRegReport.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>InwardStatus</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_InwardStatus_write"
                          checked={
                            permissions["Sales/Purchase"].InwardStatus.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>StockLRRegister</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_StockLRRegister_write"
                          checked={
                            permissions["Sales/Purchase"].StockLRRegister.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PetrolPump</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_PetrolPump_write"
                          checked={
                            permissions["Sales/Purchase"].PetrolPump.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PetrolPump1</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_PetrolPump1_write"
                          checked={
                            permissions["Sales/Purchase"].PetrolPump1.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>BankMaster</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_BankMaster_write"
                          checked={
                            permissions["Sales/Purchase"].BankMaster.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>BankAccountMaster</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_BankAccountMaster_write"
                          checked={
                            permissions["Sales/Purchase"].BankAccountMaster
                              .write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PaymentAdvicePetrol</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_PaymentAdvicePetrol_write"
                          checked={
                            permissions["Sales/Purchase"].PaymentAdvicePetrol
                              .write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>TyreSupplier</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_TyreSupplier_write"
                          checked={
                            permissions["Sales/Purchase"].TyreSupplier.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>TyreSupplierList</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_TyreSupplierList_write"
                          checked={
                            permissions["Sales/Purchase"].TyreSupplierList.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>FundTransfer</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_FundTransfer_write"
                          checked={
                            permissions["Sales/Purchase"].FundTransfer.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      {/* <td>RateMasterList</td>
                    <td>
                      <Switch
                        name="Sales/Purchase_RateMasterList_write"
                        checked={
                          permissions["Sales/Purchase"].RateMasterList.write
                        }
                        onChange={handleSwitchChange}
                      />
                    </td>
                    <td>RateMaster</td>
                    <td>
                      <Switch
                        name="Sales/Purchase_RateMaster_write"
                        checked={permissions["Sales/Purchase"].RateMaster.write}
                        onChange={handleSwitchChange}
                      />
                    </td> */}
                      <td>DeliveryStatus</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_DeliveryStatus_write"
                          checked={
                            permissions["Sales/Purchase"].DeliveryStatus.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>DeliveryStatusReport</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_DeliveryStatusReport_write"
                          checked={
                            permissions["Sales/Purchase"].DeliveryStatusReport
                              .write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Add_FO_No</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_Add_FO_No_write"
                          checked={
                            permissions["Sales/Purchase"].Add_FO_No.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Acknowledge</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_Acknowledge_write"
                          checked={
                            permissions["Sales/Purchase"].Acknowledge.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PaymentAdvice</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_PaymentAdvice_write"
                          checked={
                            permissions["Sales/Purchase"].PaymentAdvice.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>DebitNote</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_DebitNote_write"
                          checked={
                            permissions["Sales/Purchase"].DebitNote.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PendingCheque</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_PendingCheque_write"
                          checked={
                            permissions["Sales/Purchase"].PendingCheque.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>MaterialInward</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_MaterialInward_write"
                          checked={
                            permissions["Sales/Purchase"].MaterialInward.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>MaterialOutward</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_MaterialOutward_write"
                          checked={
                            permissions["Sales/Purchase"].MaterialOutward.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>StockReport</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_StockReport_write"
                          checked={
                            permissions["Sales/Purchase"].StockReport.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>CashMemo</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_CashMemo_write"
                          checked={permissions["Sales/Purchase"].CashMemo.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LorryReceipt</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_LorryReceipt_write"
                          checked={
                            permissions["Sales/Purchase"].LorryReceipt.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>LoadingSlip</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_LoadingSlip_write"
                          checked={
                            permissions["Sales/Purchase"].LoadingSlip.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LRAcknowledge</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_LRAcknowledge_write"
                          checked={
                            permissions["Sales/Purchase"].LRAcknowledge.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LorryReceiptReg</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_LorryReceiptReg_write"
                          checked={
                            permissions["Sales/Purchase"].LorryReceiptReg.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LoadingSlipRegister</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_LoadingSlipRegister_write"
                          checked={
                            permissions["Sales/Purchase"].LoadingSlipRegister
                              .write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LRStatus</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_LRStatus_write"
                          checked={permissions["Sales/Purchase"].LRStatus.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={10} className={classes.head}>
                        Accounts
                      </td>
                    </tr>
                    <tr>
                      <td>RouteBill</td>
                      <td>
                        <Switch
                          name="Accounts_RouteBill_write"
                          checked={permissions.Accounts.RouteBill.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PaymentCollection</td>
                      <td>
                        <Switch
                          name="Accounts_PaymentCollection_write"
                          checked={permissions.Accounts.PaymentCollection.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Voucher</td>
                      <td>
                        <Switch
                          name="Accounts_Voucher_write"
                          checked={permissions.Accounts.Voucher.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>BillRegister</td>
                      <td>
                        <Switch
                          name="Accounts_BillRegister_write"
                          checked={permissions.Accounts.BillRegister.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>BilledLRStatus</td>
                      <td>
                        <Switch
                          name="Accounts_BilledLRStatus_write"
                          checked={permissions.Accounts.BilledLRStatus.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>PaymentCollectionReport</td>
                      <td>
                        <Switch
                          name="Accounts_PaymentCollectionReport_write"
                          checked={
                            permissions.Accounts.PaymentCollectionReport.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>VendorRegister</td>
                      <td>
                        <Switch
                          name="Accounts_VendorRegister_write"
                          checked={permissions.Accounts.VendorRegister.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PettyCashRegister</td>
                      <td>
                        <Switch
                          name="Accounts_PettyCashRegister_write"
                          checked={permissions.Accounts.PettyCashRegister.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Place</td>
                      <td>
                        <Switch
                          name="Accounts_Place_write"
                          checked={permissions.Accounts.Place.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Branch</td>
                      <td>
                        <Switch
                          name="Accounts_Branch_write"
                          checked={permissions.Accounts.Branch.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Package</td>
                      <td>
                        <Switch
                          name="Accounts_Package_write"
                          checked={permissions.Accounts.Package.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Vehicle</td>
                      <td>
                        <Switch
                          name="Accounts_Vehicle_write"
                          checked={permissions.Accounts.Vehicle.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Customers</td>
                      <td>
                        <Switch
                          name="Accounts_Customers_write"
                          checked={permissions.Accounts.Customers.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Driver</td>
                      <td>
                        <Switch
                          name="Accounts_Driver_write"
                          checked={permissions.Accounts.Driver.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Supplier</td>
                      <td>
                        <Switch
                          name="Accounts_Supplier_write"
                          checked={permissions.Accounts.Supplier.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>LorryReceipt</td>
                      <td>
                        <Switch
                          name="Accounts_LorryReceipt_write"
                          checked={permissions.Accounts.LorryReceipt.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LoadingSlip</td>
                      <td>
                        <Switch
                          name="Accounts_LoadingSlip_write"
                          checked={permissions.Accounts.LoadingSlip.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>MaterialInward</td>
                      <td>
                        <Switch
                          name="Accounts_MaterialInward_write"
                          checked={permissions.Accounts.MaterialInward.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>MaterialOutward</td>
                      <td>
                        <Switch
                          name="Accounts_MaterialOutward_write"
                          checked={permissions.Accounts.MaterialOutward.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PATyreReport</td>
                      <td>
                        <Switch
                          name="Accounts_PATyreReport_write"
                          checked={permissions.Accounts.PATyreReport.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>BankTransaction</td>
                      <td>
                        <Switch
                          name="Accounts_BankTransaction_write"
                          checked={permissions.Accounts.BankTransaction.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PetrolReport</td>
                      <td>
                        <Switch
                          name="Accounts_PetrolReport_write"
                          checked={permissions.Accounts.PetrolReport.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={10} className={classes.head}>
                        User
                      </td>
                    </tr>
                    <tr>
                      <td>RoleMaster</td>
                      <td>
                        <Switch
                          name="User_RoleMaster_write"
                          checked={permissions.User.RoleMaster.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>PendingRequest</td>
                      <td>
                        <Switch
                          name="User_PendingRequest_write"
                          checked={permissions.User.PendingRequest.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>UserActivation</td>
                      <td>
                        <Switch
                          name="User_UserActivation_write"
                          checked={permissions.User.UserActivation.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Designation</td>
                      <td>
                        <Switch
                          name="User_Designation_write"
                          checked={permissions.User.Designation.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>ChangePassword</td>
                      <td>
                        <Switch
                          name="User_ChangePassword_write"
                          checked={permissions.User.ChangePassword.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>UserRegister</td>
                      <td>
                        <Switch
                          name="User_UserRegister_write"
                          checked={permissions.User.UserRegister.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="right userpButtons">
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={cancelButtonHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    color="primary"
                    className="ml6"
                  >
                    Save
                  </Button>
                </div>
              </Paper>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default UserPermissions;
