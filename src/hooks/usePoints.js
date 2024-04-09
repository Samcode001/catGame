import axios from "axios";
import React, { useEffect, useState } from "react";

const usePoints = () => {

  const hanldePoint = async (points) => {
    const res = await axios.post("http://localhost:8080/addpoint", {
      username: localStorage.getItem("player"),
      points: points,
    });
  };

  return { hanldePoint };
};

export default usePoints;
