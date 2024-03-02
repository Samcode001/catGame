import React, { useEffect, useState } from "react";
import "../styles/leaderboard.css";
import axios from "axios";

const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);

  const getUserCredits = async () => {
    const res = await axios.get("http://localhost:8080/getusers");

    setPlayers(res.data);
  };

  useEffect(() => {
    getUserCredits();
  }, []);

  return (
    <div className="board-section">
      <h1 className="board-heading">LEADERBOARDS</h1>
      <div className="board-content">
        <div className="board-columns">
          <span>Player</span>
          <span>Points</span>
        </div>
        {/* {players &&
          players.map((elem) => {
            return (
              <div className="board-columns">
               
              </div>
            );
          })} */}

        {Object.keys(players).sort((a,b)=>b.localeCompare(a)).map((key, index) => (
          <div key={index} className="board-columns" >
             <span className="board-items">{key}</span>
                <span className="board-items">{players[key]}</span>
            {/* {key}: {data[key]} */}
          </div>
        ))}

        {/* <div className="board-columns">
          <span className="board-items">Jack</span>
          <span className="board-items">13</span>
        </div>
        <div className="board-columns">
          <span className="board-items">Roniee</span>
          <span className="board-items">18</span>
        </div>
        <div className="board-columns">
          <span className="board-items">Bob</span>
          <span className="board-items">12</span>
        </div> */}
      </div>
    </div>
  );
};

export default LeaderBoard;
