import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Snackbar,
  IconButton,
  TextField,
  InputAdornment,
  debounce,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Alert, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { checkAuth } from "../../../../router/RequireAuth";
import { Dialog, LoadingSpinner } from "../../../../ui-controls";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaces,
  deletePlace as removePlace,
  selectIsLoading,
  setSearch,
} from "./slice/placeSlice";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const Places = () => {
  const columns = [
    { field: "_id", headerName: "Id" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "abbreviation", headerName: "Abbreviation", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          return navigateToEdit(params.row._id);
        };

        const triggerDelete = (e) => {
          e.stopPropagation();
          return deletePlace(params.row._id);
        };

        return (
          <>
            <IconButton size="small" onClick={onClick} color="primary">
              <EditIcon />
            </IconButton>
            &nbsp;&nbsp;
            <IconButton size="small" onClick={triggerDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  const apiRef = useGridApiRef();
  const { search } = useSelector(({ place }) => place);
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isUnauth, setIsUnauth] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const [isloading, setLoading] = useState(false);

  const fetchData = () => {
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
      .catch(() => {
        setHttpError(
          "Something went wrong! Please try later or contact Administrator."
        );
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateSearchValue = useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split?.(" ").filter?.((word) => word !== "")
      );
    }, 500);
  }, [apiRef]);

  useEffect(() => {
    if (search && places?.length) {
      setLoading(true);
      updateSearchValue(search);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [places]);

  const onSearchChange = (e) => {
    updateSearchValue(e.target.value);
    dispatch(setSearch(e.target.value));
  };
  const handleAddPlace = () => {
    navigate("/master/places/addPlace");
  };

  const navigateToEdit = (id) => {
    if (checkAuth("Admin", "Place", "write")) {
      navigate("/master/places/editPlace", { state: { placeId: id } });
    } else {
      setIsUnauth(true);
    }
  };

  const deletePlace = (id) => {
    if (checkAuth("Admin", "Place", "write")) {
      setSelectedId(id);
      setIsDialogOpen(true);
    } else {
      setIsUnauth(true);
    }
  };

  const handleDialogClose = (e) => {
    if (e.target.value === "true") {
      dispatch(removePlace(selectedId))
        .then(() => {
          fetchData();
          setIsDialogOpen(false);
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
        });
    } else {
      setIsDialogOpen(false);
    }
  };

  const handleUnauthClose = () => {
    setIsUnauth(false);
  };

  return (
    <>
      {(isLoading || isloading) && <LoadingSpinner />}

      {isDialogOpen && (
        <Dialog
          isOpen={true}
          onClose={handleDialogClose}
          title="Are you sure?"
          content="Do you want to delete the place?"
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isUnauth}
        autoHideDuration={6000}
        onClose={handleUnauthClose}
      >
        <Alert severity="warning">
          You are not authorized to perform the action
        </Alert>
      </Snackbar>

      <div className="inner-wrap">
        <div className="page_head">
          <h1 className="pageHead">Places</h1>
          <div className="page_actions">
            <Button
              variant="contained"
              size="small"
              type="button"
              color="primary"
              className="ml6"
              onClick={handleAddPlace}
            >
              Add a place
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

        {
          <div style={{ width: "100%" }}>
            <DataGrid
              apiRef={apiRef}
              sx={{ backgroundColor: "primary.contrastText" }}
              autoHeight
              density="compact"
              getRowId={(row) => row._id}
              rows={places}
              columns={columns}
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
                      autoFocus={!!search}
                      onChange={onSearchChange}
                      value={search}
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
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          </div>
        }
      </div>
    </>
  );
};

export default Places;
