import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addRobotApi = createAsyncThunk("robot/addRobot", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:7584/api/Robot/addRobot`,
      data.formData,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const { StatusCode, Message } = error.response.data;
      throw new Error(`Robot add failed: ${StatusCode} - ${Message}`);
    } else {
      throw new Error("Robot Add failed: Network error");
    }
  }
});

export const fetchRobotData = createAsyncThunk(
  "robot/fetchRobotData",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:7584/api/Robot/getAllRobots`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const { StatusCode, Message } = error.response.data;
        throw new Error(`Robot data failed: ${StatusCode} - ${Message}`);
      } else {
        throw new Error("Robot data failed: Network error");
      }
    }
  }
);

const robotSlice = createSlice({
  name: "robot",
  initialState: {
    isLoading: false,
    robotData: null,
    isError: false,
    selectedBlog: null,
    robot: null,
  },
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRobotApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRobotApi.fulfilled, (state, action) => {
        state.isLoading = false;

        //state.robotData = action.payload;
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
      });
  },
});

export const { setSelectedBlog, clearSelectedBlog } = robotSlice.actions;
export default robotSlice.reducer;
