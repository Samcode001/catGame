import axios from "axios";
import React, { useEffect, useState } from "react";

const usePoints = () => {
  // const getPoint = async () => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8080/findPointsByUsername",
  //       {
  //         username: localStorage.getItem("player"),
  //       }
  //     );

  //     const value = res.data["sam"];
  //     setUserPoints(value);
  //   } catch (error) {
  //     console.error("Error fetching user points:", error);
  //     throw error; // Re-throw the error to handle it elsewhere, if necessary
  //   }
  // };

  // useEffect(() => {
  //   getPoint();
  // }, []);

  const hanldePoint = async (points) => {
    const res = await axios.post("http://localhost:8080/addpoint", {
      username: localStorage.getItem("player"),
      points: points,
    });
  };

  return { hanldePoint };
};

export default usePoints;
