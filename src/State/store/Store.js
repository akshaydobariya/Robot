import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSliceReducer from "../features/LoginSlice";
import RobotSlice from "../features/RobotSlice";
import CountrySlice from "../features/CountrySlice";

export const store = configureStore({
  reducer: { login: loginSliceReducer, robots: RobotSlice },
});
