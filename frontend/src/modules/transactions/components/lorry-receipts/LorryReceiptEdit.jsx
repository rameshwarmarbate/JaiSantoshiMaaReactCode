import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Paper,
  Divider,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingSpinner } from "../../../../ui-controls";
import TransactionDetails from "./TransactionDetails";

import {
  DELIVERY_TYPES,
  PAY_TYPES,
  TO_BILLED,
  SERVICE_TAX_BY,
  PAY_MODE,
} from "../../../../services/constants";
import {
  base64ToObjectURL,
  emailRegEx,
  validateNumber,
  validatePhoneNumber,
} from "../../../../services/utils";
import {
  downloadLorryReceipt,
  getLorryReceipt,
  selectIsLoading,
  updateLorryReceipt,
} from "./slice/lorryReceiptSlice";

const initialState = {
  branch: "",
  lrNo: "",
  date: new Date(),
  invoiceNo: "",
  eWayBillNo: "",
  foNum: "",
  consignor: null,
  consignorAddress: "",
  consignorPhone: "",
  consignorEmail: "",
  consignee: null,
  consigneeAddress: "",
  consigneePhone: "",
  consigneeEmail: "",
  from: "",
  to: "",
  totalFreight: "",
  hamali: "",
  deliveryCharges: "",
  lrCharges: 10,
  total: "",
  materialCost: "",
  deliveryType: null,
  serviceTaxBy: null,
  payType: null,
  toBilled: null,
  collectAt: null,
  payMode: null,
  bankName: "",
  chequeNo: "",
  chequeDate: null,
  remark: "",
  transactions: [],
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
  consignor: {
    invalid: false,
    message: "",
  },
  consignorAddress: {
    invalid: false,
    message: "",
  },
  consignorPhone: {
    invalid: false,
    message: "",
  },
  consignorEmail: {
    invalid: false,
    message: "",
  },
  from: {
    invalid: false,
    message: "",
  },
  consignee: {
    invalid: false,
    message: "",
  },
  consigneeAddress: {
    invalid: false,
    message: "",
  },
  consigneePhone: {
    invalid: false,
    message: "",
  },
  consigneeEmail: {
    invalid: false,
    message: "",
  },
  to: {
    invalid: false,
    message: "",
  },
  totalFreight: {
    invalid: false,
    message: "",
  },
  lrCharges: {
    invalid: false,
    message: "",
  },
  payType: {
    invalid: false,
    message: "",
  },
  payMode: {
    invalid: false,
    message: "",
  },
  bankName: {
    invalid: false,
    message: "",
  },
  chequeNo: {
    invalid: false,
    message: "",
  },
  chequeDate: {
    invalid: false,
    message: "",
  },
  transactionDetails: {
    invalid: false,
    message: "",
  },
};

const LorryReceiptEdit = () => {
  const isLoading = useSelector(selectIsLoading);
  const { articles, customers, branches, places } = useSelector(
    ({ lorryreceipt }) => lorryreceipt
  );

  const [lorryReceipt, setLorryReceipt] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { lrId } = location.state;

  useEffect(() => {
    const err = Object.keys(formErrors);
    if (err?.length) {
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
    if (lrId && lrId !== "" && customers?.length) {
      dispatch(getLorryReceipt(lrId))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            const updatedResponse = { ...payload?.data };
            const customerIdsMap = customers?.map?.((customer) => customer._id);
            const consignorIndex = customerIdsMap?.indexOf?.(
              payload?.data.consignor
            );
            const consignor = customers[consignorIndex];
            const consigneeIndex = customerIdsMap?.indexOf?.(
              payload?.data.consignee
            );
            const consignee = customers[consigneeIndex];
            if (payload?.data.deliveryType) {
              const deliveryTypeIndex = DELIVERY_TYPES?.map?.(
                (type) => type.label
              )?.indexOf?.(payload?.data.deliveryType);
              const deliveryType = DELIVERY_TYPES[deliveryTypeIndex];
              updatedResponse.deliveryType = deliveryType;
            }
            if (payload?.data.payType) {
              const payTypeIndex = PAY_TYPES?.map?.(
                (type) => type.label
              )?.indexOf?.(payload?.data.payType);
              const payType = PAY_TYPES[payTypeIndex];
              updatedResponse.payType = payType;
            }

            if (payload?.data.toBilled) {
              const toBilledType = TO_BILLED?.map?.(
                (type) => type.label
              )?.indexOf?.(payload?.data.toBilled);
              const toBilled = TO_BILLED[toBilledType];
              updatedResponse.toBilled = toBilled;
            }

            if (payload?.data.collectAt) {
              const collectAtIndex = places
                ?.map?.((place) => place.name)
                ?.indexOf?.(payload?.data.collectAt);
              const collectAt = places[collectAtIndex];
              updatedResponse.collectAt = collectAt;
            }

            if (payload?.data.serviceTaxBy) {
              const serviceTaxByIndex = SERVICE_TAX_BY?.map?.(
                (client) => client.label
              )?.indexOf?.(payload?.data.serviceTaxBy);
              const serviceTaxBy = SERVICE_TAX_BY[serviceTaxByIndex];
              updatedResponse.serviceTaxBy = serviceTaxBy;
            }

            updatedResponse.consignor = consignor;
            updatedResponse.consignee = consignee;

            if (updatedResponse.payMode) {
              const payModeIndex = PAY_MODE?.map?.(
                (mode) => mode.value
              )?.indexOf?.(payload?.data.payMode);
              updatedResponse.payMode = PAY_MODE[payModeIndex];
            }
            updatedResponse.branch = branches?.find?.(
              ({ _id }) => _id === updatedResponse.branch
            );

            setLorryReceipt(updatedResponse);
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [lrId, customers, places]);

  const goToLorryReceipts = useCallback(() => {
    navigate("/transactions/lorryReceipts");
  }, [navigate]);

  useEffect(() => {
    let totalFreight = 0;
    if (lorryReceipt.transactions?.length) {
      lorryReceipt.transactions?.forEach?.((transaction) => {
        totalFreight += +transaction.freight;
      });
    }
    setLorryReceipt((currentState) => {
      return {
        ...currentState,
        totalFreight: totalFreight,
      };
    });
  }, [lorryReceipt.transactions]);

  useEffect(() => {
    const total =
      +lorryReceipt.totalFreight +
      +lorryReceipt.deliveryCharges +
      +lorryReceipt.lrCharges +
      +lorryReceipt.hamali;
    setLorryReceipt((currentState) => {
      return {
        ...currentState,
        total: total,
      };
    });
  }, [
    lorryReceipt.totalFreight,
    lorryReceipt.deliveryCharges,
    lorryReceipt.lrCharges,
    lorryReceipt.hamali,
  ]);

  const backButtonHandler = () => {
    goToLorryReceipts();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLorryReceipt((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e, isSaveAndPrint, isWithoutAmount = false) => {
    e.preventDefault();
    if (!validateForm(lorryReceipt)) {
      const updatedLR = {
        ...lorryReceipt,
        branch: lorryReceipt?.branch?._id,
        user: user?.employee?.name || "",
      };
      if (updatedLR.consignor) {
        updatedLR.consignor = updatedLR.consignor._id;
        updatedLR.consignee = updatedLR.consignee._id;
      }
      if (updatedLR.deliveryType) {
        updatedLR.deliveryType = updatedLR.deliveryType.value;
      }
      if (updatedLR.payType) {
        updatedLR.payType = updatedLR.payType.value;
      }
      if (updatedLR.toBilled) {
        updatedLR.toBilled = updatedLR.toBilled.value;
      }
      if (updatedLR.collectAt) {
        updatedLR.collectAt = updatedLR.collectAt.value;
      }
      if (updatedLR.serviceTaxBy?.value) {
        updatedLR.serviceTaxBy = updatedLR.serviceTaxBy?.value;
      }
      updatedLR.transactions?.forEach?.((transaction) => {
        transaction.article = transaction.article.label
          ? transaction.article.label
          : transaction.article;
        transaction.rateType = transaction.rateType.label
          ? transaction.rateType.label
          : transaction.rateType;
      });
      if (updatedLR.payMode) {
        updatedLR.payMode = updatedLR.payMode.value;
      }
      updatedLR.isSaveAndPrint = isSaveAndPrint;
      updatedLR.isWithoutAmount = isWithoutAmount;
      dispatch(updateLorryReceipt(updatedLR))
        .then(({ payload = {} }) => {
          const { message, file } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            // if (isSaveAndPrint) {
            //   if (payload?.data._id) {
            //     dispatch(
            //       downloadLorryReceipt({
            //         id: payload?.data._id,
            //         email: "",
            //         isWithoutAmount,
            //         user: user?.employee?.name || "",
            //       })
            //     )
            //       .then(({ payload = {} }) => {
            //         const fileURL = base64ToObjectURL(payload?.data?.file);
            //         if (fileURL) {
            //           const winPrint = window.open(fileURL, "_blank");
            //           winPrint.focus();
            //           winPrint.print();
            //           setHttpError("");
            //           setFormErrors(initialErrorState);
            //           setLorryReceipt(initialState);
            //           goToLorryReceipts();
            //         }
            //       })
            //       .catch((e) => {
            //         setHttpError(e.message);
            //       });
            //   }
            // } else {
            if (file) {
              const fileURL = base64ToObjectURL(file);
              if (fileURL) {
                const winPrint = window.open(fileURL, "_blank");
                winPrint.focus();
                winPrint.print();
              }
            }
            setHttpError("");
            setFormErrors(initialErrorState);
            setLorryReceipt(initialState);
            goToLorryReceipts();
            //}
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  };

  const saveAndPrint = (e, type) => {
    e.preventDefault();
    submitHandler(e, true, type);
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (!formData.branch) {
      errors.branch = { invalid: true, message: "Branch is required" };
    }
    if (!formData.consignor && !formData.consignorName?.trim?.()) {
      errors.consignor = { invalid: true, message: "Consignor is required" };
    }
    if (!formData.consignorAddress) {
      errors.consignorAddress = {
        invalid: true,
        message: "Consignor address is required",
      };
    }
    if (!formData.from?.trim?.()) {
      errors.from = { invalid: true, message: "From is required" };
    }
    if (!formData.consignee && !formData.consigneeName?.trim?.()) {
      errors.consignee = { invalid: true, message: "Consignee is required" };
    }
    if (!formData.consigneeAddress) {
      errors.consigneeAddress = {
        invalid: true,
        message: "Consignee address is required",
      };
    }
    if (
      formData.consigneeEmail?.trim?.() &&
      !emailRegEx.test(formData.consigneeEmail)
    ) {
      errors.consigneeEmail = { invalid: true, message: "Email is invalid" };
    }

    if (
      formData.consignorEmail?.trim?.() &&
      !emailRegEx.test(formData.consignorEmail)
    ) {
      errors.consignorEmail = { invalid: true, message: "Email is invalid" };
    }
    if (!formData.to?.trim?.()) {
      errors.to = { invalid: true, message: "To is required" };
    }
    if (!formData.transactions?.length) {
      errors.transactionDetails = {
        invalid: true,
        message: "At lease 1 transaction is required",
      };
    } else if (formData.transactions?.length > 5) {
      errors.transactionDetails = {
        invalid: true,
        message: "More than 5 articles are not allowed.",
      };
    }
    if (!formData.lrCharges) {
      errors.lrCharges = {
        invalid: true,
        message: "LR charges are required",
      };
    }
    if (!formData.payType) {
      errors.payType = {
        invalid: true,
        message: "Payment type is required",
      };
    }
    if (!formData.payMode && formData.payType === "Paid") {
      errors.payMode = {
        invalid: true,
        message: "Payment mode is required",
      };
    }
    if (
      formData.payType &&
      formData.payType.value &&
      formData.payType.value === "Paid" &&
      formData.payMode &&
      formData.payMode.value === "By Cheque"
    ) {
      if (!formData.bankName) {
        errors.bankName = {
          invalid: true,
          message: "Bank name is required",
        };
      }
      if (!formData.chequeNo) {
        errors.chequeNo = {
          invalid: true,
          message: "Cheque no is required",
        };
      }
      if (!formData.chequeDate) {
        errors.chequeDate = {
          invalid: true,
          message: "Cheque date is required",
        };
      }
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
    setLorryReceipt((currState) => {
      return {
        ...currState,
        [name]: new Date(date),
      };
    });
  };

  const consignorChangeHandler = (e, value) => {
    if (value) {
      if (typeof value === "object") {
        setLorryReceipt((currState) => {
          return {
            ...currState,
            consignor: value,
            consignorName: value.label,
            consignorAddress: value.address,
            from: value.city,
            consignorPhone: value.telephone,
            consignorEmail: value.email,
          };
        });
      }
    } else {
      setLorryReceipt((currState) => {
        return {
          ...currState,
          consignor: null,
          consignorName: "",
          consignorAddress: "",
          consignorPhone: "",
          consignorEmail: "",
          from: "",
        };
      });
    }
  };

  const consignorChange = ({ target }) => {
    setLorryReceipt((currState) => {
      return {
        ...currState,
        consignorName: target.value,
      };
    });
  };

  const consigneeChangeHandler = (e, value) => {
    if (value) {
      if (typeof value === "object") {
        setLorryReceipt((currState) => {
          return {
            ...currState,
            consignee: value,
            consigneeName: value.label,
            consigneeAddress: value.address,
            to: value.city,
            consigneePhone: value.telephone,
            consigneeEmail: value.email,
          };
        });
      }
    } else {
      setLorryReceipt((currState) => {
        return {
          ...currState,
          consignee: null,
          consigneeName: "",
          consigneeAddress: "",
          consigneePhone: "",
          consigneeEmail: "",
          to: "",
        };
      });
    }
  };

  const consigneeChange = ({ target }) => {
    setLorryReceipt((currState) => {
      return {
        ...currState,
        consigneeName: target.value,
      };
    });
  };
  const autocompleteChangeListener = (e, option, name) => {
    setLorryReceipt((currState) => {
      return {
        ...currState,
        [name]: option,
        ...(name === "branch"
          ? {
              collectAt: places?.find?.(({ _id }) => _id === option?.place),
            }
          : {}),
      };
    });
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <h1 className="pageHead">Edit a lorry receipt</h1>
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
            <Alert id="alertError" severity="error">
              {httpError}
            </Alert>
          </Stack>
        )}
        <form action="" onSubmit={submitHandler} id="lorryReceiptForm">
          <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
            <div className="grid grid-6-col">
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.branch.invalid}
                >
                  <Autocomplete
                    disablePortal
                    size="small"
                    name="branch"
                    options={branches}
                    value={lorryReceipt.branch || null}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "branch")
                    }
                    getOptionLabel={(branch) => branch.name}
                    openOnFocus
                    disabled={
                      user &&
                      user.type &&
                      user.type?.toLowerCase?.() !== "superadmin" &&
                      user.type?.toLowerCase?.() !== "admin"
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Branch"
                        name="branch"
                        error={formErrors.branch.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.branch.invalid && (
                    <FormHelperText>{formErrors.branch.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="LR no."
                    value={lorryReceipt.lrNo}
                    onChange={inputChangeHandler}
                    name="lrNo"
                    id="lrNo"
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      inputFormat="DD/MM/YYYY"
                      value={lorryReceipt.date}
                      onChange={dateInputChangeHandler.bind(null, "date")}
                      renderInput={(params) => (
                        <TextField name="date" size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Invoice no."
                    value={lorryReceipt.invoiceNo}
                    onChange={inputChangeHandler}
                    name="invoiceNo"
                    id="invoiceNo"
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="E-Way bill no"
                    value={lorryReceipt.eWayBillNo}
                    onChange={inputChangeHandler}
                    name="eWayBillNo"
                    id="eWayBillNo"
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="FO no"
                    value={lorryReceipt.foNum}
                    onChange={inputChangeHandler}
                    name="foNum"
                    id="foNum"
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.consignor.invalid}
                >
                  <Autocomplete
                    id="consignor"
                    freeSolo
                    autoSelect
                    size="small"
                    name="consignor"
                    options={customers}
                    value={lorryReceipt.consignor}
                    onChange={consignorChangeHandler}
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Consignor"
                        name="consignor"
                        onChange={(e) => consignorChange(e)}
                        error={formErrors.consignor.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.consignor.invalid && (
                    <FormHelperText>
                      {formErrors.consignor.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.consignorAddress.invalid}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Consignor address"
                    value={lorryReceipt.consignorAddress}
                    error={formErrors.consignorAddress.invalid}
                    onChange={inputChangeHandler}
                    name="consignorAddress"
                    id="consignorAddress"
                  />
                  {formErrors.consignorAddress.invalid && (
                    <FormHelperText>
                      {formErrors.consignorAddress.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.consignorPhone.invalid}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Consignor phone"
                    value={lorryReceipt.consignorPhone}
                    error={formErrors.consignorPhone.invalid}
                    onChange={inputChangeHandler}
                    onInput={validatePhoneNumber}
                    name="consignorPhone"
                    id="consignorPhone"
                  />
                  {formErrors.consignorPhone.invalid && (
                    <FormHelperText>
                      {formErrors.consignorPhone.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>{" "}
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.consignorEmail.invalid}
                >
                  <TextField
                    type="text"
                    size="small"
                    variant="outlined"
                    label="Consignor email"
                    value={lorryReceipt.consignorEmail || ""}
                    error={formErrors.consignorEmail.invalid}
                    onChange={inputChangeHandler}
                    name="consignorEmail"
                    id="consignorEmail"
                  />
                  {formErrors.consignorEmail.invalid && (
                    <FormHelperText>
                      {formErrors.consignorEmail.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.from.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="From"
                    error={formErrors.from.invalid}
                    value={lorryReceipt.from}
                    onChange={inputChangeHandler}
                    name="from"
                    id="from"
                  />
                  {formErrors.from.invalid && (
                    <FormHelperText>{formErrors.from.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.consignee.invalid}
                >
                  <Autocomplete
                    id="consignee"
                    freeSolo
                    autoSelect
                    size="small"
                    name="consignee"
                    options={customers}
                    value={lorryReceipt.consignee}
                    onChange={consigneeChangeHandler}
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Consignee"
                        name="consignee"
                        onChange={(e) => consigneeChange(e)}
                        error={formErrors.consignee.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.consignee.invalid && (
                    <FormHelperText>
                      {formErrors.consignee.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.consigneeAddress.invalid}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Consignee address"
                    value={lorryReceipt.consigneeAddress}
                    error={formErrors.consigneeAddress.invalid}
                    onChange={inputChangeHandler}
                    name="consigneeAddress"
                    id="consigneeAddress"
                  />
                  {formErrors.consigneeAddress.invalid && (
                    <FormHelperText>
                      {formErrors.consigneeAddress.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.consigneePhone.invalid}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Consignee phone"
                    value={lorryReceipt.consigneePhone}
                    error={formErrors.consigneePhone.invalid}
                    onChange={inputChangeHandler}
                    onInput={validatePhoneNumber}
                    name="consigneePhone"
                    id="consigneePhone"
                  />
                  {formErrors.consigneePhone.invalid && (
                    <FormHelperText>
                      {formErrors.consigneePhone.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>{" "}
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.consigneeEmail.invalid}
                >
                  <TextField
                    type="text"
                    size="small"
                    variant="outlined"
                    label="Consignee email"
                    value={lorryReceipt.consigneeEmail || ""}
                    error={formErrors.consigneeEmail.invalid}
                    onChange={inputChangeHandler}
                    name="consigneeEmail"
                    id="consigneeEmail"
                  />
                  {formErrors.consigneeEmail.invalid && (
                    <FormHelperText>
                      {formErrors.consigneeEmail.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.to.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="To"
                    error={formErrors.to.invalid}
                    value={lorryReceipt.to}
                    onChange={inputChangeHandler}
                    name="to"
                    id="to"
                  />
                  {formErrors.to.invalid && (
                    <FormHelperText>{formErrors.to.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
          </Paper>
        </form>
        <h2 className="mb20">Transactions details</h2>
        {formErrors.transactionDetails.invalid && (
          <p className="error">{formErrors.transactionDetails.message}</p>
        )}
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <TransactionDetails
            articles={articles}
            lorryReceipt={lorryReceipt}
            setLorryReceipt={setLorryReceipt}
          />
          <Divider sx={{ margin: "20px 0" }} />
          <form action="" onSubmit={submitHandler} id="lorryReceiptForm">
            <div className="grid grid-7-col">
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    label="Total freight"
                    value={lorryReceipt.totalFreight}
                    name="totalFreight"
                    id="totalFreight"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Delivery charges"
                    value={lorryReceipt.deliveryCharges || ""}
                    name="deliveryCharges"
                    id="deliveryCharges"
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.lrCharges.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="LR charges"
                    value={lorryReceipt.lrCharges || ""}
                    error={formErrors.lrCharges.invalid}
                    name="lrCharges"
                    id="lrCharges"
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formErrors.lrCharges.invalid && (
                    <FormHelperText>
                      {formErrors.lrCharges.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Hamali"
                    value={lorryReceipt.hamali || ""}
                    name="hamali"
                    id="hamali"
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
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
                    value={lorryReceipt.total}
                    name="total"
                    id="total"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
          </form>
        </Paper>
        <form action="" onSubmit={submitHandler} id="lorryReceiptForm">
          <h2 className="mb20">Billing details</h2>
          <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
            <div className="grid grid-6-col">
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Material cost"
                    value={lorryReceipt.materialCost || ""}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="materialCost"
                    id="materialCost"
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <Autocomplete
                    disablePortal
                    autoSelect
                    autoHighlight={true}
                    size="small"
                    name="deliveryType"
                    options={DELIVERY_TYPES}
                    value={lorryReceipt.deliveryType}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "deliveryType")
                    }
                    disabled
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="deliveryType"
                        label="Delivery type"
                        fullWidth
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.payType.invalid}
                >
                  <Autocomplete
                    disablePortal
                    autoSelect
                    autoHighlight={true}
                    size="small"
                    name="payType"
                    options={PAY_TYPES}
                    value={lorryReceipt.payType}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "payType")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pay type"
                        name="payType"
                        error={formErrors.payType.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.payType.invalid && (
                    <FormHelperText>
                      {formErrors.payType.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <Autocomplete
                    disablePortal
                    autoSelect
                    autoHighlight={true}
                    size="small"
                    name="toBilled"
                    options={TO_BILLED}
                    value={lorryReceipt.toBilled}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "toBilled")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="toBilled"
                        label="To billed"
                        fullWidth
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <Autocomplete
                    disablePortal
                    autoSelect
                    autoHighlight={true}
                    size="small"
                    name="collectAt"
                    options={places}
                    value={lorryReceipt.collectAt}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "collectAt")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="collectAt"
                        label="Collect at"
                        fullWidth
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <Autocomplete
                    disablePortal
                    autoSelect
                    autoHighlight={true}
                    size="small"
                    name="serviceTaxBy"
                    options={SERVICE_TAX_BY}
                    value={lorryReceipt.serviceTaxBy}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "serviceTaxBy")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="serviceTaxBy"
                        label="Service tax by"
                        fullWidth
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.payMode.invalid}>
                  <Autocomplete
                    disablePortal
                    autoSelect
                    autoHighlight={true}
                    size="small"
                    name="payMode"
                    options={PAY_MODE}
                    value={lorryReceipt.payMode}
                    disabled={lorryReceipt.payType?.value !== "Paid"}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "payMode")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pay mode"
                        name="payMode"
                        error={formErrors.payMode.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.payMode.invalid && (
                    <FormHelperText>
                      {formErrors.payMode.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.bankName.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Bank name"
                    value={lorryReceipt.bankName}
                    onChange={inputChangeHandler}
                    error={formErrors.bankName.invalid}
                    disabled={lorryReceipt.payMode?.value !== "By Cheque"}
                    name="bankName"
                    id="bankName"
                  />
                  {formErrors.bankName.invalid && (
                    <FormHelperText>
                      {formErrors.bankName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.chequeNo.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Cheque no"
                    value={lorryReceipt.chequeNo}
                    onChange={inputChangeHandler}
                    error={formErrors.chequeNo.invalid}
                    disabled={lorryReceipt.payMode?.value !== "By Cheque"}
                    name="chequeNo"
                    id="chequeNo"
                  />
                  {formErrors.chequeNo.invalid && (
                    <FormHelperText>
                      {formErrors.chequeNo.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.chequeDate.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      inputFormat="DD/MM/YYYY"
                      value={lorryReceipt.chequeDate}
                      onChange={dateInputChangeHandler.bind(null, "chequeDate")}
                      error={formErrors.chequeDate.invalid}
                      disabled={lorryReceipt.payMode?.value !== "By Cheque"}
                      renderInput={(params) => (
                        <TextField
                          name="date"
                          size="small"
                          {...params}
                          error={formErrors.chequeDate.invalid}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {formErrors.chequeDate.invalid && (
                    <FormHelperText>
                      {formErrors.chequeDate.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Remark"
                    value={lorryReceipt.remark}
                    onChange={inputChangeHandler}
                    name="remark"
                    id="remark"
                  />
                </FormControl>
              </div>
            </div>
          </Paper>
        </form>

        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <div className="right">
            <Button
              variant="outlined"
              size="medium"
              onClick={backButtonHandler}
            >
              Back
            </Button>
            <Button
              variant="contained"
              size="medium"
              type="submit"
              color="primary"
              form="lorryReceiptForm"
              className="ml6"
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="medium"
              type="button"
              color="primary"
              form="lorryReceiptForm"
              className="ml6"
              onClick={saveAndPrint}
            >
              Save &amp; Print
            </Button>

            <Button
              variant="contained"
              size="medium"
              type="button"
              color="primary"
              form="lorryReceiptForm"
              className="ml6"
              onClick={(e) => saveAndPrint(e, true)}
            >
              Save &amp; Print w/o Amount
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default LorryReceiptEdit;
