import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import { Alert, Stack } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingSpinner } from "../../../../ui-controls";

import TaxDetailForm from "../taxes/TaxDetailForm";
import TaxDetailList from "../taxes/TaxDetailList";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuppliers,
  getVehicle,
  getVehicleTypes,
  selectIsLoading,
  updateVehicle,
} from "./slice/vehicleSlice";

const initialState = {
  owner: "",
  vehicleType: "",
  vehicleNo: "",
  make: "",
  capacity: "",
  regDate: null,
  chassisNo: "",
  engineNo: "",
  description: "",
  taxDetails: [],
};

const initialErrorState = {
  owner: {
    invalid: false,
    message: "",
  },
  vehicleType: {
    invalid: false,
    message: "",
  },
  vehicleNo: {
    invalid: false,
    message: "",
  },
  taxDetails: {
    invalid: false,
    message: "",
  },
};

const VehicleAdd = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [vehicle, setVehicle] = useState(initialState);
  const [fetchedVehicle, setFetchedVehicle] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const [editTax, setEditTax] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = location.state;

  const goToVehiclesList = useCallback(() => {
    navigate("/master/vehicles");
  }, [navigate]);

  useEffect(() => {
    if (vehicleId) {
      dispatch(getVehicle(vehicleId))
        .then(({ payload = {} }) => {
          const { message, regDate } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            if (regDate) {
              payload.data.regDate = dayjs(regDate);
            }
            setVehicle(payload?.data);
            setFetchedVehicle(payload?.data);
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [vehicleId]);

  useEffect(() => {
    dispatch(getSuppliers())
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setHttpError("");
          setSuppliers(payload?.data);
        }
      })
      .catch((error) => {
        setHttpError(error.message);
      });
  }, []);

  useEffect(() => {
    dispatch(getVehicleTypes())
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setHttpError("");
          setVehicleTypes(payload?.data);
        }
      })
      .catch((error) => {
        setHttpError(error.message);
      });
  }, []);

  const resetButtonHandler = () => {
    setVehicle(fetchedVehicle);
    setHttpError("");
    setFormErrors(initialErrorState);
  };

  const backButtonHandler = () => {
    goToVehiclesList();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVehicle((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const dateInputChangeHandler = (name, date) => {
    setVehicle((currState) => {
      return {
        ...currState,
        [name]: date,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm(vehicle)) {
      dispatch(updateVehicle(vehicle))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            setVehicle(initialState);
            goToVehiclesList();
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (formData.owner?.trim?.() === "") {
      errors.owner = { invalid: true, message: "Supplier is required" };
    }
    if (
      !formData.vehicleType ||
      (formData.vehicleType && formData.vehicleType?.trim?.() === "")
    ) {
      errors.vehicleType = {
        invalid: true,
        message: "Vehicle type is required",
      };
    }
    if (formData.vehicleNo?.trim?.() === "") {
      errors.vehicleNo = {
        invalid: true,
        message: "Vehicle number is required",
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

  const handleOnTaxDetailAdd = (receivedTaxDetail) => {
    if (!editTax) {
      setVehicle((currentState) => {
        const currentVehicle = { ...currentState };
        currentVehicle.taxDetails.push?.(receivedTaxDetail);
        return currentVehicle;
      });
    } else {
      const editedTaxDetail = { ...editTax };
      const updatedReceivedTaxDetail = { ...receivedTaxDetail };
      delete updatedReceivedTaxDetail.index;
      setVehicle((currentState) => {
        const currentVehicle = { ...currentState };
        const currentVehicleTaxDetails = [...currentState.taxDetails];
        currentVehicleTaxDetails[editedTaxDetail.index] = {
          ...updatedReceivedTaxDetail,
        };
        currentVehicle.taxDetails = [...currentVehicleTaxDetails];
        return currentVehicle;
      });
      setEditTax(null);
    }
  };

  const handleTriggerEdit = (index) => {
    setEditTax({ ...vehicle.taxDetails[index], index: index });
  };

  const handleTriggerDelete = (contactIndex) => {
    setVehicle((currentState) => {
      const currentVehicle = { ...currentState };
      currentVehicle.taxDetails = currentVehicle.taxDetails.filter?.(
        (contact, index) => index !== contactIndex
      );
      return currentVehicle;
    });
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <h1 className="pageHead">Edit a vehicle</h1>
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

      {!isLoading && (
        <div>
          <form action="" id="customerForm" onSubmit={submitHandler}>
            <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
              <div className="grid grid-6-col">
                <div className="grid-item">
                  <FormControl
                    fullWidth
                    size="small"
                    error={formErrors.owner.invalid}
                  >
                    <InputLabel id="vehicleOwner">Vehicle supplier</InputLabel>
                    <Select
                      labelId="vehicleOwner"
                      name="owner"
                      value={vehicle.owner}
                      label="Vehicle supplier"
                      onChange={inputChangeHandler}
                    >
                      {suppliers.map?.((supplier) => (
                        <MenuItem
                          key={supplier._id}
                          value={supplier._id}
                          className="menuItem"
                        >
                          {supplier.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.owner.invalid && (
                      <FormHelperText>
                        {formErrors.owner.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="grid-item">
                  <FormControl fullWidth error={formErrors.vehicleNo.invalid}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Vehicle number"
                      value={vehicle.vehicleNo}
                      error={formErrors.vehicleNo.invalid}
                      onChange={inputChangeHandler}
                      name="vehicleNo"
                      id="vehicleNo"
                    />
                    {formErrors.vehicleNo.invalid && (
                      <FormHelperText>
                        {formErrors.vehicleNo.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="grid-item">
                  <FormControl
                    fullWidth
                    size="small"
                    error={formErrors.vehicleType.invalid}
                  >
                    <InputLabel id="vehicleType">Vehicle type</InputLabel>
                    <Select
                      labelId="vehicleType"
                      name="vehicleType"
                      value={vehicle.vehicleType}
                      label="Vehicle type"
                      onChange={inputChangeHandler}
                    >
                      {vehicleTypes.map?.((vehicleType) => (
                        <MenuItem
                          key={vehicleType._id}
                          value={vehicleType._id}
                          className="menuItem"
                        >
                          {vehicleType.type}
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.vehicleType.invalid && (
                      <FormHelperText>
                        {formErrors.vehicleType.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="grid-item">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Make"
                      value={vehicle.make}
                      onChange={inputChangeHandler}
                      name="make"
                      id="make"
                    />
                  </FormControl>
                </div>
                <div className="grid-item">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Capacity"
                      value={vehicle.capacity}
                      onChange={inputChangeHandler}
                      name="capacity"
                      id="capacity"
                    />
                  </FormControl>
                </div>
                <div className="grid-item">
                  <FormControl fullWidth error>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Registration date"
                        inputFormat="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        value={vehicle.regDate}
                        disableFuture={true}
                        onChange={dateInputChangeHandler.bind(null, "regDate")}
                        renderInput={(params) => (
                          <TextField name="regDate" size="small" {...params} />
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
                      label="Chassis number"
                      value={vehicle.chassisNo}
                      onChange={inputChangeHandler}
                      name="chassisNo"
                      id="chassisNo"
                    />
                  </FormControl>
                </div>
                <div className="grid-item">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Engine number"
                      value={vehicle.engineNo}
                      onChange={inputChangeHandler}
                      name="engineNo"
                      id="engineNo"
                    />
                  </FormControl>
                </div>
                <div className="grid-item">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Description"
                      value={vehicle.description}
                      onChange={inputChangeHandler}
                      name="description"
                      id="description"
                    />
                  </FormControl>
                </div>
              </div>
            </Paper>
          </form>

          <div className="bl_contact_person">
            <div className="bl_form">
              <TaxDetailForm
                onTaxDetailAdd={handleOnTaxDetailAdd}
                editTaxDetail={editTax}
              />
            </div>
            <div className="bl_content">
              <TaxDetailList
                taxDetails={vehicle.taxDetails}
                handleTriggerEdit={handleTriggerEdit}
                handleTriggerDelete={handleTriggerDelete}
              />
            </div>
          </div>
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
              form="customerForm"
              className="ml6"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleAdd;
