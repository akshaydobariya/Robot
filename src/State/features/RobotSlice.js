import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:7584/api";

// Async thunk for adding a new robot
export const addRobotApi = createAsyncThunk("robot/addRobot", async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/Robot/addRobot`,
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

// Async thunk for fetching robot data
export const fetchRobotData = createAsyncThunk(
  "robot/fetchRobotData",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Robot/getAllRobots`);
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

// Async thunk for deleting a robot
export const deleteRobotApi = createAsyncThunk(
  "robot/deleteRobot",
  async (data) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/Robot/deleteRobot/${data.id}`,
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
        throw new Error(`Robot deletion failed: ${StatusCode} - ${Message}`);
      } else {
        throw new Error("Robot deletion failed: Network error");
      }
    }
  }
);

// Async thunk for updating a robot
export const updateRobot = createAsyncThunk(
  "robot/updateRobot",
  async (data) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/Robot/updateRobot`,
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
        throw new Error(`Robot update failed: ${StatusCode} - ${Message}`);
      } else {
        throw new Error("Robot update failed: Network error");
      }
    }
  }
);

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
