import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  IconButton,
  Alert,
  Stack,
  FormControl,
  Paper,
  TextField,
  FormHelperText,
  Button,
  InputAdornment,
  debounce,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LoadingSpinner } from "../../../../ui-controls";
import {
  getFormattedDate,
  getFormattedLSNumber,
  isSuperAdminOrAdmin,
} from "../../../../services/utils";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  getBranches,
  getLoadingSlipsById,
  getLRAckWithCount,
  selectIsLoading,
  setSearch as onSearch,
} from "./slice/acknowledgeSlice";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const initialState = {
  startDate: null,
  endDate: null,
  type: "",
};

const initialErrorState = {
  startDate: {
    invalid: false,
    message: "",
  },
  endDate: {
    invalid: false,
    message: "",
  },
};

const LRAcknowledgement = () => {
  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "lrNo",
      headerName: "LR no.",
      flex: 1,
    },
    {
      field: "lsNo",
      flex: 1,
      headerName: "LS no.",
    },
    // {
    //   field: "associatedLS",
    //   headerName: "Loaded Date",
    //   minWidth: 170,
    //   renderCell: (params) => {
    //     if (params.row.associatedLS?.date) {
    //       return `${getFormattedDate(
    //         params.row.associatedLS.date
    //       )} ${getFormattedTime(params.row.associatedLS.date)}`;
    //     }
    //   },
    // },
    {
      field: "",
      headerName: "Delivered",
      flex: 1,
      renderCell: (params) => {
        return params.row.deliveryDate ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          ""
        );
      },
    },
    {
      field: "deliveryDate",
      headerName: "Delivered date",
      flex: 1,
      minWidth: 120,
    },
    { field: "payType", headerName: "Pay mode", maxWidth: 100, flex: 1 },
    {
      field: "total",
      headerName: "Receivable amount",
      type: "number",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return <strong>₹ {params.row.total}</strong>;
      },
    },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      maxWidth: 70,
      flex: 1,
      renderCell: (params) => {
        const triggerEdit = (e) => {
          e.stopPropagation();
          return navigateToEdit(params.row._id);
        };

        return (
          <>
            <IconButton size="small" onClick={triggerEdit} color="primary">
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const apiRef = useGridApiRef();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [acknowledgements, setAcknowledgements] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [search, setSearch] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [getLR, setGetLR] = useState(true);
  const [isloading, setLoading] = useState(false);
  const { search: searchData } = useSelector(({ acknowledge }) => acknowledge);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
  });

  useEffect(() => {
    dispatch(getBranches())
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setHttpError("");
          setBranches(payload?.data);
          if (user && user.branch) {
            const filteredBranch = payload?.data?.find?.(
              (branch) => branch._id === user.branch
            );
            setSelectedBranch(filteredBranch);
          }
        }
      })
      .catch(() => {
        setHttpError(
          "Something went wrong! Please try later or contact Administrator."
        );
      });
  }, []);

  useEffect(() => {
    if (selectedBranch?._id && isSubmitted && !hasErrors) {
      const requestObject = {
        query: search,
        branch: selectedBranch._id,
        pagination: {
          limit: paginationModel.pageSize ? paginationModel.pageSize : 100,
          page: paginationModel.page + 1,
        },
      };
      dispatch(getLRAckWithCount(requestObject))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setPageState((currState) => {
              return {
                ...currState,
                isLoading: false,
                data: [],
                total: payload?.data.count,
              };
            });
            setAcknowledgements(payload?.data.lorryReceipts);
          }
          setIsSubmitted(false);
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [
    getLR,
    selectedBranch,
    paginationModel.page,
    paginationModel.pageSize,
    isSubmitted,
  ]);

  useEffect(() => {
    if (acknowledgements?.length) {
      const filteredLSList = acknowledgements?.filter?.(
        (lr) => lr.associatedLS
      );
      const lsList = filteredLSList?.map?.((lr) => lr.associatedLS);
      const uniqueLSList = [...new Set(lsList)];

      dispatch(getLoadingSlipsById(uniqueLSList))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            const updatedLR = acknowledgements;
            updatedLR?.forEach?.((lr) => {
              const assoLS = payload?.data?.find?.(
                (ls) => ls._id === lr.associatedLS
              );
              lr.associatedLS = assoLS;
              lr.total = lr.total?.toFixed?.(2);
              lr.deliveryDate = lr.deliveryDate
                ? getFormattedDate(lr.deliveryDate)
                : "";
              lr.lsNo = getFormattedLSNumber(assoLS?.lsNo);
            });
            setPageState((currState) => {
              return { ...currState, data: updatedLR };
            });
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [acknowledgements]);

  const updateSearchValue = useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split?.(" ")?.filter?.((word) => word !== "")
      );
    }, 500);
  }, [apiRef]);

  useEffect(() => {
    if (searchData && pageState.data?.length) {
      setLoading(true);
      updateSearchValue(searchData);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [pageState.data]);

  const onSearchChange = (e) => {
    updateSearchValue(e.target.value);
    dispatch(onSearch(e.target.value));
  };

  const navigateToEdit = (id) => {
    navigate("/transactions/lrAcknowledgement/editLRAcknowledgement", {
      state: { lrId: id },
    });
  };

  const branchChangeHandler = (e, value) => {
    setSelectedBranch(value);
    setIsSubmitted(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(() => validateForm(search));
    setIsSubmitted(true);
  };

  const inputDateChangeHandler = (name, date) => {
    setSearch((currState) => {
      return {
        ...currState,
        [name]: new Date(date),
      };
    });
    setIsSubmitted(false);
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearch((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (!formData.startDate) {
      errors.startDate = { invalid: true, message: "Start date is required" };
    }
    if (!formData.endDate) {
      errors.endDate = { invalid: true, message: "End date is required" };
    }

    let validationErrors = false;
    for (const key in errors) {
      if (errors[key].invalid === true) {
        validationErrors = true;
      }
    }
    if (validationErrors) {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
    return errors;
  };

  const resetSearchForm = () => {
    setHasErrors(false);
    setFormErrors(initialErrorState);
    setIsSubmitted(true);
    setSearch(initialState);
    setGetLR(true);
  };

  const addAckHandler = () => {
    navigate("/transactions/lrAcknowledgement/addLRAcknowledgement", {
      state: selectedBranch?._id,
    });
  };

  return (
    <>
      {(isLoading || isloading) && <LoadingSpinner />}
      <div className="inner-wrap">
        <div className="page_head">
          <h1 className="pageHead">LR acknowledgements</h1>
          <div className="page_actions">
            <FormControl
              size="small"
              sx={{ width: "210px", marginRight: "5px", marginTop: "5px" }}
            >
              <Autocomplete
                disablePortal
                size="small"
                name="branch"
                className="multi-select"
                options={branches}
                value={selectedBranch}
                onChange={branchChangeHandler}
                disabled={!isSuperAdminOrAdmin()}
                getOptionLabel={(branch) => branch.name}
                openOnFocus
                renderInput={(params) => (
                  <TextField {...params} label="Select branch" fullWidth />
                )}
              />
            </FormControl>
            <Button
              style={{ marginTop: "5px" }}
              variant="contained"
              size="medium"
              type="button"
              color="primary"
              className="ml6"
              onClick={addAckHandler}
            >
              Add acknowledgement
            </Button>
          </div>
        </div>

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
          <h2 style={{ marginBottom: "10px" }}>Search</h2>
          <form action="" onSubmit={submitHandler}>
            <div className="grid grid-6-col">
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.startDate.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start date"
                      inputFormat="DD/MM/YYYY"
                      value={search.startDate}
                      disableFuture={true}
                      disableMaskedInput={true}
                      onChange={inputDateChangeHandler.bind(null, "startDate")}
                      inputProps={{
                        readOnly: true,
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="date"
                          size="small"
                          {...params}
                          error={formErrors.startDate.invalid}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {formErrors.startDate.invalid && (
                    <FormHelperText>
                      {formErrors.startDate.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.endDate.invalid}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End date"
                      inputFormat="DD/MM/YYYY"
                      value={search.endDate}
                      disableMaskedInput={true}
                      onChange={inputDateChangeHandler.bind(null, "endDate")}
                      inputProps={{
                        readOnly: true,
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="date"
                          size="small"
                          {...params}
                          error={formErrors.endDate.invalid}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {formErrors.endDate.invalid && (
                    <FormHelperText>
                      {formErrors.endDate.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <ToggleButtonGroup
                  sx={{ alignItems: "center" }}
                  color="primary"
                  name="type"
                  value={search.type}
                  size="small"
                  exclusive
                  onChange={inputChangeHandler}
                  style={{ width: "100%" }}
                >
                  <ToggleButton
                    style={{ width: "50%" }}
                    name="type"
                    value="delivered"
                  >
                    Delivered
                  </ToggleButton>
                  <ToggleButton
                    style={{ width: "50%" }}
                    name="type"
                    value="undelivered"
                  >
                    Undelivered
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="grid-item">
                <IconButton
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ backgroundColor: "#274d62", marginLeft: "5px" }}
                >
                  <SearchIcon
                    style={{ color: "#ffffff", verticalAlign: "middle" }}
                  />
                </IconButton>
                <IconButton
                  size="small"
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={resetSearchForm}
                  style={{ backgroundColor: "#274d62", marginLeft: "5px" }}
                >
                  <RestartAltIcon
                    style={{ color: "#ffffff", verticalAlign: "middle" }}
                  />
                </IconButton>
              </div>
            </div>
          </form>
        </Paper>

        <DataGrid
          apiRef={apiRef}
          autoHeight
          density="compact"
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          pageSizeOptions={[100]}
          paginationModel={paginationModel}
          onPaginationModelChange={(page) => {
            setPaginationModel(page);
            setIsSubmitted(true);
          }}
          paginationMode="server"
          columns={columns}
          getRowId={(row) => row._id}
          sx={{ backgroundColor: "primary.contrastText" }}
          initialState={{
            ...columns,
            columns: {
              columnVisibilityModel: {
                _id: false,
              },
            },
          }}
          components={{
            Toolbar: () => (
              <GridToolbarContainer
                sx={{
                  gap: "6px",
                  mb: "10px",
                  justifyContent: "end",
                  border: "none",
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="Search..."
                  autoFocus={!!searchData}
                  onChange={onSearchChange}
                  value={searchData}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridToolbarContainer>
            ),
          }}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      </div>
    </>
  );
};

export default LRAcknowledgement;
