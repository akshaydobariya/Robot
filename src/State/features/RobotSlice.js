import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const AddRobotApi = createAsyncThunk("AddRobot", async (data) => {
  console.log(data.accessToken);
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
    console.log(response.data);
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

export const GetRobotApi = createAsyncThunk("GetRobot",async()=>{
  const response = await axios.get(
    `http://localhost:7584/api/Robot/getAllRobots`
  );
  console.log(response.data);
});

export const UpdateRobot = createAsyncThunk("updateRobot",async()=>{
  const response  = await axios.put(
    `http://localhost:7584/api/Robot/updateRobot/{id}`,
  );
  console.log(response.data);
});

export const RobotSlice = createSlice({
  name: "RobotSlice",
  initialState: {
    isLoading: false,
    robotData: {},
    isError: false,
    selectedBlog: null,
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
    builder.addCase(AddRobotApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddRobotApi.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.robotData = action.payload;
    });
    builder.addCase(AddRobotApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(GetRobotApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetRobotApi.rejected, (state, action) =>{
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(GetRobotApi.fulfilled,(state,action) =>{
      state.isLoading = false;
    });
  },
});
export const { setSelectedBlog, clearSelectedBlog } = RobotSlice.actions;
export default RobotSlice.reducer;
