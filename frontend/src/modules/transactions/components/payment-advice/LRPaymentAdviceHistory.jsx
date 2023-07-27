import { useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  getFormattedDate,
  getFormattedLSNumber,
} from "../../../../services/utils";
import { debounce, InputAdornment, TextField } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "./slice/paymentAdviceSlice";
import { LoadingSpinner } from "../../../../ui-controls";

const LRPaymentAdviceHistory = ({ supplierLS }) => {
  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "lsNo",
      headerName: "Challan no.",
      flex: 1,
      renderCell: (params) => {
        return getFormattedLSNumber(params.row.lsNo);
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
      field: "hire",
      headerName: "Hire amount",
      flex: 1,
      type: "number",
      renderCell: (params) => {
        return params.row.hire ? (
          <strong>₹ {params.row.hire.toFixed(2)}</strong>
        ) : null;
      },
    },
    {
      field: "advance",
      headerName: "Advance",
      flex: 1,
      type: "number",
      renderCell: (params) => {
        return params.row.advance ? (
          <strong>₹ {params.row.advance.toFixed(2)}</strong>
        ) : null;
      },
    },
    {
      field: "paid",
      headerName: "Paid",
      flex: 1,
      type: "number",
      renderCell: (params) => {
        return params.row.paid ? (
          <strong>₹ {params.row.paid.toFixed(2)}</strong>
        ) : null;
      },
    },
  ];
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const apiRef = useGridApiRef();
  const { search } = useSelector(({ paymentadvice }) => paymentadvice);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const updateSearchValue = useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split(" ").filter((word) => word !== "")
      );
    }, 500);
  }, [apiRef]);

  useEffect(() => {
    if (search && paymentHistory?.length) {
      setLoading(true);
      updateSearchValue(search);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [paymentHistory]);

  const onSearchChange = (e) => {
    updateSearchValue(e.target.value);
    dispatch(setSearch(e.target.value));
  };
  useEffect(() => {
    if (supplierLS.length) {
      const historyList = [];
      let indexes = 0;
      supplierLS.forEach((ls, index) => {
        indexes = indexes + 1;
        historyList.push({
          // _id: "payment_" + 0,
          _id: indexes,
          date: ls.createdAt,
          lsNo: ls.lsNo,
          hire: ls.hire,
          advance: ls.advance,
          hamali: ls.hamali,
          commission: ls.commission,
          stacking: ls.stacking,
          totalHire: ls.hire + ls.hamali - ls.commission - ls.stacking,
        });
        if (ls.supplierPayments.length) {
          ls.supplierPayments.forEach((payment) => {
            indexes = indexes + 1;
            const history = {};
            // history._id = "payment_" + (index + 1);
            history._id = indexes;
            history.date = payment.date;
            history.lsNo = ls.lsNo;
            history.paid = payment.paid;
            historyList.push(history);
          });
        }
      });
      setPaymentHistory(historyList);
    } else {
      setPaymentHistory([]);
    }
  }, [supplierLS]);

  return (
    <>
      <h2 className="mb10">Payment history</h2>
      {isloading ? <LoadingSpinner /> : false}
      <DataGrid
        apiRef={apiRef}
        sx={{ backgroundColor: "primary.contrastText" }}
        autoHeight
        density="standard"
        getRowId={(row) => row._id}
        rows={paymentHistory}
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
    </>
  );
};

export default LRPaymentAdviceHistory;
