import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
  Paper,
} from "@mui/material";
import Select from "@mui/material/Select";
import { Alert, Stack } from "@mui/material";
import { LoadingSpinner } from "../../../../ui-controls";
import { useDispatch, useSelector } from "react-redux";
import {
  getBranch,
  getPlaces,
  selectIsLoading,
  updateBranch,
} from "./slice/branchSlice";

const initialBranchState = {
  branchCode: "",
  abbreviation: "",
  name: "",
  description: "",
  place: "",
  printer: "",
};

const initialErrorState = {
  branchCode: {
    invalid: false,
    message: "",
  },
  abbreviation: {
    invalid: false,
    message: "",
  },
  name: {
    invalid: false,
    message: "",
  },
  place: {
    invalid: false,
    message: "",
  },
  printer: {
    invalid: false,
    message: "",
  },
};

const BranchEdit = () => {
  const [branch, setBranch] = useState(initialBranchState);
  const [places, setPlaces] = useState([]);
  const [fetchedBranch, setFetchedBranch] = useState(initialBranchState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const isLoading = useSelector(selectIsLoading);

  const location = useLocation();
  const { branchId } = location.state;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToBranchList = useCallback(() => {
    navigate("/master/branches");
  }, [navigate]);

  useEffect(() => {
    dispatch(getPlaces())
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setHttpError("");
          setPlaces(payload?.data);
        }
      })
      .catch((error) => {
        setHttpError(error.message);
      });
  }, []);

  useEffect(() => {
    if (branchId && branchId !== "") {
      dispatch(getBranch(branchId))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            setBranch(payload?.data);
            setFetchedBranch(payload?.data);
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [branchId]);

  const resetButtonHandler = () => {
    setBranch(fetchedBranch);
    setHttpError("");
    setFormErrors(initialErrorState);
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBranch((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm(branch)) {
      dispatch(updateBranch(branch))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setHttpError("");
            setBranch(initialBranchState);
            goToBranchList();
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (formData.branchCode.trim() === "") {
      errors.branchCode = { invalid: true, message: "Branch code is required" };
    }
    if (formData.abbreviation.trim() === "") {
      errors.abbreviation = {
        invalid: true,
        message: "Abbreviation is required",
      };
    }
    if (formData.name.trim() === "") {
      errors.name = { invalid: true, message: "Branch name is required" };
    }
    if (formData.place.trim() === "") {
      errors.place = { invalid: true, message: "Place is required" };
    }
    if (formData.printer.trim() === "") {
      errors.printer = { invalid: true, message: "Printer is required" };
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

  const cancelButtonHandler = () => {
    goToBranchList();
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <h1 className="pageHead">Edit a branch</h1>
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
        <form action="" onSubmit={submitHandler}>
          <div className="grid grid-6-col">
            <div className="grid-item">
              <FormControl fullWidth error={formErrors.branchCode.invalid}>
                <TextField
                  variant="outlined"
                  label="Branch code"
                  value={branch.branchCode}
                  onChange={inputChangeHandler}
                  name="branchCode"
                  id="branchCode"
                  size="small"
                  error={formErrors.branchCode.invalid}
                />
                {formErrors.branchCode.invalid && (
                  <FormHelperText>
                    {formErrors.branchCode.message}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="grid-item">
              <FormControl fullWidth error={formErrors.abbreviation.invalid}>
                <TextField
                  variant="outlined"
                  label="Abbreviation"
                  error={formErrors.abbreviation.invalid}
                  value={branch.abbreviation}
                  onChange={inputChangeHandler}
                  name="abbreviation"
                  id="abbreviation"
                  size="small"
                />
                {formErrors.abbreviation.invalid && (
                  <FormHelperText>
                    {formErrors.abbreviation.message}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="grid-item">
              <FormControl fullWidth error={formErrors.name.invalid}>
                <TextField
                  variant="outlined"
                  label="Name"
                  error={formErrors.name.invalid}
                  value={branch.name}
                  onChange={inputChangeHandler}
                  name="name"
                  id="name"
                  size="small"
                />
                {formErrors.name.invalid && (
                  <FormHelperText>{formErrors.name.message}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="grid-item">
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  label="Description"
                  value={branch.description}
                  onChange={inputChangeHandler}
                  name="description"
                  id="description"
                  size="small"
                />
              </FormControl>
            </div>
            <div className="grid-item">
              <FormControl
                fullWidth
                size="small"
                error={formErrors.place.invalid}
              >
                <InputLabel id="place">Place</InputLabel>
                <Select
                  labelId="place"
                  name="place"
                  value={branch.place}
                  label="Place"
                  onChange={inputChangeHandler}
                >
                  {places.map((place) => (
                    <MenuItem
                      key={place._id}
                      value={place._id}
                      className="menuItem"
                    >
                      {place.name}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.place.invalid && (
                  <FormHelperText>{formErrors.place.message}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="grid-item">
              <FormControl
                fullWidth
                size="small"
                error={formErrors.printer.invalid}
              >
                <InputLabel id="printer">Printer</InputLabel>
                <Select
                  labelId="printer"
                  name="printer"
                  value={branch.printer}
                  label="Printer"
                  onChange={inputChangeHandler}
                >
                  <MenuItem
                    key="Epson LQ-300+"
                    value="Epson LQ-300+"
                    className="menuItem"
                  >
                    Epson LQ-300+
                  </MenuItem>
                  <MenuItem
                    key="Epson LX-300+"
                    value="Epson LX-300+"
                    className="menuItem"
                  >
                    Epson LX-300+
                  </MenuItem>
                  <MenuItem
                    key="Epson LX-300+II"
                    value="Epson LX-300+II"
                    className="menuItem"
                  >
                    Epson LX-300+II
                  </MenuItem>
                  <MenuItem
                    key="TVS MPS 250 Champion"
                    value="TVS MPS 250 Champion"
                    className="menuItem"
                  >
                    TVS MPS 250 Champion
                  </MenuItem>
                </Select>
                {formErrors.place.invalid && (
                  <FormHelperText>{formErrors.place.message}</FormHelperText>
                )}
              </FormControl>
            </div>
          </div>
          <div className="right">
            <Button
              variant="outlined"
              size="medium"
              onClick={cancelButtonHandler}
            >
              Cancel
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
              className="ml6"
            >
              Save
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default BranchEdit;
