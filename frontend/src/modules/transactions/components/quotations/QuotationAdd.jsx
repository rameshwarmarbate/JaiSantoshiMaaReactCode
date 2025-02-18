import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Paper,
  Divider,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingSpinner } from "../../../../ui-controls";
import Stations from "./Stations";
import { createQuotation, selectIsLoading } from "./slice/quotationSlice";
import { validateNumber } from "../../../../services/utils";

const initialState = {
  date: new Date(),
  customer: "",
  from: null,
  to: null,
  otherField: "",
  field1: "",
  field2: "",
  field3: "",
  termsAndCond: "",
  ddChanger: 500,
  ratePer: "",
  stations: [],
};

const initialErrorState = {
  date: {
    invalid: false,
    message: "",
  },
  customer: {
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
  ratePer: {
    invalid: false,
    message: "",
  },
  stations: {
    invalid: false,
    message: "",
  },
};

const QuotationAdd = () => {
  const isLoading = useSelector(selectIsLoading);
  const [quotation, setQuotation] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const { places } = useSelector(({ quotation }) => quotation) || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToQuotationList = useCallback(() => {
    navigate("/transactions/quotations");
  }, [navigate]);

  const resetButtonHandler = () => {
    setQuotation(initialState);
    setHttpError("");
    setFormErrors(initialErrorState);
  };

  const backButtonHandler = () => {
    goToQuotationList();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuotation((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm(quotation)) {
      dispatch(createQuotation(quotation))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            setFormErrors(initialErrorState);
            setQuotation(initialState);
            goToQuotationList();
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (!formData.date) {
      errors.date = { invalid: true, message: "Date is required" };
    }
    if (!formData.customer?.trim?.()) {
      errors.customer = { invalid: true, message: "Customer is required" };
    }
    if (!formData.from) {
      errors.from = { invalid: true, message: "From date is required" };
    }
    if (!formData.to) {
      errors.to = { invalid: true, message: "To date is required" };
    }
    if (!formData.ratePer?.trim?.()) {
      errors.ratePer = { invalid: true, message: "Rate type is required" };
    }
    if (!formData.stations?.length) {
      errors.stations = {
        invalid: true,
        message: "At least one entry is required",
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
    setQuotation((currState) => {
      return {
        ...currState,
        [name]: new Date(date),
      };
    });
  };

  const stationDeleteHandler = (e, index) => {
    e.preventDefault();
    if (quotation.stations?.length) {
      const updatedStations = quotation.stations;
      updatedStations?.splice?.(index, 1);
      setQuotation((currState) => {
        return {
          ...currState,
          stations: updatedStations,
        };
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <h1 className="pageHead">Add a quotation</h1>
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
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <form action="" onSubmit={submitHandler} id="quotationForm">
            <div className="grid grid-6-col">
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.date.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      error={formErrors.date.invalid}
                      label="Date"
                      inputFormat="DD/MM/YYYY"
                      value={quotation.date}
                      onChange={dateInputChangeHandler.bind(null, "date")}
                      renderInput={(params) => (
                        <TextField
                          name="date"
                          size="small"
                          autoComplete="off"
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
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Customer"
                    error={formErrors.customer.invalid}
                    value={quotation.customer}
                    onChange={inputChangeHandler}
                    name="customer"
                    id="customer"
                  />

                  {formErrors.customer.invalid && (
                    <FormHelperText>
                      {formErrors.customer.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.from.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      error={formErrors.from.invalid}
                      label="From date"
                      inputFormat="DD/MM/YYYY"
                      value={quotation.from}
                      onChange={dateInputChangeHandler.bind(null, "from")}
                      renderInput={(params) => (
                        <TextField
                          name="from"
                          size="small"
                          autoComplete="off"
                          {...params}
                          error={formErrors.from.invalid}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {formErrors.from.invalid && (
                    <FormHelperText>{formErrors.from.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.to.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      error={formErrors.to.invalid}
                      label="To date"
                      inputFormat="DD/MM/YYYY"
                      value={quotation.to}
                      onChange={dateInputChangeHandler.bind(null, "to")}
                      renderInput={(params) => (
                        <TextField
                          name="to"
                          size="small"
                          autoComplete="off"
                          {...params}
                          error={formErrors.to.invalid}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {formErrors.to.invalid && (
                    <FormHelperText>{formErrors.to.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl
                  fullWidth
                  size="small"
                  error={formErrors.ratePer.invalid}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Rate per"
                    helperText="Ex. for 'Full Load' use short (F.L.)"
                    FormHelperTextProps={{
                      disabled: true,
                      classes: { sizeSmall: "small" },
                    }}
                    value={quotation.ratePer}
                    error={formErrors.ratePer.invalid}
                    onChange={inputChangeHandler}
                    name="ratePer"
                    id="ratePer"
                  />

                  {formErrors.ratePer.invalid && (
                    <FormHelperText>
                      {formErrors.ratePer.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Other header field"
                    helperText="Ex. for 'Half Load' use short (H.L.)"
                    FormHelperTextProps={{
                      disabled: true,
                      classes: { sizeSmall: "small" },
                    }}
                    value={quotation.otherField}
                    onChange={inputChangeHandler}
                    name="otherField"
                    id="otherField"
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Additional Terms and Condition"
                    value={quotation.termsAndCond}
                    onChange={inputChangeHandler}
                    name="termsAndCond"
                    id="termsAndCond"
                    inputProps={{ maxLength: 500 }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <TextField
                    size="small"
                    variant="outlined"
                    label="DD Changer"
                    value={quotation.ddChanger || ""}
                    onChange={inputChangeHandler}
                    onInput={validateNumber}
                    name="ddChanger"
                    id="ddChanger"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8377;
                        </InputAdornment>
                      ),
                      maxLength: 10,
                    }}
                    inputProps={{ maxLength: 10 }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Field 1"
                    value={quotation.field1}
                    onChange={inputChangeHandler}
                    name="field1"
                    id="field1"
                    inputProps={{ maxLength: 20 }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Field 2"
                    value={quotation.field2}
                    onChange={inputChangeHandler}
                    name="field2"
                    id="field2"
                    inputProps={{ maxLength: 20 }}
                  />
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth size="small">
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Field 3"
                    value={quotation.field3}
                    onChange={inputChangeHandler}
                    name="field3"
                    id="field3"
                    inputProps={{ maxLength: 20 }}
                  />
                </FormControl>
              </div>
            </div>
          </form>
          <Divider sx={{ margin: "20px 0" }} />
          {formErrors.stations.invalid && (
            <p className="error">{formErrors.stations.message}</p>
          )}
          <Stations
            places={places}
            quotation={quotation}
            setQuotation={setQuotation}
          />

          {quotation.stations?.length > 0 ? (
            <TableContainer>
              <Table sx={{ width: "80%" }} className="tbl_jsm">
                <TableHead>
                  <TableRow>
                    <TableCell>Station</TableCell>
                    <TableCell align="right">
                      Rate per {quotation.ratePer}
                    </TableCell>
                    <TableCell align="right">{quotation.otherField}</TableCell>
                    <TableCell align="right">{quotation.field1}</TableCell>
                    <TableCell align="right">{quotation.field2}</TableCell>
                    <TableCell align="right">{quotation.field3}</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quotation.stations?.map?.((station, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{station.station}</TableCell>
                      <TableCell align="right">
                        &#8377; {station.amount}
                      </TableCell>
                      <TableCell align="right">
                        &#8377; {station.otherFieldValue}
                      </TableCell>
                      <TableCell align="right">
                        &#8377; {station.field1}
                      </TableCell>
                      <TableCell align="right">
                        &#8377; {station.field2}
                      </TableCell>
                      <TableCell align="right">
                        &#8377; {station.field3}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={(e) => stationDeleteHandler(e, index)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
          <Divider sx={{ margin: "20px 0" }} />
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
              form="quotationForm"
              className="ml6"
            >
              Save
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default QuotationAdd;
