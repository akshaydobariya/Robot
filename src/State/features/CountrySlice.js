import { createSlice } from "@reduxjs/toolkit";
import { Country } from "../../Apicall/api";

const CountrySlice = createSlice({
  name: "Country",
  initialState: {
    data: null,
    isPanding: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Country.pending, (state) => {
        state.isPanding = true;
      })
      .addCase(Country.fulfilled, (state, action) => {
        state.isPanding = false;
        state.data = action.payload;
      })
      .addCase(Country.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default CountrySlice.reducer;
