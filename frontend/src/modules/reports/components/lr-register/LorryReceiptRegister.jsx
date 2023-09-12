import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Stack,
  FormControl,
  Button,
  Paper,
  Autocomplete,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileSaver from "file-saver";
import {
  getFormattedDate,
  isSuperAdminOrAdmin,
} from "../../../../services/utils";
import { LoadingSpinner } from "../../../../ui-controls";
import {
  downloadLRReport,
  getBranches,
  getCustomers,
  getLorryReceiptsForReport,
  selectIsLoading,
} from "./slice/lrRegisterSlice";

const initialState = {
  consignor: null,
  consignee: null,
  from: null,
  to: null,
  payType: "",
  searchText: "",
};

const LorryReceiptRegister = () => {
  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "srNo",
      headerName: "Sr. No.",
    },
    {
      field: "lrNo",
      headerName: "L.R. Note No.",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Consign Date",
      flex: 1,
    },
    {
      field: "invoiceNo",
      headerName: "Invoice No",
      flex: 1,
    },
    {
      field: "consignorName",
      headerName: "Consignor Name",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "consigneeName",
      headerName: "Consignee Name",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "from",
      headerName: "From",
      flex: 1,
    },
    {
      field: "to",
      headerName: "To",
      flex: 1,
    },
    {
      field: "payType",
      headerName: "Payment Mode",
      flex: 1,
    },
    {
      field: "totalArticles",
      headerName: "Total Qty",
      type: "number",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Grand Total",
      type: "number",
      flex: 1,
    },
  ];
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [search, setSearch] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
  });
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getCustomers())
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setHttpError("");
          const updatedCustomers = payload?.data?.map?.((customer) => {
            return {
              ...customer,
              label: customer.name,
            };
          });
          setCustomers(updatedCustomers);
        }
      })
      .catch((error) => {
        setHttpError(error.message);
      });

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
      .catch((error) => {
        setHttpError(error.message);
      });
  }, []);

  useEffect(() => {
    if (isSubmitted && ((user.branch && selectedBranch) || !user.branch)) {
      setLoading(true);
      const query = {};
      if (selectedBranch && selectedBranch._id) {
        query.branch = selectedBranch._id;
      }
      if (search.consignor && search.consignor._id) {
        query.consignor = search.consignor._id;
      }
      if (search.consignee && search.consignee._id) {
        query.consignee = search.consignee._id;
      }
      if (search.from) {
        query.from = search.from;
      }
      if (search.to) {
        query.to = search.to;
      }
      if (search.payType) {
        query.payType = search.payType;
      }
      if (search.searchText) {
        query.searchText = search.searchText;
      }
      const requestObject = {
        pagination: {
          limit: paginationModel.pageSize ? paginationModel.pageSize : 100,
          page: paginationModel.page + 1,
        },
        query: query,
      };

      dispatch(getLorryReceiptsForReport(requestObject))
        .then(({ payload = {} }) => {
          setLoading(false);
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            const updatedLR = payload?.data.lorryReceipts?.map?.(
              (lr, index) => {
                return {
                  ...lr,
                  srNo: index + 1,
                  date: getFormattedDate(new Date(lr.date)),
                  totalWeight: lr.transactions
                    ?.reduce?.((acc, lr) => acc + lr.chargeWeight, 0)
                    ?.toFixed?.(2),
                  totalArticles: lr.transactions
                    ?.reduce?.((acc, lr) => acc + lr.articleNo, 0)
                    ?.toFixed?.(2),
                };
              }
            );
            setPageState((currState) => {
              return {
                ...currState,
                isLoading: false,
                data: updatedLR,
                total: payload?.data.count,
              };
            });
          }
          setIsSubmitted(false);
        })
        .catch((error) => {
          setIsSubmitted(false);
          setHttpError(error.message);
          setLoading(false);
        });
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    selectedBranch,
    isSubmitted,
  ]);

  const branchChangeHandler = (e, value) => {
    setSelectedBranch(value);
    setIsSubmitted(false);
    setSearch(initialState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const autocompleteChangeListener = (e, option, name) => {
    setSearch((currState) => {
      return {
        ...currState,
        [name]: option,
      };
    });
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

  const triggerDownload = (e) => {
    e.preventDefault();
    const query = {};
    if (selectedBranch && selectedBranch._id) {
      query.branch = selectedBranch._id;
    }
    if (search.consignor && search.consignor._id) {
      query.consignor = search.consignor._id;
    }
    if (search.consignee && search.consignee._id) {
      query.consignee = search.consignee._id;
    }
    if (search.from) {
      query.from = search.from;
    }
    if (search.to) {
      query.to = search.to;
    }
    if (search.payType) {
      query.payType = search.payType;
    }
    if (search.searchText) {
      query.searchText = search.searchText;
    }
    dispatch(downloadLRReport(query))
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          const blob = new Blob([payload?.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          FileSaver.saveAs(blob, "LorryReceipts.xlsx");
        }
      })
      .catch((error) => {
        setHttpError(error.message);
      });
  };

  const inputChangeHandler = (e, name = "payType") => {
    setSearch((currState) => {
      return {
        ...currState,
        [name]: e.target.value,
      };
    });
  };

  return (
    <>
      {(isLoading || isloading) && <LoadingSpinner />}
      <div className="inner-wrap">
        <div
          className="page_head-1"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h1 className="pageHead">
            Lorry Receipt Stock Status(LR. Note Register)
          </h1>
          <div className="">
            <FormControl
              size="small"
              sx={{ width: "230px", marginRight: "5px", marginBottom: "20px" }}
            >
              <Autocomplete
                disablePortal
                size="small"
                name="branch"
                options={branches}
                value={selectedBranch || null}
                onChange={branchChangeHandler}
                disabled={!isSuperAdminOrAdmin()}
                getOptionLabel={(branch) => branch.name}
                openOnFocus
                renderInput={(params) => (
                  <TextField {...params} label="Select branch" fullWidth />
                )}
              />
            </FormControl>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
                <FormControl fullWidth size="small">
                  <Autocomplete
                    disablePortal
                    autoSelect
                    autoHighlight={true}
                    size="small"
                    name="consignor"
                    options={customers}
                    value={search.consignor}
                    onChange={(e, value) =>
                      autocompleteChangeListener(e, value, "consignor")
                    }
                    openOnFocus
                    renderInput={(params) => (
                      <TextField {...params} label="Customer" fullWidth />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <ToggleButtonGroup
                  color="primary"
                  value={search.payType}
                  exclusive
                  onChange={inputChangeHandler}
                  aria-label="Platform"
                  size="small"
                >
                  <ToggleButton value="">All</ToggleButton>
                  <ToggleButton value="TBB">TBB</ToggleButton>
                  <ToggleButton value="ToPay">ToPay</ToggleButton>
                  <ToggleButton value="Paid">Paid</ToggleButton>
                  <ToggleButton value="FOC">FOC</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Search in List By"
                    value={search.searchText}
                    onChange={(e) => inputChangeHandler(e, "searchText")}
                    name="searchText"
                    id="searchText"
                    inputProps={{ maxLength: 50 }}
                  />
                </FormControl>
              </Grid>
              <Grid style={{ display: "flex" }} item xs={3}>
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
          {pageState.data?.length > 0 ? (
            <div className="tbl_header">
              <Button
                variant="contained"
                endIcon={<DownloadIcon />}
                onClick={triggerDownload}
              >
                Download
              </Button>
            </div>
          ) : null}
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

export default LorryReceiptRegister;
