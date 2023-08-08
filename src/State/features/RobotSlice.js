import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addRobotApi,
  deleteRobotApi,
  fetchRobotData,
  updateRobot,
} from "../../ApiCall/Api";

const robotSlice = createSlice({
  name: "robot",
  initialState: {
    isLoading: false,
    addRobotdata: null,
    addRobot: null,
    deleteRobot: null,
    robotData: null,
    isError: false,
    selectedBlog: null,
    updateRobotdData: null,
  },
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
    clearAddRobotdata: (state) => {
      state.addRobot = null;
    },
    clearUpdateRobotdData: (state) => {
      state.updateRobotdData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRobotApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRobotApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addRobot = action.payload;
      })
      .addCase(addRobotApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchRobotData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRobotData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.robotData = action.payload;
      })
      .addCase(fetchRobotData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteRobotApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRobotApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteRobot = action.payload;
      })
      .addCase(deleteRobotApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateRobot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRobot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateRobotdData = action.payload;
      })
      .addCase(updateRobot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  setSelectedBlog,
  clearSelectedBlog,
  clearAddRobotdata,
  clearUpdateRobotdData,
} = robotSlice.actions;

export default robotSlice.reducer;
