import { configureStore } from "@reduxjs/toolkit";
import userChartReducer from "../redux/userChart";

export const store = configureStore({
  reducer: userChartReducer,
});
