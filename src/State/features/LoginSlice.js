import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:7584/api";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "login/registerUser", // Action type prefix added
  async (registrationData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/User/register`,
        registrationData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const { StatusCode, Message } = error.response.registrationData;
        throw new Error(`Registration failed: ${StatusCode} - ${Message}`);
      } else {
        throw new Error("Registration failed: Network error");
      }
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "login/loginUser", // Action type prefix added
  async (loginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/User/authenticate`, {
        username: loginData.username,
        password: loginData.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const { StatusCode, Message } = error.response.loginData;
        throw new Error(`Login failed: ${StatusCode} - ${Message}`);
      } else {
        throw new Error("Login failed: Network error");
      }
    }
  }
);

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
