import { useEffect, useState } from "react";
import "./App.css";
import GamePage from "./pages/GamePage.jsx";

function App() {
  const [player, setPlayer] = useState("");
  const [playerFlag, setPlayerFlag] = useState(false);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("player", player);
    setPlayer("");
    setPlayerFlag(true);
  };
  let user = localStorage.getItem("player");

  useEffect(() => {
    if (user) setPlayerFlag(true);
    else setPlayerFlag(false);
  });

  return (
    <>
      {playerFlag ? (
        <GamePage onLogOut={setPlayerFlag}/>
      ) : (
        <div className="form">
          <form action="#" onSubmit={hanldeSubmit}>
            <label htmlFor="player">Player Name</label>
            <input
              type="text"
              name="player"
              placeholder="Enter Name."
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
            />
            <button onClick={hanldeSubmit}>Play</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
