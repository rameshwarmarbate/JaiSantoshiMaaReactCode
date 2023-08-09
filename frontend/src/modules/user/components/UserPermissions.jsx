import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  Button,
  Divider,
  Switch,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [fetchedUser, setFetchedUser] = useState({});
  const [permissions, setPermissions] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.branch) {
      const filteredBranch = branches?.find?.(
        (branch) => branch._id === user.branch
      );
      if (filteredBranch?._id) {
        setSelectedBranch(filteredBranch);
      }
    }
  }, [branches, user]);

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
      dispatch(getUsersByBranch(selectedBranch?._id))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            if (user.type?.toLowerCase?.() === "superadmin") {
              setBranchUsers(payload?.data);
            } else {
              setBranchUsers(
                payload?.data?.filter?.(({ id }) => user._id !== id)
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
      dispatch(getUserDetail(selectedUser?.id))
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

  const branchChangeHandler = (e, value) => {
    setSelectedBranch(value);
    setBranchUsers([]);
  };

  const userChangeHandler = (e, value) => {
    setSelectedUser(value);
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
      const mainSection = name.split?.("_")[0];
      const subSection = name.split?.("_")[1];
      const type = name.split?.("_")[2];
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
      id: selectedUser?.id,
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
  const isUserType = selectedUser?.type === "User";
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
                {branches && branches?.length > 0 && (
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      disablePortal
                      size="small"
                      name="branch"
                      options={branches}
                      value={selectedBranch || null}
                      onChange={branchChangeHandler}
                      getOptionLabel={(branch) => branch.name || ""}
                      openOnFocus
                      renderInput={(params) => (
                        <TextField {...params} label="Branch" fullWidth />
                      )}
                    />
                  </FormControl>
                )}
              </div>
              <div className="grid-item">
                {branches && branches?.length > 0 && (
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      disablePortal
                      size="small"
                      name="users"
                      options={branchUsers}
                      value={selectedUser || null}
                      onChange={userChangeHandler}
                      getOptionLabel={(user) => user.username || ""}
                      openOnFocus
                      renderInput={(params) => (
                        <TextField {...params} label="Users" fullWidth />
                      )}
                    />
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
                        Master
                      </td>
                    </tr>
                    <tr>
                      <td width="10%">Branch</td>
                      <td width="10%">
                        <Switch
                          name="Admin_Branch_write"
                          disabled={isUserType}
                          checked={
                            isUserType ? false : permissions.Admin.Branch.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td width="10%">Place</td>
                      <td width="10%">
                        <Switch
                          name="Admin_Place_write"
                          disabled={isUserType}
                          checked={
                            isUserType ? false : permissions.Admin.Place.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td width="10%">Article</td>
                      <td width="10%">
                        <Switch
                          name="Admin_Article_write"
                          disabled={isUserType}
                          checked={
                            isUserType ? false : permissions.Admin.Article.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Employee</td>
                      <td>
                        <Switch
                          name="Admin_Employee_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.Admin.Employee.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Driver</td>
                      <td>
                        <Switch
                          name="Admin_Driver_write"
                          disabled={isUserType}
                          checked={
                            isUserType ? false : permissions.Admin.Driver.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Customers</td>
                      <td>
                        <Switch
                          name="Admin_Customers_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.Admin.Customers.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Supplier</td>
                      <td>
                        <Switch
                          name="Admin_Supplier_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.Admin.Supplier.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>VehicleType</td>
                      <td>
                        <Switch
                          name="Admin_VehicleType_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.Admin.VehicleType.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Vehicle</td>
                      <td>
                        <Switch
                          name="Admin_Vehicle_write"
                          disabled={isUserType}
                          checked={
                            isUserType ? false : permissions.Admin.Vehicle.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>BankMaster</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_BankMaster_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions["Sales/Purchase"].BankMaster.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td>BankAccountMaster</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_BankAccountMaster_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions["Sales/Purchase"].BankAccountMaster
                                  .write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Rate Master (read)</td>
                      <td>
                        <Switch
                          name="Admin_RateMaster_read"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions["Admin"].RateMaster.read
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>Rate Master</td>
                      <td>
                        <Switch
                          name="Admin_RateMaster_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions["Admin"].RateMaster.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={10} className={classes.head}>
                        Transactions
                      </td>
                    </tr>
                    <tr>
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
                      <td>LorryFreightChallan</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_LoadingSlip_write"
                          checked={
                            permissions["Sales/Purchase"].LoadingSlip.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LorryFreightChallanReg</td>
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
                    </tr>
                    <tr>
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
                      <td>BillList</td>
                      <td>
                        <Switch
                          name="Accounts_RouteBill_write"
                          checked={permissions.Accounts.RouteBill.write}
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
                      <td>PaymentCollection</td>
                      <td>
                        <Switch
                          name="Accounts_PaymentCollection_write"
                          checked={permissions.Accounts.PaymentCollection.write}
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
                      <td>Quotation</td>
                      <td>
                        <Switch
                          name="Sales/Purchase_TripSheet_write"
                          checked={
                            permissions["Sales/Purchase"].TripSheet.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr>
                      <td colSpan={10} className={classes.head}>
                        Reports
                      </td>
                    </tr>
                    <tr>
                      <td>BilledLRStatus</td>
                      <td>
                        <Switch
                          name="Accounts_BilledLRStatus_write"
                          checked={permissions.Accounts.BilledLRStatus.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>LoadingTripsheet</td>
                      <td>
                        <Switch
                          name="Accounts_LoadingSlip_write"
                          checked={permissions.Accounts.LoadingSlip.write}
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={10} className={classes.head}>
                        User
                      </td>
                    </tr>
                    <tr>
                      <td>UserList</td>
                      <td>
                        <Switch
                          name="User_UserActivation_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.User.UserActivation.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>RoleMaster</td>
                      <td>
                        <Switch
                          name="User_RoleMaster_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.User.RoleMaster.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>ChangePassword</td>
                      <td>
                        <Switch
                          name="User_ChangePassword_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.User.ChangePassword.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td>UserRegister</td>
                      <td>
                        <Switch
                          name="User_UserRegister_write"
                          disabled={isUserType}
                          checked={
                            isUserType
                              ? false
                              : permissions.User.UserRegister.write
                          }
                          onChange={handleSwitchChange}
                        />
                      </td>
                      <td></td>
                      <td></td>
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
