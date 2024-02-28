import React, { useState } from "react";
import "../styles/card.css";
import catImage from "../assets/cat-image.webp";
import bombImage from "../assets/bomb.png";
import shuffleImage from "../assets/shuffle.webp";
import diffuseImage from "../assets/diffuse.png";

const Card = ({ handleCard, index, cardNumber }) => {
  const [cardFlag, setCardFlag] = useState(false);

  const data = {
    0: catImage,
    1: bombImage,
    2: diffuseImage,
    3: shuffleImage,
  };

  const cardFunction = () => {
    setCardFlag((prevFlag) => !prevFlag);

    handleCard(index, cardNumber);
  };

  return (
    <>
      <div
        className={cardFlag ? "main-card-open" : "main-card"}
        onClick={cardFunction}
      >
        <div className="card-item">
          <img src={data[cardNumber]} alt={cardNumber} className="card-img" />
        </div>
      </div>
    </>
  );
};

export default Card;
