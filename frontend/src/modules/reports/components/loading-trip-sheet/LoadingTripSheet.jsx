import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Paper,
  TextField,
} from "@mui/material";

import Select from "@mui/material/Select";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  getFormattedDate,
  getFormattedLSNumber,
  isSuperAdminOrAdmin,
} from "../../../../services/utils";
import { LoadingSpinner } from "../../../../ui-controls";
import {
  getBranches,
  getLoadingSlipForReport,
  selectIsLoading,
} from "./slice/tripSheetSlice";

const initialState = {
  from: null,
  to: null,
  lrNo: "",
};

const LoadingTripSheet = () => {
  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "formattedLSNo",
      headerName: "LS no.",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "vehicleNo",
      headerName: "Vehicle no",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "driverName",
      headerName: "Driver",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Driver phone",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "fromName",
      headerName: "From",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "toName",
      headerName: "To",
      minWidth: 150,
      flex: 1,
    },
  ];
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [branches, setBranches] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [search, setSearch] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(true);
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
            const filteredBranch = payload?.data.find(
              (branch) => branch._id === user.branch
            );
            setSelectedBranch(filteredBranch);
          }
        }
      })
      .catch((error) => {
        setHttpError(error.message);
      });
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      const query = {};
      if (selectedBranch && selectedBranch._id) {
        query.branch = selectedBranch._id;
      }
      if (search.from) {
        query.from = search.from;
      }
      if (search.to) {
        query.to = search.to;
      }
      if (search.lrNo) {
        query.lrNo = search.lrNo;
      }

      const requestObject = {
        pagination: {
          limit: paginationModel.pageSize ? paginationModel.pageSize : 100,
          page: paginationModel.page + 1,
        },
        query: query,
      };

      dispatch(getLoadingSlipForReport(requestObject))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            const updatedLS = payload?.data.loadingSlips.map((ls) => {
              return {
                ...ls,
                date: getFormattedDate(new Date(ls.date)),
                formattedLSNo: getFormattedLSNumber(ls.lsNo),
              };
            });
            setPageState((currState) => {
              return {
                ...currState,
                isLoading: false,
                data: updatedLS,
                total: payload?.data.count,
              };
            });
          }
          setIsSubmitted(false);
        })
        .catch((error) => {
          setIsSubmitted(false);
          setHttpError(error.message);
        });
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    selectedBranch,
    isSubmitted,
    dispatch,
    search.from,
    search.lrNo,
    search.to,
  ]);

  const branchChangeHandler = (e) => {
    const filteredBranch = branches.find(
      (branch) => branch._id === e.target.value
    );
    setSelectedBranch(filteredBranch);
    setIsSubmitted(true);
    setSearch(initialState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const dateInputChangeHandler = (name, date) => {
    setSearch((currState) => {
      return {
        ...currState,
        [name]: new Date(date),
      };
    });
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setSearch(initialState);
    setIsSubmitted(true);
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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="inner-wrap">
        <div className="page_head">
          <h1 className="pageHead">Lorry Receipt Challan Status</h1>
          <div className="page_actions">
            {selectedBranch && (
              <FormControl
                size="small"
                sx={{ width: "150px", marginRight: "5px" }}
              >
                <InputLabel id="branch">Select branch</InputLabel>
                <Select
                  labelId="branch"
                  name="branch"
                  label="Select branch"
                  value={selectedBranch._id}
                  onChange={branchChangeHandler}
                  disabled={!isSuperAdminOrAdmin()}
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
              </FormControl>
            )}
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
          <h2 className="mb20">Search</h2>
          <form action="" onSubmit={submitHandler}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From"
                      inputFormat="DD/MM/YYYY"
                      value={search.from}
                      onChange={dateInputChangeHandler.bind(null, "from")}
                      renderInput={(params) => (
                        <TextField name="from" size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To"
                      inputFormat="DD/MM/YYYY"
                      value={search.to}
                      onChange={dateInputChangeHandler.bind(null, "to")}
                      renderInput={(params) => (
                        <TextField name="to" size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Lorry receipt no."
                    value={search.lrNo}
                    onChange={inputChangeHandler}
                    name="lrNo"
                    id="lrNo"
                    inputProps={{ maxLength: 50 }}
                  />
                </FormControl>
              </Grid>
              <Grid style={{ display: "flex" }} item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  color="primary"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  size="medium"
                  className="ml6"
                  onClick={(e) => resetHandler(e)}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Paper sx={{ width: "100%" }}>
          <DataGrid
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
            disableSelectionOnClick
            // disableColumnFilter
            // disableColumnSelector
            // disableDensitySelector
            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     csvOptions: { disableToolbarButton: false },
            //     printOptions: { disableToolbarButton: true },
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 300 },
            //   },
            // }}
          />
        </Paper>
      </div>
    </>
  );
};

export default LoadingTripSheet;
