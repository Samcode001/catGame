import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/GamePage.css";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar.jsx";
import LeaderBoard from "../components/LeaderBoard.jsx";
import { addDefuser, addPoint, removeDefuser } from "../redux/userChart.js";

const GamePage = ({onLogOut}) => {
  const [cards, setCards] = useState(
    Array.from({ length: 8 }, () => Math.floor(Math.random() * 4))
  );

  const [overFlag, setOverFlag] = useState(false);

  const dispatch = useDispatch();
  const defuser = useSelector((state) => state.defusers);

  const reset = () => {
    setOverFlag(false);
    return setCards(
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 4))
    );
  };

  const removeCard = (cardIndex) => {
    return setCards((prevCards) => {
      return prevCards.filter((_, index) => index !== cardIndex);
    });
  };

  const handleCard = (cardIndex, cardNumber) => {
    switch (cardNumber) {
      case 0:
        setTimeout(() => removeCard(cardIndex), 1500);
        dispatch(addPoint());
        break;

      case 1:
        if (defuser > 0) {
          dispatch(removeDefuser());
          setTimeout(() => removeCard(cardIndex), 1500);
        } else {
          setOverFlag(true);
          // setTimeout(() => {}, 1500);
          setCards([1]);
          setTimeout(reset, 2200);
        }
        break;

      case 2:
        dispatch(addDefuser());
        dispatch(addPoint());
        setTimeout(() => removeCard(cardIndex), 1500);
        break;

      case 3:
        setTimeout(reset, 1500);
        dispatch(addPoint());
        break;

      default:
        return null;
    }
  };

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(addPoint());
      reset();
    }
  }, [cards]);

  return (
    <>
      <TopBar onLogOut={onLogOut} />

      <div className="main-page">
        <div className="leaderboard">
          <LeaderBoard />
        </div>

        <div className="game-page">
          {cards &&
            cards.map((elem, index) => {
              return (
                <Card
                  key={index}
                  handleCard={handleCard}
                  index={index}
                  cardNumber={elem}
                />
              );
            })}
          <h1
            style={{ display: overFlag ? "block" : "none" }}
            className="game-banner"
          >
            Game Over
          </h1>
        </div>
      </div>
    </>
  );
};

export default GamePage;
