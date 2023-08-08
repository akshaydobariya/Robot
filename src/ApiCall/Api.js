import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const Country = createAsyncThunk("country", async () => {
  try {
    const response = await axios.get(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});
