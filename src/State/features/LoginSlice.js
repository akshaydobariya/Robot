import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:7584/api";

export const registerUser = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/User/register`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { StatusCode, Message } = error.response.data;
      throw new Error(`Registration failed: ${StatusCode} - ${Message}`);
    } else {
      throw new Error("Registration failed: Network error");
    }
  }
});

export const loginUser = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/User/authenticate`, {
      username: data.username,
      password: data.password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { StatusCode, Message } = error.response.data;
      throw new Error(`Login failed: ${StatusCode} - ${Message}`);
    } else {
      throw new Error("Login failed: Network error");
    }
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
    errorMessage: "",
    accessToken: null,
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
        state.data = action.payload;
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
        state.data = action.payload;
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

export default loginSlice.reducer;
