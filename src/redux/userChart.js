import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const getPoint = async () => {
  try {
    const res = await axios.post("http://localhost:8080/findPointsByUsername", {
      username: "sam",
    });

    const value = res.data["sam"];
    return value; // Assuming you want to return secondValue, which seems to be the intention in your code
  } catch (error) {
    console.error("Error fetching user points:", error);
    throw error; // Re-throw the error to handle it elsewhere, if necessary
  }
};





const hanldePoint = async (points) => {
  const res = await axios.post("http://localhost:8080/addpoint", {
    username: "sam",
    points: points,
  });
};

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
