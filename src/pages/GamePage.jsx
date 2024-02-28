import React, { useState } from "react";
import Card from "../components/Card.jsx";
import "../styles/GamePage.css";

const GamePage = () => {
  const [cards, setCards] = useState(
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 4))
  );

  const handleCard = (cardIndex, cardNumber) => {
    console.log(cardIndex);
    switch (cardNumber) {
      case 0:
        setCards((prevCards) => {
          return prevCards.filter((_, index) => index !== cardIndex);
        });
        break;

      case 1:
        setCards([]);
        break;
      case 2:
        setCards((prevCards) => {
          return prevCards.filter((_, index) => index !== cardIndex);
        });
        break;
      case 3:
        setCards(
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 5))
        );
        break;
      default:
        return null;
    }
  };

  return (
    <>
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
      </div>
    </>
  );
};

export default GamePage;
