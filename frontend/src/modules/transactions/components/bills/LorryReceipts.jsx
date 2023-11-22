import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Divider, FormControl, TextField } from "@mui/material";
import { getFormattedDate } from "../../../../services/utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const LorryReceipts = ({
  lorryReceipts,
  setLRForBill,
  bill,
  dateInputChangeHandler,
  setBill,
}) => {
  const getDescription = (lr) => {
    return `${lr.from} to ${lr.to}`;
  };

  const getArticleOrWeight = (lr) => {
    return lr.transactions?.reduce?.((total, current) => {
      return total + +current.articleNo;
    }, 0);
  };

  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "lrNo",
      headerName: "LR no.",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => {
        return getDescription(params.row);
      },
    },
    {
      field: "articles",
      headerName: "Articles",
      flex: 1,
      renderCell: (params) => {
        return getArticleOrWeight(params.row);
      },
    },
    {
      field: "wayBillNo",
      headerName: "Way bill no & date",
      flex: 1,
      renderCell: (params) => {
        if (params.row.wayBillNo) {
          return `${params.row.wayBillNo} ${getFormattedDate(params.row.date)}`;
        } else {
          return getFormattedDate(params.row.date);
        }
      },
    },
    { field: "invoiceNo", headerName: "Memo no.", flex: 1 },
    // { field: "vehicleNo", headerName: "Vehicle no", flex: 1 },
    {
      field: "total",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => {
        return <strong>₹ {Number(params.row.total)?.toFixed?.(2)}</strong>;
      },
    },
  ];

  const [selectedLR, setSelectedLR] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setBill((currState) => {
      return {
        ...currState,
        lrList: [...selectedLR],
      };
    });
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    const updatedLR = lorryReceipts?.map?.((lr) => {
      if (lr._id === name) {
        lr.checked = value;
      }
      return lr;
    });
    setSelectedLR(updatedLR?.filter?.((lr) => lr.checked));
    setSelectAll(updatedLR?.every?.((lr) => lr.checked));
  };

  const selectAllChangeHandler = (e) => {
    setSelectAll(e.target.checked);
    const updatedLR = lorryReceipts?.map?.((lr) => {
      lr.checked = e.target.checked;
      return lr;
    });
    setSelectedLR(updatedLR?.filter?.((lr) => lr.checked));
  };

  // useEffect(() => {
  //   if (selectAll) {
  //     const updatedLR = lorryReceipts?.map?.((lr) => {
  //       lr.checked = true;
  //       return lr;
  //     });
  //     setSelectedLR(updatedLR?.filter?.((lr) => lr.checked));
  //   } else {
  //     const updatedLR = lorryReceipts?.map?.((lr) => {
  //       lr.checked = false;
  //       return lr;
  //     });
  //     setSelectedLR(updatedLR?.filter?.((lr) => lr.checked));
  //   }
  // }, [selectAll]);

  return (
    <>
      <div className="grid grid-6-col">
        <div className="grid-item">
          <h2 className="mb20 text-inline">Lorry receipts</h2>
        </div>
        <div className="grid-item">
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From"
                inputFormat="DD/MM/YYYY"
                value={bill.from || null}
                disableFuture={true}
                maxDate={bill.to}
                onChange={dateInputChangeHandler.bind(null, "from")}
                inputProps={{
                  readOnly: true,
                }}
                renderInput={(params) => (
                  <TextField name="from" size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="grid-item">
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To"
                inputFormat="DD/MM/YYYY"
                value={bill.to || null}
                disableFuture={true}
                minDate={bill.from}
                onChange={dateInputChangeHandler.bind(null, "to")}
                inputProps={{
                  readOnly: true,
                }}
                renderInput={(params) => (
                  <TextField name="to" size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        {lorryReceipts?.length > 0 && (
          <div className="grid-item">
            <FormControlLabel
              className="groupCheckbox"
              key="selectAll"
              control={
                <Checkbox
                  name={selectAll}
                  size="small"
                  checked={selectAll}
                  onChange={selectAllChangeHandler}
                />
              }
              label={
                <span
                  style={{
                    fontSize: "0.9em",
                    display: "inline-block",
                    lineHeight: "1em",
                  }}
                >
                  Select all
                </span>
              }
            />
          </div>
        )}
      </div>

      <form action="" onSubmit={submitHandler} id="lrSelectionForm">
        {lorryReceipts?.length === 0 && (
          <p>No lorry receipts found for billing!</p>
        )}
        <div className="bl_lrCheckboxes">
          <FormGroup className="checkboxGroup">
            {lorryReceipts?.length > 0 &&
              lorryReceipts?.map?.((lr) => (
                <FormControlLabel
                  className="groupCheckbox"
                  key={lr.lrNo}
                  control={
                    <Checkbox
                      name={lr._id}
                      size="small"
                      checked={lr.checked}
                      onChange={inputChangeHandler}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "0.9em",
                        display: "inline-block",
                        lineHeight: "1em",
                      }}
                    >
                      {lr.lrNo}
                    </span>
                  }
                />
              ))}
          </FormGroup>
        </div>
        <div className="right">
          <Button
            variant="contained"
            size="medium"
            type="submit"
            color="primary"
            form="lrSelectionForm"
            className="ml6"
          >
            Add
          </Button>
        </div>
      </form>
      <Divider sx={{ margin: "20px 0" }} />
      <DataGrid
        sx={{ backgroundColor: "primary.contrastText" }}
        autoHeight
        density="compact"
        getRowId={(row) => row._id || Math.random()}
        rows={bill.lrList}
        columns={columns}
        initialState={{
          ...columns,
          columns: {
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </>
  );
};

export default LorryReceipts;
