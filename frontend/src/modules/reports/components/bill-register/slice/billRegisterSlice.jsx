import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
};

export const billRegisterSlice = createSlice({
  name: "billregister",
  initialState,
  reducers: {},
});

export default billRegisterSlice.reducer;
