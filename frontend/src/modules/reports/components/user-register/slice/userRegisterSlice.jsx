import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "./userRegisterActions";

const initialState = {
  status: "idle",
};
export const getUsers = createAsyncThunk("GET_USERS", async (requestObject) => {
  const { data, status } = await fetchUsers(requestObject);
  return { data, status };
});
export const tripSheetSlice = createSlice({
  name: "tripsheet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state) => {
        // state.status = "succeeded";
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default tripSheetSlice.reducer;
export const selectIsLoading = (state) =>
  state.lrregisterreport.status === "loading";
