import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
  Paper,
  Divider,
  InputAdornment,
} from "@mui/material";
import Select from "@mui/material/Select";
import { Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LorryReceipts from "./LorryReceipts";
import { LoadingSpinner } from "../../../../ui-controls";
import { base64ToObjectURL, validateNumber } from "../../../../services/utils";
import {
  downloadBill,
  getBill,
  getLorryReceiptsByConsignor,
  selectIsLoading,
  updateBill,
} from "./slice/billSlice";

const initialState = {
  branch: "",
  date: new Date(),
  customer: "",
  lrList: [],
  totalFreight: 0,
  freight: 0,
  localFreight: 0,
  cgst: 0,
  cgstPercent: 0,
  sgst: 0,
  sgstPercent: 0,
  total: 0,
  grandTotal: 0,
  remark: "",
};

const initialErrorState = {
  branch: {
    invalid: false,
    message: "",
  },
  date: {
    invalid: false,
    message: "",
  },
  customer: {
    invalid: false,
    message: "",
  },
  lrList: {
    invalid: false,
    message: "",
  },
  totalFreight: {
    invalid: false,
    message: "",
  },
  freight: {
    invalid: false,
    message: "",
  },
  localFreight: {
    invalid: false,
    message: "",
  },
  cgstPercent: {
    invalid: false,
    message: "",
  },
  sgstPercent: {
    invalid: false,
    message: "",
  },
};

const BillEdit = () => {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector(selectIsLoading);

  const { branches, customers } = useSelector(({ bill }) => bill) || {};

  const [lorryReceipts, setLorryReceipts] = useState([]);
  const [fetchedLorryReceipts, setFetchedLorryReceipts] = useState([]);
  const [bill, setBill] = useState(initialState);
  const [fetchedBill, setFetchedBill] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const [isloading, setLoading] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { billId } = location.state;

  const goToBillList = useCallback(() => {
    navigate("/transactions/billList");
  }, [navigate]);

  useEffect(() => {
    const err = Object.keys(formErrors);
    if (err.length) {
      const input = document.querySelector(`input[name=${err[0]}]`);

      input?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [formErrors]);

  useEffect(() => {
    if (httpError) {
      const input = document.getElementById(`alertError`);
      input?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [httpError]);

  useEffect(() => {
    if (user && user.branch) {
      const filteredBranch = branches?.find(
        (branch) => branch._id === user.branch
      );
      if (filteredBranch?._id) {
        setBill((currState) => {
          return {
            ...currState,
            branch: filteredBranch._id,
          };
        });
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    if (fetchedBill.branch && fetchedBill.customer) {
      dispatch(
        getLorryReceiptsByConsignor({
          branch: fetchedBill.branch,
          consignor: fetchedBill.customer,
        })
      )
        .then(({ payload = {} }) => {
          setLoading(false);

          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            const updatedLR = [...(payload?.data || [])];
            updatedLR.forEach((lr) => {
              lr.checked = false;
              lr.consignor =
                customers.filter(
                  (customer) => customer._id === lr.consignor
                )[0] || "";
              lr.consignee =
                customers.filter(
                  (customer) => customer._id === lr.consignee
                )[0] || "";
            });
            setFetchedLorryReceipts(updatedLR);
          }
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [fetchedBill.branch, fetchedBill.customer]);

  useEffect(() => {
    if (billId) {
      dispatch(getBill(billId))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setFetchedBill(payload?.data);
          }
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
        });
    }
  }, [billId]);

  useEffect(() => {
    if (fetchedBill._id && fetchedLorryReceipts.length && customers.length) {
      const updatedBill = { ...fetchedBill };
      const updatedLorryReceipts = fetchedLorryReceipts.map((fetchedLR) => {
        const isInBill = fetchedBill.lrList.filter(
          (lr) => lr._id === fetchedLR._id
        );
        return {
          ...fetchedLR,
          checked: isInBill.length ? true : false,
        };
      });
      let updatedFilteredLorryReceipts;
      if (billId) {
        updatedFilteredLorryReceipts = updatedLorryReceipts.filter((lr) => {
          return (
            !lr.billGenerated || (lr.billGenerated && lr.assoBill === billId)
          );
        });
      }

      updatedBill.lrList = updatedBill.lrList.map((billLr) => {
        return (
          updatedLorryReceipts.filter((lr) => lr._id === billLr._id)[0] || ""
        );
      });
      setBill(updatedBill);
      setLorryReceipts(updatedFilteredLorryReceipts);
    }
  }, [fetchedBill, fetchedLorryReceipts, customers, billId]);

  useEffect(() => {
    const total = +bill.totalFreight + +bill.freight + +bill.localFreight;
    const grandTotal = total + +bill.sgst + +bill.cgst;
    setBill((currState) => {
      return {
        ...currState,
        total: total,
        grandTotal: grandTotal,
      };
    });
  }, [
    bill.totalFreight,
    bill.freight,
    bill.localFreight,
    bill.sgst,
    bill.cgst,
  ]);

  useEffect(() => {
    const total = +bill.totalFreight + +bill.freight + +bill.localFreight;
    const cgst = (total * +bill.cgstPercent) / 100;
    const sgst = (total * +bill.sgstPercent) / 100;
    setBill((currState) => {
      return {
        ...currState,
        cgst: cgst,
        sgst: sgst,
      };
    });
  }, [
    bill.cgstPercent,
    bill.sgstPercent,
    bill.totalFreight,
    bill.freight,
    bill.localFreight,
  ]);

  useEffect(() => {
    const totalFreight = bill.lrList.reduce((acc, item) => acc + item.total, 0);
    setBill((currState) => {
      return {
        ...currState,
        totalFreight: totalFreight,
      };
    });
  }, [bill.lrList]);

  const resetButtonHandler = () => {
    setBill(initialState);
    setHttpError("");
    setFormErrors(initialErrorState);
  };

  const backButtonHandler = () => {
    goToBillList();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBill((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e, isSaveAndPrint) => {
    e.preventDefault();
    if (!validateForm(bill)) {
      dispatch(updateBill(bill))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            if (isSaveAndPrint) {
              dispatch(downloadBill({ id: payload?.data._id, email: "" }))
                .then(({ payload = {} }) => {
                  const { message } = payload?.data || {};
                  if (message) {
                    setHttpError(message);
                  }
                  if (payload?.data.file) {
                    const fileURL = base64ToObjectURL(payload?.data.file);
                    if (fileURL) {
                      const winPrint = window.open(fileURL, "_blank");
                      winPrint.focus();
                      winPrint.print();
                      setHttpError("");
                      setFormErrors(initialErrorState);
                      setBill(initialState);
                      goToBillList();
                    }
                  }
                })
                .catch((error) => {
                  setHttpError(error.message);
                });
            } else {
              setHttpError("");
              setFormErrors(initialErrorState);
              setBill(initialState);
              goToBillList();
            }
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  };

  const saveAndPrint = (e) => {
    e.preventDefault();
    submitHandler(e, true);
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (formData.branch.trim() === "") {
      errors.branch = { invalid: true, message: "Branch is required" };
    }
    if (!formData.date) {
      errors.date = { invalid: true, message: "Date is required" };
    }
    if (formData.customer.trim() === "") {
      errors.customer = { invalid: true, message: "Customer is required" };
    }
    if (!formData.lrList.length) {
      errors.lrList = {
        invalid: true,
        message: "At least one lorry receipt is required",
      };
    }
    if (+formData.totalFreight <= 0) {
      errors.totalFreight = {
        invalid: true,
        message: "Total freight should be greater than 0",
      };
    }
    if (+formData.freight < 0) {
      errors.freight = {
        invalid: true,
        message: "Freight should be 0 or more",
      };
    }
    if (+formData.localFreight < 0) {
      errors.localFreight = {
        invalid: true,
        message: "Local freight should be 0 or more",
      };
    }
    if (+formData.cgstPercent < 0) {
      errors.cgstPercent = {
        invalid: true,
        message: "CGST % should be 0 or more",
      };
    }
    if (+formData.sgstPercent < 0) {
      errors.sgstPercent = {
        invalid: true,
        message: "SGST % should be 0 or more",
      };
    }

    let validationErrors = false;
    for (const key in errors) {
      if (errors[key].invalid === true) {
        validationErrors = true;
      }
    }
    if (validationErrors) {
      setFormErrors(errors);
    }
    return validationErrors;
  };

  const dateInputChangeHandler = (name, date) => {
    setBill((currState) => {
      return {
        ...currState,
        [name]: new Date(date),
      };
    });
  };

  const setLRForBill = () => {
    const selectedLR = lorryReceipts.filter((lr) => lr.checked);
    setBill((currState) => {
      return {
        ...currState,
        lrList: selectedLR,
      };
    });
  };

  return (
    <>
      {(isLoading || isloading) && <LoadingSpinner />}
      <div className="inner-wrap">
        <h1 className="pageHead">Update a bill</h1>
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
            <Alert id="alertError" severity="error">
              {httpError}
            </Alert>
          </Stack>
        )}
        <form action="" onSubmit={submitHandler} id="billForm">
          <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
            <div className="grid grid-6-col">
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.branch.invalid}
                >
                  <InputLabel id="branch">Branch</InputLabel>
                  <Select
                    labelId="branch"
                    name="branch"
                    label="Branch"
                    value={bill.branch}
                    onChange={inputChangeHandler}
                  >
                    {branches.length > 0 &&
                      branches.map((branch) => (
                        <MenuItem
                          key={branch._id}
                          value={branch._id}
                          className="menuItem"
                        >
                          {branch.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {formErrors.branch.invalid && (
                    <FormHelperText>{formErrors.branch.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.date.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      error={formErrors.date.invalid}
                      label="Date"
                      inputFormat="DD/MM/YYYY"
                      value={bill.date}
                      disableFuture={true}
                      onChange={dateInputChangeHandler.bind(null, "date")}
                      inputProps={{
                        readOnly: true,
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="date"
                          size="small"
                          {...params}
                          error={formErrors.date.invalid}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {formErrors.date.invalid && (
                    <FormHelperText>{formErrors.date.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.customer.invalid}
                >
                  <InputLabel id="customer">Customer</InputLabel>
                  <Select
                    labelId="customer"
                    name="customer"
                    label="Customer"
                    value={bill.customer}
                    inputProps={{ readOnly: true }}
                    onChange={inputChangeHandler}
                  >
                    {customers.length > 0 &&
                      customers.map((customer) => (
                        <MenuItem
                          key={customer._id}
                          value={customer._id}
                          className="menuItem"
                        >
                          {customer.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {formErrors.customer.invalid && (
                    <FormHelperText>
                      {formErrors.customer.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
          </Paper>
        </form>
        {formErrors.lrList.invalid && (
          <p className="error">{formErrors.lrList.message}</p>
        )}
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <LorryReceipts
            lorryReceipts={lorryReceipts}
            setLRForBill={setLRForBill}
            bill={bill}
            setBill={setBill}
          />

          <Divider sx={{ margin: "20px 0" }} />
          <form action="" onSubmit={submitHandler} id="billForm">
            <div className="grid grid-6-col">
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    label="Total freight"
                    value={bill.totalFreight}
                    onChange={inputChangeHandler}
                    name="totalFreight"
                    id="totalFreight"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.freight.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Freight"
                    value={bill.freight}
                    error={formErrors.freight.invalid}
                    onInput={validateNumber}
                    onChange={inputChangeHandler}
                    name="freight"
                    id="freight"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      maxLength: 15,
                    }}
                  />
                  {formErrors.freight.invalid && (
                    <FormHelperText>
                      {formErrors.freight.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.localFreight.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Local freight"
                    value={bill.localFreight}
                    error={formErrors.localFreight.invalid}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="localFreight"
                    id="localFreight"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      maxLength: 15,
                    }}
                  />
                  {formErrors.localFreight.invalid && (
                    <FormHelperText>
                      {formErrors.localFreight.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.cgstPercent.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="CGST %"
                    value={bill.cgstPercent}
                    error={formErrors.cgstPercent.invalid}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="cgstPercent"
                    id="cgstPercent"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      maxLength: 15,
                    }}
                  />
                  {formErrors.cgstPercent.invalid && (
                    <FormHelperText>
                      {formErrors.cgstPercent.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    label="CGST"
                    value={bill.cgst}
                    onChange={inputChangeHandler}
                    name="cgst"
                    id="cgst"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </div>

              <div className="grid-item">
                <FormControl fullWidth error={formErrors.sgstPercent.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="SGST %"
                    value={bill.sgstPercent}
                    error={formErrors.sgstPercent.invalid}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="sgstPercent"
                    id="sgstPercent"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      maxLength: 15,
                    }}
                  />
                  {formErrors.sgstPercent.invalid && (
                    <FormHelperText>
                      {formErrors.sgstPercent.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    label="SGST"
                    value={bill.sgst}
                    onChange={inputChangeHandler}
                    name="sgst"
                    id="sgst"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    label="Total"
                    value={bill.total}
                    onChange={inputChangeHandler}
                    name="total"
                    id="total"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    label="Grand total"
                    value={bill.grandTotal}
                    onChange={inputChangeHandler}
                    name="grandTotal"
                    id="grandTotal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Remark"
                    value={bill.remark}
                    onChange={inputChangeHandler}
                    name="remark"
                    id="remark"
                    inputProps={{ maxLength: 200 }}
                  />
                </FormControl>
              </div>
            </div>
          </form>
          <div className="right">
            <Button
              variant="outlined"
              size="medium"
              onClick={backButtonHandler}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={resetButtonHandler}
              className="ml6"
            >
              Reset
            </Button>
            <Button
              variant="contained"
              size="medium"
              type="submit"
              color="primary"
              form="billForm"
              className="ml6"
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="medium"
              type="button"
              color="primary"
              form="billForm"
              className="ml6"
              onClick={saveAndPrint}
            >
              Save &amp; Print
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default BillEdit;
