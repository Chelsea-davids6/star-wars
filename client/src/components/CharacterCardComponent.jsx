import React from "react";
import "../CharacterCard.css";


const CharacterCardComponent = ({ name, image, details }) => {
    return (
      <div className="character-card">
        <h2 className="character-name">{name}</h2>
        <div className="character-content">
          <img src={image} alt={name} className="character-image" />
          <div className="character-details">{details}</div>
        </div>
      </div>
    );
  };
  
  export default CharacterCardComponent;