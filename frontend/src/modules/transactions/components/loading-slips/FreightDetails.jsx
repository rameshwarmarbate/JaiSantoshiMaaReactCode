import React, { useState, useEffect, memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Divider, FormLabel, Grid, TextField } from "@mui/material";

const FreightDetails = ({ loadingSlip, setLoadingSlip, lorryReceipts }) => {
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
        return params.row.payType?.toLowerCase() === "topay" ? (
          <strong>₹ {Number(params.row.total)?.toFixed?.(2)}</strong>
        ) : (
          "-"
        );
      },
    },
  ];

  const [filteredLR, setFilteredLR] = useState([]);
  const [selectedLR, setSelectedLR] = useState([]);
  const [sortedLR, setSortedLR] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (lorryReceipts?.length) {
      const updatedLorryReceipts = [...lorryReceipts];

      updatedLorryReceipts?.forEach?.((lr) => {
        let weight = 0;
        lr.transactions?.forEach?.((transaction) => {
          weight += +transaction.weight;
        });
        lr.weight = weight;
        lr.checked = false;
        lr.show = true;
      });
      setFilteredLR(updatedLorryReceipts);
    }
  }, [lorryReceipts]);

  const inputChangeHandler = (e, index) => {
    const list = [...filteredLR];
    list[index] = { ...list[index], checked: e.target.checked };
    if (e.target.checked) {
      setSortedLR((prevState) => [...prevState, list[index]]);
    } else {
      setSortedLR((prevState) =>
        prevState.filter(({ _id }) => list[index]._id !== _id)
      );
    }
    setFilteredLR([...list]);
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
    const submitted = filteredLR.find(
      (lr) => search?.toLowerCase() === lr.lrNo?.toLowerCase()
    );
    let list = submitted ? [...sortedLR, submitted] : [...sortedLR];
    setSelectedLR(
      list?.filter?.((lr) => {
        if (lr.checked || search?.toLowerCase() === lr.lrNo?.toLowerCase()) {
          lr.checked = true;
          _total += lr.payType?.toLowerCase() === "topay" ? lr.total : 0;
        }
        return lr.checked;
      })
    );
    setTotal(_total);
    setLoadingSlip((prevState) => ({ ...prevState, totalFreight: _total }));
  };

  const searchChangeHandler = (e) => {
    const search = e.target.value
      ? e.target.value?.trim?.()?.toLowerCase?.()
      : e.target.value;
    setSearch(search);
    if (search) {
      setFilteredLR((currState) => {
        const updatedLR = currState;
        updatedLR?.forEach?.((lr) => {
          lr.show = lr.lrNo?.toLowerCase?.().includes?.(search);
        });
        return updatedLR;
      });
    } else {
      setFilteredLR((currState) => {
        const updatedLR = currState;
        updatedLR?.forEach?.((lr) => {
          lr.show = true;
        });
        return updatedLR;
      });
    }
  };

  let totalRecord = 0,
    selected = 0;

  const renderItems =
    filteredLR?.length > 0 &&
    filteredLR?.map?.((lr, index) => {
      if (lr.show) {
        totalRecord += 1;
      }
      if (lr.checked && lr.show) {
        selected += 1;
      }
      return lr.show ? (
        <FormControlLabel
          className="groupCheckbox"
          key={lr.lrNo}
          control={
            <Checkbox
              name={lr._id}
              size="small"
              checked={lr.checked}
              onChange={(e) => inputChangeHandler(e, index)}
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
      ) : null;
    });
  return (
    <>
      <form action="" onSubmit={submitHandler} id="lrSelectionForm">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <h2 className="mb20 text-inline">Lorry receipts</h2>
          </Grid>

          {filteredLR?.length > 0 && (
            <Grid item xs={3}>
              <TextField
                size="small"
                variant="outlined"
                label="Filter LR"
                value={search}
                fullWidth
                onChange={searchChangeHandler}
                name="search"
                id="search"
              />
            </Grid>
          )}
          <Grid item xs={3}>
            <h4 className=" text-inline" style={{ paddingTop: "5px" }}>
              {totalRecord} Out of {selected} selected
            </h4>
          </Grid>
        </Grid>
        <div className="bl_lrCheckboxes">
          <FormGroup className="checkboxGroup">
            {renderItems}
            {filteredLR?.length === 0 && <p>No lorry receipts for challan</p>}
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
            Total To Pay: <strong> ₹ {total?.toFixed?.(2)}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(FreightDetails);
