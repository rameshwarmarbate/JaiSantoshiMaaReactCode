import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Alert,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import { LoadingSpinner } from "../../../../ui-controls";
import LRPaymentAdvice from "./LRPaymentAdvice";
import SupplierBills from "./SupplierBills";
import { useDispatch, useSelector } from "react-redux";
import {
  getBanks,
  getBranches,
  getPlaces,
  getSuppliersByType,
  selectIsLoading,
} from "./slice/paymentAdviceSlice";

const supplierTypes = ["Vehicle", "Petrol", "Tyre"];

const PaymentAdvice = () => {
  const isLoading = useSelector(selectIsLoading);

  const [tabValue, setTabValue] = useState(0);
  const [places, setPlaces] = useState([]);
  const [selectedSupplierType, setSelectedSupplierType] = useState("Vehicle");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const [httpError, setHttpError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (httpError) {
      const input = document.getElementById(`alertError`);
      input?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [httpError]);
  useEffect(() => {
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
    dispatch(getBranches());
    dispatch(getBanks());
  }, []);

  useEffect(() => {
    if (selectedSupplierType) {
      dispatch(getSuppliersByType(selectedSupplierType))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message) {
            setHttpError(message);
          } else {
            setSuppliers(payload?.data);
          }
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
        });
    }
  }, [selectedSupplierType]);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const supplierChangeHandler = (e) => {
    setSelectedSupplier(e.target.value);
    setTabValue(0);
  };

  const supplierTypeChangeHandler = (e) => {
    setSelectedSupplierType(e.target.value);
    setSelectedSupplier("");
    setTabValue(0);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="inner-wrap">
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
            <Alert id="alertError" severity="error">
              {httpError}
            </Alert>
          </Stack>
        )}

        <div className="page_head">
          <h1 className="pageHead">Payment advice</h1>
        </div>

        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <div className="grid grid-6-col">
            <div className="grid-item">
              <FormControl fullWidth size="small">
                <InputLabel id="supplierType">Select supplier type</InputLabel>
                <Select
                  labelId="supplierType"
                  name="supplierType"
                  label="Select supplier type"
                  value={selectedSupplierType}
                  onChange={supplierTypeChangeHandler}
                >
                  {supplierTypes.length > 0 &&
                    supplierTypes.map((supplierType) => (
                      <MenuItem
                        key={supplierType}
                        value={supplierType}
                        className="menuItem"
                      >
                        {supplierType}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="grid-item">
              <FormControl fullWidth size="small">
                <InputLabel id="supplier">Select supplier</InputLabel>
                <Select
                  labelId="supplier"
                  name="supplier"
                  label="Select supplier"
                  value={selectedSupplier}
                  onChange={supplierChangeHandler}
                >
                  {suppliers.length > 0 &&
                    suppliers.map((supplier) => (
                      <MenuItem
                        key={supplier._id}
                        value={supplier._id}
                        className="menuItem"
                      >
                        {supplier.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </Paper>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Lorry receipt freight challan" />
          <Tab label="Supplier's bills" />
        </Tabs>

        {tabValue === 0 ? (
          <LRPaymentAdvice
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
            selectedSupplierType={selectedSupplierType}
            setSelectedSupplier={setSelectedSupplier}
            places={places}
          />
        ) : null}
        {tabValue === 1 ? (
          <SupplierBills
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
            selectedSupplierType={selectedSupplierType}
          />
        ) : null}
      </div>
    </>
  );
};

export default PaymentAdvice;
