import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  IconButton,
  Alert,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  debounce,
  TextField,
  InputAdornment,
} from "@mui/material";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from "@mui/icons-material/Download";
import {
  SendEmail,
  LoadingSpinner,
  Dialog as CustomDialog,
} from "../../../../ui-controls";
import {
  base64ToObjectURL,
  downloadFile,
  getFormattedDate,
  getFormattedLSNumber,
  isSuperAdminOrAdmin,
} from "../../../../services/utils";
import {
  getBills,
  getBranches,
  deleteBill as removeBill,
  downloadBill,
  selectIsLoading,
  setSearch as onSearch,
} from "./slice/billSlice";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const BillList = () => {
  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "billNo",
      headerName: "Bill no.",
      flex: 1,
      renderCell: (params) => {
        return getFormattedLSNumber(params.row.billNo);
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        return getFormattedDate(new Date(params.row.date));
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => {
        return params.row.customer?.name
          ? params.row.customer.name
          : params.row.customer;
      },
    },
    {
      field: "total",
      headerName: "Bill amount",
      flex: 1,
      renderCell: (params) => {
        return <strong>₹ {params.row.grandTotal?.toFixed(2)}</strong>;
      },
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const triggerView = (e) => {
          e.stopPropagation();
          setViewBill({ ...params.row, download: false });
        };

        const triggerDownload = (e) => {
          e.stopPropagation();
          setViewBill({ ...params.row, download: true });
        };

        const triggerEmail = (e) => {
          e.stopPropagation();
          setIsOpenEmail(true);
          setSelectedBill({ ...params.row });
        };

        const triggerDelete = (e) => {
          e.stopPropagation();
          return deleteBill(params.row._id);
        };

        const triggerEdit = (e) => {
          e.stopPropagation();
          return navigateToEdit(params.row._id);
        };

        return (
          <>
            <IconButton size="small" onClick={triggerDownload} color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton size="small" onClick={triggerView} color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" onClick={triggerEmail} color="primary">
              <EmailIcon />
            </IconButton>
            <IconButton size="small" onClick={triggerEdit} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={triggerDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoading = useSelector(selectIsLoading);

  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [httpError, setHttpError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [viewBill, setViewBill] = useState(null);
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
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
  const { search: searchData } = useSelector(({ bill }) => bill);
  const apiRef = useGridApiRef();

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
            if (payload?.data.length) {
              setSelectedBranch(filteredBranch);
            }
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
    if (selectedBranch?._id) {
      const requestObject = {
        branch: selectedBranch._id,
        pagination: {
          limit: paginationModel.pageSize ? paginationModel.pageSize : 100,
          page: paginationModel.page + 1,
        },
      };
      dispatch(getBills(requestObject))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            if (payload?.data.bills) {
              setPageState((currState) => {
                return {
                  ...currState,
                  isLoading: false,
                  data: payload?.data.bills,
                  total: payload?.data.count,
                };
              });
            }
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [selectedBranch, paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (viewBill && viewBill._id) {
      dispatch(downloadBill({ id: viewBill._id, email: "" }))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            if (payload?.data.file) {
              const fileURL = base64ToObjectURL(payload?.data.file);
              const name = getFormattedLSNumber(viewBill.billNo) + ".pdf";
              if (viewBill.download) {
                downloadFile(fileURL, name);
              } else {
                window.open(fileURL, "_blank");
              }
            }
          }
          setViewBill(null);
        })
        .catch((error) => {
          setHttpError(error.message);
          setViewBill(null);
        });
    }
  }, [viewBill]);

  const updateSearchValue = useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split(" ").filter((word) => word !== "")
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

  const branchChangeHandler = (e) => {
    const filteredBranch = branches.filter(
      (branch) => branch._id === e.target.value
    );
    setSelectedBranch(filteredBranch[0]);
  };

  const deleteBill = (id) => {
    setSelectedId(id);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (e) => {
    if (e.target.value === "true") {
      dispatch(removeBill(selectedId))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          }
          setIsDialogOpen(false);
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    } else {
      setIsDialogOpen(false);
    }
  };

  const handleAddBill = () => {
    navigate("/transactions/billList/addBill");
  };

  const navigateToEdit = (id) => {
    navigate("/transactions/billList/editBill", { state: { billId: id } });
  };

  useEffect(() => {
    if (sendEmail && emailAddress && selectedBill) {
      setIsOpenEmail(false);
      dispatch(downloadBill({ id: selectedBill._id, email: emailAddress }))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          }
          setSendEmail(false);
          setSelectedBill(null);
        })
        .catch((error) => {
          setHttpError(error.message);
          setSelectedBill(null);
        });
    }
  }, [sendEmail, emailAddress, selectedBill]);

  const handleSendEmail = (email) => {
    setSendEmail(true);
    setEmailAddress(email);
  };

  return (
    <>
      {(isLoading || isloading) && <LoadingSpinner />}
      <div className="inner-wrap">
        {isDialogOpen && (
          <CustomDialog
            isOpen={true}
            onClose={handleDialogClose}
            title="Are you sure?"
            content="Do you want to delete the bill"
            warning
          />
        )}

        <div className="page_head">
          <h1 className="pageHead">Bills</h1>
          <div className="page_actions">
            <FormControl
              size="small"
              sx={{ width: "150px", marginRight: "5px" }}
            >
              <InputLabel id="branch">Select branch</InputLabel>
              <Select
                labelId="branch"
                name="branch"
                label="Select branch"
                value={selectedBranch?._id || ""}
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
            <Button
              variant="contained"
              size="small"
              type="button"
              color="primary"
              className="ml6"
              onClick={handleAddBill}
            >
              Add a bill
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

        <div style={{ width: "100%" }}>
          <DataGrid
            apiRef={apiRef}
            autoHeight
            density="compact"
            rows={pageState.data}
            rowCount={pageState.total}
            loading={pageState.isLoading}
            pageSizeOptions={[100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
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
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
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
          />
        </div>
        <SendEmail
          isOpen={isOpenEmail}
          setIsOpen={setIsOpenEmail}
          handleEmailClose={() => {
            setIsOpenEmail(false);
            setSelectedBill(null);
          }}
          handleSendEmail={(email) => handleSendEmail(email)}
          contentBody=""
        />
      </div>
    </>
  );
};

export default BillList;
