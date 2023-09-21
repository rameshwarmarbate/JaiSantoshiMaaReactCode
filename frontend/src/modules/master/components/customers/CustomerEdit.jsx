import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Autocomplete,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Alert, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { LoadingSpinner } from "../../../../ui-controls";
import {
  emailRegEx,
  mobileNoRegEx,
  states,
  validatePhoneNumber,
} from "../../../../services/utils";
import ContactPersonList from "../contact-person/ContactPersonList";
import ContactPersonForm from "../contact-person/ContactPersonForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomer,
  selectIsLoading,
  updateCustomer,
} from "./slice/customerSlice";

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 300,
    maxWidth: 100,
  },
}));

const initialState = {
  name: "",
  address: "",
  telephone: "",
  alternateTelephone: "",
  fax: "",
  cstNo: "",
  gstNo: "",
  state: "",
  city: "",
  email: "",
  vendorCode: "",
  vatNo: "",
  eccNo: "",
  contactPerson: [],
};

const initialErrorState = {
  name: {
    invalid: false,
    message: "",
  },
  address: {
    invalid: false,
    message: "",
  },
  telephone: {
    invalid: false,
    message: "",
  },
  email: {
    invalid: false,
    message: "",
  },
  contactPerson: {
    invalid: false,
    message: "",
  },
};

const CustomerEdit = () => {
  const [customer, setCustomer] = useState(initialState);
  const [fetchedCustomer, setFetchedCustomer] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const [editContact, setEditContact] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  const classes = useStyles();

  const location = useLocation();
  const { customerId } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToCustomersList = useCallback(() => {
    navigate("/master/customers");
  }, [navigate]);

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomer(customerId))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            setCustomer(payload?.data);
            setFetchedCustomer(payload?.data);
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [customerId]);

  const resetButtonHandler = () => {
    setCustomer({ ...fetchedCustomer });
    setHttpError("");
    setFormErrors(initialErrorState);
  };

  const backButtonHandler = () => {
    goToCustomersList();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCustomer((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm(customer)) {
      dispatch(updateCustomer(customer))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            setCustomer(initialState);
            goToCustomersList();
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (!formData.name?.trim?.()) {
      errors.name = { invalid: true, message: "Customer name is required" };
    }
    if (!formData.address?.trim?.()) {
      errors.address = { invalid: true, message: "Address is required" };
    }
    // if (
    //   formData.telephone?.trim?.() !== "" &&
    //   !mobileNoRegEx.test(formData.telephone)
    // ) {
    //   errors.telephone = {
    //     invalid: true,
    //     message: "Phone number should be 10 digits number",
    //   };
    // }
    if (formData.email !== "" && !emailRegEx.test(formData.email)) {
      errors.email = { invalid: true, message: "Email is invalid" };
    }
    if (!formData.contactPerson?.length) {
      errors.contactPerson = {
        invalid: true,
        message: "At least one contact person is required",
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

  const autocompleteChangeListener = (e, value) => {
    setCustomer((currState) => {
      return {
        ...currState,
        state: value,
      };
    });
  };

  const handleOnContactPersonAdd = (receivedPerson) => {
    if (!editContact) {
      setCustomer((currentState) => {
        let currentCustomer = {
          ...currentState,
          contactPerson: [
            ...(currentState?.contactPerson || []),
            receivedPerson,
          ],
        };
        return currentCustomer;
      });
    } else {
      const editedContact = { ...editContact };
      const updatedReceivedPerson = { ...receivedPerson };
      delete updatedReceivedPerson.index;
      setCustomer((currentState) => {
        const currentCustomer = { ...currentState };
        const currentCustomerContacts = [...currentState.contactPerson];
        currentCustomerContacts[editedContact.index] = {
          ...updatedReceivedPerson,
        };
        currentCustomer.contactPerson = [...currentCustomerContacts];
        return currentCustomer;
      });
      setEditContact(null);
    }
  };

  const handleTriggerEdit = (index) => {
    setEditContact({ ...customer.contactPerson[index], index: index });
  };

  const handleTriggerDelete = (contactIndex) => {
    setCustomer((currentState) => {
      const currentCustomer = { ...currentState };
      currentCustomer.contactPerson = currentCustomer.contactPerson?.filter?.(
        (contact, index) => index !== contactIndex
      );
      return currentCustomer;
    });
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <h1 className="pageHead">Edit a customer</h1>
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

        {!isLoading && (
          <div>
            <form action="" id="customerForm" onSubmit={submitHandler}>
              <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
                <div className="grid grid-6-col">
                  <div className="grid-item">
                    <FormControl fullWidth error={formErrors.name.invalid}>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="Name"
                        value={customer.name}
                        error={formErrors.name.invalid}
                        onChange={inputChangeHandler}
                        name="name"
                        id="name"
                      />
                      {formErrors.name.invalid && (
                        <FormHelperText>
                          {formErrors.name.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth error={formErrors.address.invalid}>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="Correspondence address"
                        value={customer.address}
                        onChange={inputChangeHandler}
                        error={formErrors.address.invalid}
                        name="address"
                        id="address"
                      />
                      {formErrors.address.invalid && (
                        <FormHelperText>
                          {formErrors.address.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth error={formErrors.telephone.invalid}>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="Telephone"
                        value={customer.telephone}
                        error={formErrors.telephone.invalid}
                        onChange={inputChangeHandler}
                        onInput={validatePhoneNumber}
                        name="telephone"
                        id="telephone"
                      />
                      {formErrors.telephone.invalid && (
                        <FormHelperText>
                          {formErrors.telephone.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="Alternate Telephone"
                        value={customer.alternateTelephone}
                        onChange={inputChangeHandler}
                        onInput={validatePhoneNumber}
                        name="alternateTelephone"
                        id="alternateTelephone"
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="Fax No"
                        value={customer.fax}
                        onChange={inputChangeHandler}
                        name="fax"
                        id="fax"
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="CST No."
                        value={customer.cstNo}
                        onChange={inputChangeHandler}
                        name="cstNo"
                        id="cstNo"
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="GST No."
                        value={customer.gstNo}
                        onChange={inputChangeHandler}
                        name="gstNo"
                        id="gstNo"
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        disablePortal
                        size="small"
                        name="state"
                        options={states}
                        value={customer.state}
                        onChange={(e, value) =>
                          autocompleteChangeListener(e, value)
                        }
                        getOptionLabel={(option) => option}
                        openOnFocus
                        renderInput={(params) => (
                          <TextField {...params} label="State" fullWidth />
                        )}
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="City"
                        value={customer.city}
                        onChange={inputChangeHandler}
                        name="city"
                        id="city"
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth error={formErrors.email.invalid}>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="Email"
                        value={customer.email}
                        error={formErrors.email.invalid}
                        onChange={inputChangeHandler}
                        name="email"
                        id="email"
                      />
                      {formErrors.email.invalid && (
                        <FormHelperText>
                          {formErrors.email.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="Vendor Code"
                        value={customer.vendorCode}
                        onChange={inputChangeHandler}
                        name="vendorCode"
                        id="vendorCode"
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="VAT No"
                        value={customer.vatNo}
                        onChange={inputChangeHandler}
                        name="vatNo"
                        id="vatNo"
                      />
                    </FormControl>
                  </div>
                  <div className="grid-item">
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        variant="outlined"
                        label="ECC No"
                        value={customer.eccNo}
                        onChange={inputChangeHandler}
                        name="eccNo"
                        id="eccNo"
                      />
                    </FormControl>
                  </div>
                </div>
              </Paper>
            </form>

            <div className="bl_contact_person">
              <div className="bl_form">
                <ContactPersonForm
                  onContactPersonAdd={handleOnContactPersonAdd}
                  editContact={editContact}
                />
              </div>
              <div className="bl_content">
                {formErrors.contactPerson.invalid && (
                  <Stack
                    sx={{
                      width: "100%",
                      margin: "0 0 30px 0",
                      border: "1px solid red",
                      borderRadius: "4px",
                    }}
                    spacing={2}
                  >
                    <Alert severity="error">
                      {formErrors.contactPerson.message}
                    </Alert>
                  </Stack>
                )}
                <ContactPersonList
                  contactPersons={customer.contactPerson}
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
      </div>
    </>
  );
};

export default CustomerEdit;
