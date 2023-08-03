import { useEffect, useMemo, useState } from "react";
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
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  TextField,
  InputAdornment,
  debounce,
} from "@mui/material";
import Select from "@mui/material/Select";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import {
  LoadingSpinner,
  Dialog as CustomDialog,
  SendEmail,
} from "../../../../ui-controls";
import {
  base64ToObjectURL,
  downloadFile,
  getFormattedDate,
  getFormattedLSNumber,
  isSuperAdminOrAdmin,
} from "../../../../services/utils";
import {
  downloadLoadingSlip,
  getBranches,
  getCustomers,
  getDrivers,
  getLoadingSlips,
  getPlaces,
  getSuppliers,
  getVehicles,
  selectIsLoading,
  setSearch as onSearch,
} from "./slice/loadingSlipSlice";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const LoadingSlips = () => {
  const columns = [
    { field: "_id", headerName: "Id", flex: 1 },
    { field: "lsNo", headerName: "LS no.", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      renderCell: (params) => {
        return getFormattedDate(new Date(params.row.createdAt));
      },
      flex: 1,
    },
    { field: "vehicleNo", headerName: "Vehicle no.", width: 120, flex: 1 },
    {
      field: "fromName",
      headerName: "From",
      renderCell: (params) => {
        return params.row.from?.name;
      },
      flex: 1,
    },
    {
      field: "toName",
      headerName: "To",
      renderCell: (params) => {
        return params.row.to?.name;
      },
      flex: 1,
    },
    {
      field: "totalFreight",
      headerName: "Hire amount",
      type: "number",
      renderCell: (params) => {
        return <strong>₹ {params.row.totalFreight?.toFixed?.(2)}</strong>;
      },
      flex: 1,
    },
    {
      field: "totalPayable",
      headerName: "Balance",
      type: "number",
      renderCell: (params) => {
        return <strong>₹ {params.row.totalPayable?.toFixed?.(2)}</strong>;
      },
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      minWidth: 200,
      renderCell: (params) => {
        const triggerView = (e) => {
          e.stopPropagation();
          triggerViewLS({ ...params.row, download: false });
        };

        const triggerDownload = (e) => {
          e.stopPropagation();
          triggerViewLS({ ...params.row, download: true });
        };

        const triggerEmail = (e) => {
          e.stopPropagation();
          setIsOpenEmail(true);
          setSelectedLS({ ...params.row });
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
            {/* <IconButton size='small' onClick={triggerDelete} color='error'><DeleteIcon /></IconButton> */}
          </>
        );
      },
      flex: 1,
    },
  ];
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector((state) => state.user);

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [, setLoadingSlips] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [deleteLSId, setDeleteLSId] = useState("");
  const [viewLS, setViewLS] = useState(null);
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedLS, setSelectedLS] = useState(null);
  const [isloading, setLoading] = useState(false);
  const { search: searchData } = useSelector(({ loadingslip }) => loadingslip);
  const apiRef = useGridApiRef();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
  });

  const triggerViewLS = (ls) => {
    setViewLS(ls);
  };

  useEffect(() => {
    dispatch(getBranches())
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          setHttpError("");
          setBranches(payload?.data);
          if (payload?.data.length) {
            const filteredBranch = payload?.data.find?.(
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
    dispatch(getCustomers());
    dispatch(getVehicles());
    dispatch(getSuppliers());
    dispatch(getPlaces());
    dispatch(getDrivers());
  }, [user.branch]);

  const fetchData = () => {
    const requestObject = {
      branch: selectedBranch._id,
      pagination: {
        limit: paginationModel.pageSize ? paginationModel.pageSize : 100,
        page: paginationModel.page + 1,
      },
    };
    dispatch(getLoadingSlips(requestObject))
      .then(({ payload = {} }) => {
        const { message } = payload?.data || {};
        if (message) {
          setHttpError(message);
        } else {
          const updatedLS = payload?.data.loadingSlips.filter?.(
            (ls) => !ls.isLocalMemo
          );
          setLoadingSlips(updatedLS);
          setPageState((currState) => {
            return {
              ...currState,
              isLoading: false,
              data: updatedLS,
              total: payload?.data.count,
            };
          });
        }
      })
      .catch((error) => {
        setHttpError(error.message);
      });
  };

  useEffect(() => {
    if (selectedBranch) {
      fetchData();
    }
  }, [selectedBranch, paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (viewLS && viewLS._id) {
      dispatch(downloadLoadingSlip({ id: viewLS._id, email: "" }))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            if (payload?.data?.file) {
              const fileURL = base64ToObjectURL(payload?.data.file);
              const name = getFormattedLSNumber(viewLS.lsNo) + ".pdf";
              if (viewLS.download) {
                downloadFile(fileURL, name);
              } else {
                window.open(fileURL, "_blank");
              }
            }
            setViewLS(null);
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  }, [viewLS]);

  useEffect(() => {
    if (sendEmail && emailAddress && selectedLS) {
      setIsOpenEmail(false);
      dispatch(downloadLoadingSlip({ id: selectedLS._id, email: emailAddress }))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          }
          setSendEmail(false);
          setSelectedLS(null);
        })
        .catch((error) => {
          setHttpError(error.message);
          setSendEmail(false);
          setSelectedLS(null);
        });
    }
  }, [sendEmail, emailAddress, selectedLS]);

  const updateSearchValue = useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split?.(" ").filter?.((word) => word !== "")
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

  const handleSendEmail = (email) => {
    setSendEmail(true);
    setEmailAddress(email);
  };

  const branchChangeHandler = (e) => {
    const filteredBranch = branches.filter?.(
      (branch) => branch._id === e.target.value
    );
    setSelectedBranch(filteredBranch[0]);
  };

  const handleDialogClose = (e) => {
    setIsDialogOpen(true);
    if (e.target.value === "true") {
      setDeleteLSId(selectedId);
    } else {
      setDeleteLSId("");
      setSelectedId("");
    }
    setIsDialogOpen(false);
  };

  const handleAddLS = () => {
    navigate("/transactions/loadingSlips/addLoadingSlip");
  };

  const navigateToEdit = (id) => {
    navigate("/transactions/loadingSlips/editLoadingSlip", {
      state: { lsId: id },
    });
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
            content="Do you want to delete the loading slip?"
            warning
          />
        )}

        <div className="page_head">
          <h1 className="pageHead">Lorry Freight Challan List</h1>
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
                  branches.map?.((branch) => (
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
              onClick={handleAddLS}
            >
              Add challan
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
            setSelectedLS(null);
          }}
          handleSendEmail={(email) => handleSendEmail(email)}
          contentBody=""
        />
      </div>
    </>
  );
};

export default LoadingSlips;
