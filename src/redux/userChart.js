import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import usePoints from "../hooks/usePoints";

const { hanldePoint, userPoints } = usePoints();

console.log(userPoints);

const hanldeDefusers = async (defusers) => {
  const res = await axios.post("http://localhost:8080/addpoint", {
    username: "sam",
    counts: 2,
  });
};

const initialState = {
  points: 0,
  defusers: 0,
};

export const userChart = createSlice({
  name: "userChart",
  initialState,
  reducers: {
    addPoint: (state, action) => {
      state.points += 1;
      hanldePoint(state.points);
    },
    addDefuser: (state, action) => {
      state.defusers += 1;
      hanldeDefusers(state.defusers);
    },
    removeDefuser: (state, action) => {
      state.defusers -= 1;
      hanldeDefusers(state.defusers);
    },
  },
});

export const { addPoint, addDefuser, removeDefuser } = userChart.actions;

export default userChart.reducer;
