import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Divider, Grid, TextField } from "@mui/material";

const FreightDetailsEdit = ({
  loadingSlip,
  setLoadingSlip,
  customers,
  lorryReceipts,
  setLorryReceipts,
  handleSelectedLr,
  selectedLR,
  setSelectedLR,
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
        return <strong>₹ {Number(params.row.total)?.toFixed?.(2)}</strong>;
      },
    },
  ];

  const [initial, setInitial] = useState(true);
  const [updatedLR, setUpdatedLR] = useState([]);
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
        lr.show = true;
      });

      setUpdatedLR(updatedLorryReceipts);
    }
  }, [lorryReceipts, customers]);

  useEffect(() => {
    if (updatedLR?.length && initial) {
      let _total = 0;
      setSelectedLR(
        updatedLR?.filter?.((lr) => {
          if (lr.checked) {
            _total += lr.total;
          }
          return lr.checked;
        })
      );
      setTotal(_total);
      setInitial(false);
    }
  }, [updatedLR, initial]);

  useEffect(() => {
    handleSelectedLr(selectedLR);
  }, [selectedLR, handleSelectedLr]);

  const inputChangeHandler = (e, index) => {
    const list = [...updatedLR];
    list[index] = { ...list[index], checked: e.target.checked };
    setUpdatedLR([...list]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let _total = 0;
    setSelectedLR(
      updatedLR?.filter?.((lr) => {
        if (lr.checked) {
          _total += lr.total;
        }
        return lr.checked;
      })
    );
    setTotal(_total);
  };

  const searchChangeHandler = (e) => {
    const search = e.target.value
      ? e.target.value?.trim?.()?.toLowerCase?.()
      : e.target.value;
    setSearch(search);
    if (search) {
      setUpdatedLR((currState) => {
        const updatedLR = currState;
        updatedLR?.forEach?.((lr) => {
          lr.show = lr.lrNo?.toLowerCase?.().includes?.(search);
        });
        return updatedLR;
      });
    } else {
      setUpdatedLR((currState) => {
        const updatedLR = currState;
        updatedLR?.forEach?.((lr) => {
          lr.show = true;
        });
        return updatedLR;
      });
    }
  };

  let totalRedord = 0,
    selected = 0;

  const renderItems =
    updatedLR?.length > 0 &&
    updatedLR?.map?.((lr, index) => {
      if (lr.show) {
        totalRedord += 1;
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
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <h2 className="mb20 text-inline">Lorry receipts</h2>
        </Grid>
        <Grid item xs={2}>
          <TextField
            size="small"
            variant="outlined"
            label="Filter LR"
            value={search}
            onChange={searchChangeHandler}
            name="search"
            id="search"
          />
        </Grid>
        <Grid item xs={2}>
          <h4 className=" text-inline" style={{ paddingTop: "5px" }}>
            {totalRedord} Out of {selected} selected
          </h4>
        </Grid>
      </Grid>
      <form action="" onSubmit={submitHandler} id="lrSelectionForm">
        <FormGroup className="checkboxGroup">{renderItems}</FormGroup>
      </form>
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
          rows={selectedLR}
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

export default FreightDetailsEdit;
