import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../ApiCall/api";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    loginData: null,
    registrationData: null,
    isError: false,
    errorMessage: "",
    accessToken: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    },
    clearRegisterData: (state) => {
      state.registrationData = null;
    },
    clearLoginData: (state) => {
      state.loginData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationData = action.payload;
        state.errorMessage = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginData = action.payload;
        state.accessToken = action.payload.accessToken;
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const { logout, clearRegisterData, clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;
