import React, { useState } from "react";
import "../styles/card.css";
import catImage from "../assets/cat-image.webp";
import bombImage from "../assets/bomb.png";
import shuffleImage from "../assets/shuffle.webp";
import diffuseImage from "../assets/diffuse.png";
import { useSelector } from "react-redux";

const Card = ({ handleCard, index, cardNumber }) => {
  const [cardFlip, setCardFlip] = useState(false);

  const defuse = useSelector((state) => state.defuse);

  const data = {
    0: catImage,
    1: bombImage,
    2: diffuseImage,
    3: shuffleImage,
  };

  const handleFlip = async () => {
    setCardFlip(true);
    if (cardNumber === 1 && defuse < 1) await setCardFlip(true);
    else
      setTimeout(() => {
        setCardFlip(false);
      }, 1200);

    handleCard(index, cardNumber);
  };

  return (
    <>
      <div onClick={handleFlip} className="card-container">
        <div className={cardFlip ? "card flipped" : "card"}>
          <img
            className="gradient"
            src="https://preview.colorkit.co/gradient/f9ce34-ee2a7b-6228d7.png?size=pinterest&scale=0.25&static=true"
            alt="FLIP"
          />
          <div className="gradient back">
            <img src={data[cardNumber]} alt={cardNumber} className="card-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
