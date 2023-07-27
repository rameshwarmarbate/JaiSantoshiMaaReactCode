import { useState, useEffect, memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Divider, TextField } from "@mui/material";

const FreightDetails = ({
  loadingSlip,
  setLoadingSlip,
  customers,
  lorryReceipts,
}) => {
  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "lrNo",
      headerName: "LR no.",
      flex: 1,
    },
    {
      field: "consignorName",
      headerName: "Consignor",
      flex: 1,
    },
    { field: "from", headerName: "From", flex: 1 },
    {
      field: "consigneeName",
      headerName: "Consignee",
      flex: 1,
    },
    { field: "to", headerName: "To", flex: 1 },
    { field: "weight", headerName: "Weight", flex: 1 },
    {
      field: "total",
      headerName: "To pay",
      flex: 1,
      type: "number",
      renderCell: (params) => {
        return <strong>₹ {Number(params.row.total).toFixed(2)}</strong>;
      },
    },
  ];

  const [filteredLR, setFilteredLR] = useState([]);
  const [selectedLR, setSelectedLR] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (lorryReceipts.length) {
      const updatedLorryReceipts = [...lorryReceipts];

      updatedLorryReceipts.forEach((lr) => {
        let weight = 0;
        lr.transactions.forEach((transaction) => {
          weight += +transaction.weight;
        });
        lr.weight = weight;
        lr.checked = false;
        lr.show = true;
      });
      setFilteredLR(updatedLorryReceipts);
    }
  }, [lorryReceipts, customers]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    const updatedLR = filteredLR.map((lr) => {
      if (lr._id === name) {
        lr.checked = value;
      }
      return lr;
    });
    setFilteredLR(updatedLR);
  };

  useEffect(() => {
    setLoadingSlip((currState) => {
      return {
        ...currState,
        lrList: [...selectedLR],
      };
    });
  }, [selectedLR, setLoadingSlip]);

  const submitHandler = (e) => {
    e.preventDefault();
    let _total = 0;
    setSelectedLR(
      filteredLR.filter((lr) => {
        if (lr.checked) {
          _total += lr.total;
        }
        return lr.checked;
      })
    );
    setTotal(_total);
  };

  const searchChangeHandler = (e) => {
    setSearch(
      e.target.value ? e.target.value.trim().toUpperCase() : e.target.value
    );
  };

  useEffect(() => {
    if (search) {
      setFilteredLR((currState) => {
        const updatedLR = currState;
        updatedLR.forEach((lr) => {
          lr.show = lr.lrNo.includes(search);
        });
        return updatedLR;
      });
    } else {
      setFilteredLR((currState) => {
        const updatedLR = currState;
        updatedLR.forEach((lr) => {
          lr.show = true;
        });
        return updatedLR;
      });
    }
  }, [search]);

  return (
    <>
      <div className="grid grid-7-col">
        <div className="grid-item">
          <h2 className="mb20 text-inline">Lorry receipts</h2>
        </div>
        {filteredLR.length > 0 && (
          <div className="grid-item">
            <TextField
              size="small"
              variant="outlined"
              label="Filter LR"
              value={search}
              onChange={searchChangeHandler}
              name="search"
              id="search"
            />
          </div>
        )}
      </div>
      <div className="bl_lrCheckboxes">
        <form action="" onSubmit={submitHandler} id="lrSelectionForm">
          <FormGroup className="checkboxGroup">
            {filteredLR.length > 0 &&
              filteredLR.map((lr) =>
                lr.show ? (
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
                ) : null
              )}
            {filteredLR.length === 0 && <p>No lorry receipts for challan</p>}
          </FormGroup>
        </form>
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
          Update
        </Button>
      </div>
      <Divider sx={{ margin: "20px 0" }} />
      <div style={{ width: "100%" }}>
        <DataGrid
          sx={{ backgroundColor: "primary.contrastText" }}
          autoHeight
          density="compact"
          getRowId={(row) => row._id}
          rows={loadingSlip.lrList}
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
        <div
          style={{ textAlign: "end", paddingTop: "10px", paddingRight: "10px" }}
        >
          <p>
            Total To Pay: <strong> ₹ {total.toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(FreightDetails);
