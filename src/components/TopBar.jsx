import React from "react";
import "../styles/topBar.css";
import { useSelector } from "react-redux";

const TopBar = ({onLogOut}) => {
  const points = useSelector((state) => state.points);
  const defuser = useSelector((state) => state.defusers);

  const user=localStorage.getItem("player")

const handleLogout=()=>{
  localStorage.removeItem('player')
  onLogOut(false)
}

  return (
    <>
      <div className="main-bar">
        <span>Points: {points}</span>
        <span>Defuse: {defuser}</span>
        <span>Player:{user}</span>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  );
};

export default TopBar;
