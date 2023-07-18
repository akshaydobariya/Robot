import { configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from "../features/LoginSlice";
import RobotSlice from "../features/RobotSlice";

export const store = configureStore({
  reducer: { login: loginSliceReducer, robots: RobotSlice },
});
