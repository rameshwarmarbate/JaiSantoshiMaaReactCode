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
  Autocomplete,
} from "@mui/material";
import { Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LoadingSpinner } from "../../../../ui-controls";
import {
  base64ToObjectURL,
  mobileNoRegEx,
  validateNumber,
  validatePhoneNumber,
} from "../../../../services/utils";
import FreightDetails from "./FreightDetails";
import {
  createLoadingSlip,
  downloadLoadingSlip,
  getLorryReceiptsForLS,
  selectIsLoading,
} from "./slice/loadingSlipSlice";

const initialState = {
  branch: "",
  date: new Date(),
  vehicle: null,
  vehicleNo: "",
  vehicleOwner: "",
  vehicleOwnerAddress: "",
  vehicleOwnerPhone: "",
  driver: null,
  driverName: "",
  licenseNo: "",
  phone: "",
  from: null,
  fromName: null,
  to: null,
  toName: null,
  lrList: [],
  totalFreight: "",
  rent: "",
  advance: "",
  totalPayable: "",
  totalWeight: "",
  currentTime: new Date(),
  reachTime: null,
  paybleAt: null,
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
  vehicle: {
    invalid: false,
    message: "",
  },
  vehicleOwner: {
    invalid: false,
    message: "",
  },
  vehicleOwnerAddress: {
    invalid: false,
    message: "",
  },
  vehicleOwnerPhone: {
    invalid: false,
    message: "",
  },
  driver: {
    invalid: false,
    message: "",
  },
  licenseNo: {
    invalid: false,
    message: "",
  },
  phone: {
    invalid: false,
    message: "",
  },
  from: {
    invalid: false,
    message: "",
  },
  to: {
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
  rent: {
    invalid: false,
    message: "",
  },
  advance: {
    invalid: false,
    message: "",
  },
};

const LoadingSlipAdd = () => {
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector((state) => state.user);
  const { branches, vehicles, suppliers, places, drivers, customers } =
    useSelector(({ loadingslip }) => loadingslip) || {};
  const { state } = useLocation();
  const [lorryReceipts, setLorryReceipts] = useState([]);
  const [loadingSlip, setLoadingSlip] = useState({
    ...initialState,
    branch: state,
  });
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const [isLocalMemo, setIsLocalMemo] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const goToLoadingSlips = useCallback(() => {
    navigate("/transactions/loadingSlips");
  }, [navigate]);

  const goToLocalMemo = useCallback(() => {
    navigate("/transactions/localMemoList");
  }, [navigate]);

  useEffect(() => {
    if (location.pathname) {
      location.pathname.endsWith("addLocalMemoLS")
        ? setIsLocalMemo(true)
        : setIsLocalMemo(false);
    }
  }, []);

  useEffect(() => {
    if (loadingSlip.branch) {
      dispatch(getLorryReceiptsForLS({ branch: loadingSlip.branch, page }))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            const { lorryReceipts, isLastPage } = payload?.data || {};
            setLorryReceipts((list) => [
              ...(page !== 1 ? list : []),
              ...lorryReceipts,
            ]);
            if (!isLastPage) {
              setPage((page) => page + 1);
            }
          }
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
        });
    }
  }, [loadingSlip.branch, page]);

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

  const resetButtonHandler = () => {
    setLoadingSlip(initialState);
    setHttpError("");
    setFormErrors(initialErrorState);
  };

  const backButtonHandler = () => {
    if (isLocalMemo) {
      goToLocalMemo();
    } else {
      goToLoadingSlips();
    }
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "branch") {
      setLorryReceipts(() => []);
      setPage(1);
    }
    setLoadingSlip((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e, isSaveAndPrint) => {
    e.preventDefault();
    if (!validateForm(loadingSlip)) {
      const updatedLoadingSlip = {
        ...loadingSlip,
        branch: loadingSlip.branch?._id,
      };
      if (isLocalMemo) {
        updatedLoadingSlip.isLocalMemo = true;
      } else {
        updatedLoadingSlip.isLocalMemo = false;
      }
      dispatch(createLoadingSlip(updatedLoadingSlip))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            if (isSaveAndPrint) {
              if (payload?.data._id) {
                dispatch(
                  downloadLoadingSlip({ id: payload?.data._id, email: "" })
                )
                  .then(({ payload = {} }) => {
                    const { message } = payload?.data || {};
                    if (message) {
                      setHttpError(message);
                    } else {
                      if (payload?.data.file) {
                        const fileURL = base64ToObjectURL(payload?.data.file);
                        if (fileURL) {
                          const winPrint = window.open(fileURL, "_blank");
                          winPrint.focus();
                          winPrint.print();
                          setHttpError("");
                          setFormErrors(initialErrorState);
                          setLoadingSlip(initialState);
                          if (isLocalMemo) {
                            goToLocalMemo();
                          } else {
                            goToLoadingSlips();
                          }
                        }
                      }
                    }
                  })
                  .catch((error) => {
                    setHttpError(error.message);
                  });
              }
            } else {
              setHttpError("");
              setFormErrors(initialErrorState);
              setLoadingSlip(initialState);
              if (isLocalMemo) {
                goToLocalMemo();
              } else {
                goToLoadingSlips();
              }
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
    if (!formData.branch) {
      errors.branch = { invalid: true, message: "Branch is required" };
    }
    if (!formData.date) {
      errors.date = { invalid: true, message: "Date is required" };
    }
    if (!formData.vehicle) {
      errors.vehicle = { invalid: true, message: "Vehicle is required" };
    }
    if (formData.vehicleOwner?.trim?.() === "") {
      errors.vehicleOwner = {
        invalid: true,
        message: "Vehicle owner is required",
      };
    }
    if (formData.vehicleOwnerAddress?.trim?.() === "") {
      errors.vehicleOwnerAddress = {
        invalid: true,
        message: "Vehicle owner address is required",
      };
    }
    if (formData.vehicleOwnerPhone?.trim?.() === "") {
      errors.vehicleOwnerPhone = {
        invalid: true,
        message: "Owner phone no is required",
      };
    }
    if (!formData.driver) {
      errors.driver = { invalid: true, message: "Driver name is required" };
    }
    if (formData.licenseNo?.trim?.() === "") {
      errors.licenseNo = { invalid: true, message: "License no is required" };
    }
    if (formData.phone?.trim?.() === "") {
      errors.phone = {
        invalid: true,
        message: "Driver's phone no is required",
      };
    }
    if (
      formData.phone &&
      formData.phone?.trim?.() !== "" &&
      !mobileNoRegEx.test(formData.phone)
    ) {
      errors.phone = {
        invalid: true,
        message: "Phone no should be 10 digits number",
      };
    }
    if (!formData.from) {
      errors.from = { invalid: true, message: "From is required" };
    }
    if (!formData.to) {
      errors.to = { invalid: true, message: "To is required" };
    }
    if (!formData.lrList?.length) {
      errors.lrList = {
        invalid: true,
        message: "At least one lorry receipt is required",
      };
    }
    if (formData.totalFreight < 0 || formData.totalFreight === "") {
      errors.totalFreight = {
        invalid: true,
        message: "Total freight is invalid",
      };
    }
    if (formData.rent < 0 || formData.rent === "") {
      errors.rent = { invalid: true, message: "Rent is invalid" };
    }
    if (formData.advance < 0 || formData.advance === "") {
      errors.advance = { invalid: true, message: "Advance is invalid" };
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
    setLoadingSlip((currState) => {
      return {
        ...currState,
        [name]: new Date(date),
      };
    });
  };

  const timeInputChangeHandler = (name, date) => {
    setLoadingSlip((currState) => {
      return {
        ...currState,
        [name]: new Date(date),
      };
    });
  };

  const autocompleteChangeListener = (e, option, name) => {
    setLoadingSlip((currState) => {
      return {
        ...currState,
        [name]: option,
      };
    });
    if (name === "vehicle") {
      if (option && option._id) {
        const selectedVehicle = vehicles?.find?.(
          (vehicle) => vehicle._id === option._id
        );
        const selectedSupplier = suppliers?.find?.(
          (supplier) => supplier._id === selectedVehicle.owner
        );
        setLoadingSlip((currState) => {
          return {
            ...currState,
            vehicleNo: selectedVehicle.vehicleNo,
            vehicleOwner: selectedSupplier.name,
            vehicleOwnerAddress: `${selectedSupplier.address}, ${selectedSupplier.city}`,
            vehicleOwnerPhone: selectedSupplier.phone,
          };
        });
      } else {
        setLoadingSlip((currState) => {
          return {
            ...currState,
            vehicleNo: "",
            vehicleOwner: "",
            vehicleOwnerAddress: "",
            vehicleOwnerPhone: "",
          };
        });
      }
    }

    if (name === "driver") {
      if (option && option._id) {
        const driver = drivers?.find?.((driver) => driver._id === option._id);
        setLoadingSlip((currState) => {
          return {
            ...currState,
            driverName: driver.name,
            licenseNo: driver.licenseNo,
            phone: driver.telephone,
          };
        });
      } else {
        setLoadingSlip((currState) => {
          return {
            ...currState,
            driverName: "",
            licenseNo: "",
            phone: "",
          };
        });
      }
    }
    if (name === "from") {
      if (option && option._id) {
        const from = places?.find?.((place) => place._id === option._id);
        setLoadingSlip((currState) => {
          return {
            ...currState,
            fromName: from.name,
          };
        });
      } else {
        setLoadingSlip((currState) => {
          return {
            ...currState,
            fromName: "",
          };
        });
      }
    }

    if (name === "to") {
      if (option && option._id) {
        const to = places?.find?.((place) => place._id === option._id);
        setLoadingSlip((currState) => {
          return {
            ...currState,
            toName: to.name,
          };
        });
      } else {
        setLoadingSlip((currState) => {
          return {
            ...currState,
            toName: "",
          };
        });
      }
    }
  };

  useEffect(() => {
    const payable =
      +loadingSlip.totalFreight + +loadingSlip.advance - +loadingSlip.rent;
    setLoadingSlip((currState) => {
      return {
        ...currState,
        totalPayable: payable,
      };
    });
  }, [loadingSlip.totalFreight, loadingSlip.rent, loadingSlip.advance]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <h1 className="pageHead">
        {isLocalMemo ? "Add a local Challan" : "Add a Challan"}
      </h1>
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
        <form action="" onSubmit={submitHandler} id="loadingSlipForm">
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
                    value={loadingSlip.branch || null}
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
                <FormControl fullWidth error={formErrors.date.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      error={formErrors.date.invalid}
                      label="Date"
                      inputFormat="DD/MM/YYYY"
                      value={loadingSlip.date}
                      onChange={dateInputChangeHandler.bind(null, "date")}
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
                  error={formErrors.vehicle.invalid}
                >
                  <Autocomplete
                    disablePortal
                    autoSelect
                    size="small"
                    name="vehicle"
                    options={vehicles}
                    value={loadingSlip.vehicle}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "vehicle")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle"
                        error={formErrors.vehicle.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.vehicle.invalid && (
                    <FormHelperText>
                      {formErrors.vehicle.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.vehicleOwner.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Vehicle owner"
                    focused={!!formErrors.vehicleOwner.invalid}
                    error={formErrors.vehicleOwner.invalid}
                    value={loadingSlip.vehicleOwner}
                    onChange={inputChangeHandler}
                    name="vehicleOwner"
                    id="vehicleOwner"
                    inputProps={{ readOnly: true }}
                  />
                  {formErrors.vehicleOwner.invalid && (
                    <FormHelperText>
                      {formErrors.vehicleOwner.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.vehicleOwnerAddress.invalid}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Vehicle owner address"
                    error={formErrors.vehicleOwnerAddress.invalid}
                    value={loadingSlip.vehicleOwnerAddress}
                    onChange={inputChangeHandler}
                    name="vehicleOwnerAddress"
                    id="vehicleOwnerAddress"
                    inputProps={{ readOnly: true }}
                  />
                  {formErrors.vehicleOwnerAddress.invalid && (
                    <FormHelperText>
                      {formErrors.vehicleOwnerAddress.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  error={formErrors.vehicleOwnerPhone.invalid}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Vehicle owner phone"
                    error={formErrors.vehicleOwnerPhone.invalid}
                    value={loadingSlip.vehicleOwnerPhone}
                    onChange={inputChangeHandler}
                    name="vehicleOwnerPhone"
                    id="vehicleOwnerPhone"
                    inputProps={{ readOnly: true }}
                  />
                  {formErrors.vehicleOwnerPhone.invalid && (
                    <FormHelperText>
                      {formErrors.vehicleOwnerPhone.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.driver.invalid}
                >
                  <Autocomplete
                    disablePortal
                    autoSelect
                    size="small"
                    name="driver"
                    options={drivers}
                    value={loadingSlip.driver}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "driver")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Driver"
                        error={formErrors.vehicle.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.driver.invalid && (
                    <FormHelperText>{formErrors.driver.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.licenseNo.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="License no"
                    value={loadingSlip.licenseNo}
                    error={formErrors.licenseNo.invalid}
                    onChange={inputChangeHandler}
                    name="licenseNo"
                    id="licenseNo"
                    inputProps={{ readOnly: true }}
                  />
                  {formErrors.licenseNo.invalid && (
                    <FormHelperText>
                      {formErrors.licenseNo.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.phone.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Telephone"
                    value={loadingSlip.phone}
                    error={formErrors.phone.invalid}
                    onChange={inputChangeHandler}
                    onInput={validatePhoneNumber}
                    name="phone"
                    id="phone"
                    inputProps={{ readOnly: true }}
                  />
                  {formErrors.phone.invalid && (
                    <FormHelperText>{formErrors.phone.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.from.invalid}
                >
                  <Autocomplete
                    disablePortal
                    autoSelect
                    size="small"
                    name="from"
                    options={places}
                    value={loadingSlip.from}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "from")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="From"
                        error={formErrors.from.invalid}
                        fullWidth
                      />
                    )}
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
                  error={formErrors.to.invalid}
                >
                  <Autocomplete
                    disablePortal
                    autoSelect
                    size="small"
                    name="to"
                    options={places}
                    value={loadingSlip.to}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "to")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="To"
                        error={formErrors.to.invalid}
                        fullWidth
                      />
                    )}
                  />
                  {formErrors.to.invalid && (
                    <FormHelperText>{formErrors.to.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
          </Paper>
        </form>
        <h2 className="mb20">Freight details</h2>
        {formErrors.lrList.invalid && (
          <p className="error">{formErrors.lrList.message}</p>
        )}
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <FreightDetails
            loadingSlip={loadingSlip}
            setLoadingSlip={setLoadingSlip}
            customers={customers}
            lorryReceipts={lorryReceipts}
          />
          <Divider sx={{ margin: "20px 0" }} />
          <form action="" onSubmit={submitHandler} id="loadingSlipForm">
            <h3 className="mb20">Charges</h3>
            <div className="grid grid-8-col">
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.totalFreight.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Total freight"
                    value={loadingSlip.totalFreight || ""}
                    error={formErrors.totalFreight.invalid}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="totalFreight"
                    id="totalFreight"
                  />
                  {formErrors.totalFreight.invalid && (
                    <FormHelperText>
                      {formErrors.totalFreight.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.rent.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Rent"
                    value={loadingSlip.rent || ""}
                    error={formErrors.rent.invalid}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="rent"
                    id="rent"
                  />
                  {formErrors.rent.invalid && (
                    <FormHelperText>{formErrors.rent.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.advance.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Advance"
                    value={loadingSlip.advance || ""}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="advance"
                    id="advance"
                  />
                  {formErrors.advance.invalid && (
                    <FormHelperText>
                      {formErrors.advance.message}
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
                    label="Total payable"
                    value={loadingSlip.totalPayable || ""}
                    onChange={inputChangeHandler}
                    name="totalPayable"
                    id="totalPayable"
                    inputProps={{ readOnly: true }}
                  />
                </FormControl>
              </div>
            </div>
          </form>
        </Paper>

        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <form action="" onSubmit={submitHandler} id="loadingSlipForm">
            <div className="grid grid-6-col">
              <div className="grid-item">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampmInClock
                    inputFormat="hh:mm a"
                    label="Current time"
                    value={loadingSlip.currentTime}
                    onChange={timeInputChangeHandler.bind(null, "currentTime")}
                    renderInput={(params) => (
                      <TextField name="currentTime" size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="grid-item">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampmInClock
                    inputFormat="hh:mm a"
                    label="Reach time"
                    value={loadingSlip.reachTime}
                    onChange={timeInputChangeHandler.bind(null, "reachTime")}
                    renderInput={(params) => (
                      <TextField name="reachTime" size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <Autocomplete
                    disablePortal
                    autoSelect
                    size="small"
                    name="paybleAt"
                    options={branches}
                    value={loadingSlip.paybleAt}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "paybleAt")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField {...params} label="Payable at" fullWidth />
                    )}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Remark"
                    value={loadingSlip.remark}
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
              form="loadingSlipForm"
              className="ml6"
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="medium"
              type="button"
              color="primary"
              form="loadingSlipForm"
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

export default LoadingSlipAdd;
