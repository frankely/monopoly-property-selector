import React, { useState } from "react";
import "./PropertySelector.css"; // Assume we have a CSS file for styling

const initialProperties = [
  {
    name: "Mediterranean Ave",
    categories: ["Cheap"],
    price: 60,
    color: "Dark Purple",
    colorCode: "#82312c",
  },
  {
    name: "Baltic Ave",
    categories: ["Cheap"],
    price: 60,
    color: "Dark Purple",
    colorCode: "#82312c",
  },
  {
    name: "Rhode Island Ave",
    categories: ["Cheap", "Medium"],
    price: 100,
    color: "Light Blue",
    colorCode: "#75eff9",
  },
  {
    name: "Vermont Ave",
    categories: ["Cheap", "Medium"],
    price: 100,
    color: "Light Blue",
    colorCode: "#75eff9",
  },
  {
    name: "Connecticut Ave",
    categories: ["Cheap", "Medium"],
    price: 120,
    color: "Light Blue",
    colorCode: "#75eff9",
  },
  {
    name: "St. Charles Place",
    categories: ["Medium"],
    price: 140,
    color: "Pink",
    colorCode: "#ff69b4",
  },
  {
    name: "States Ave",
    categories: ["Medium"],
    price: 140,
    color: "Pink",
    colorCode: "#ff69b4",
  },
  {
    name: "Virginia Ave",
    categories: ["Medium"],
    price: 160,
    color: "Pink",
    colorCode: "#ff69b4",
  },
  {
    name: "St. James Place",
    categories: ["Medium"],
    price: 180,
    color: "Orange",
    colorCode: "#ffa500",
  },
  {
    name: "Tennessee Ave",
    categories: ["Medium"],
    price: 180,
    color: "Orange",
    colorCode: "#ffa500",
  },
  {
    name: "Kentucky Ave",
    categories: ["Medium", "Hot"],
    price: 220,
    color: "Red",
    colorCode: "#ff0000",
  },
  {
    name: "Indiana Ave",
    categories: ["Medium", "Hot"],
    price: 220,
    color: "Red",
    colorCode: "#ff0000",
  },
  {
    name: "Illinois Ave",
    categories: ["Hot"],
    price: 240,
    color: "Red",
    colorCode: "#ff0000",
  },
  {
    name: "Atlantic Ave",
    categories: ["Medium", "Hot"],
    price: 260,
    color: "Yellow",
    colorCode: "#ffff00",
  },
  {
    name: "Ventnor Ave",
    categories: ["Hot"],
    price: 260,
    color: "Yellow",
    colorCode: "#ffff00",
  },
  {
    name: "Pacific Ave",
    categories: ["Hot"],
    price: 280,
    color: "Green",
    colorCode: "#008000",
  },
  {
    name: "North Carolina Ave",
    categories: ["Hot"],
    price: 300,
    color: "Green",
    colorCode: "#008000",
  },
  {
    name: "Pennsylvania Ave",
    categories: ["Hot"],
    price: 320,
    color: "Green",
    colorCode: "#008000",
  },
  {
    name: "Park Place",
    categories: ["Hot"],
    price: 350,
    color: "Dark Blue",
    colorCode: "#00008b",
  },
  {
    name: "Board Walk",
    categories: ["Hot"],
    price: 400,
    color: "Dark Blue",
    colorCode: "#00008b",
  },
];

const PropertySelector = () => {
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [properties, setProperties] = useState(initialProperties);
    const [playerProperties, setPlayerProperties] = useState({});
    const [gameStarted, setGameStarted] = useState(false);
  
    const addPlayer = (name) => {
      if (name) {
        setPlayers([...players, name]);
        setPlayerProperties({ ...playerProperties, [name]: [] });
      }
    };
  
    const startGame = () => {
      if (players.length > 0) {
        setGameStarted(true);
      } else {
        alert("Please add at least one player to start the game!");
      }
    };
  
    const selectProperty = (category) => {
      const availableProperties = properties.filter((property) =>
        property.categories.includes(category)
      );
      if (availableProperties.length === 0) {
        alert(`No more properties available in the ${category} category!`);
        return;
      }
  
      const currentPlayer = players[currentPlayerIndex];
      const index = Math.floor(Math.random() * availableProperties.length);
      const selected = availableProperties[index];
  
      setPlayerProperties((prev) => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], selected]
      }));
  
      setProperties((prev) =>
        prev.filter((property) => property.name !== selected.name)
      );
  
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    };
  
    const renderPropertyCard = (property) => (
      <div
        key={property.name}
        className="property-card"
        style={{ borderColor: property.colorCode, backgroundColor: '#fff' }}
      >
        <h3 style={{ backgroundColor: property.colorCode, color: '#fff' }}>{property.name}</h3>
        <p>Categories: {property.categories.join(", ")}</p>
        <p>Price: ${property.price}</p>
      </div>
    );
  
    return (
      <div className="game-container">
        {!gameStarted && (
          <div className="player-setup">
            <input
              type="text"
              id="playerName"
              placeholder="Enter player name"
              className="player-input"
            />
            <button
              className="styled-button"
              onClick={() => addPlayer(document.getElementById("playerName").value)}
            >
              Add Player
            </button>
            <button
              className="styled-button start-game-button"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        )}
  
        {gameStarted && (
          <div className="game-play sticky-top">
            <h1>Current turn: {players[currentPlayerIndex]}</h1>
            <div className="category-buttons">
              {["Cheap", "Medium", "Hot"].map((category) => (
                <button
                  className="styled-button"
                  key={category}
                  onClick={() => selectProperty(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
  
        <div className="properties-display">
          <div className="available-properties">
            <h2>Available Properties</h2>
            {properties.map(renderPropertyCard)}
          </div>
          <div className="players-properties">
            <h2>Players' Properties</h2>
            {players.map((player) => (
              <div key={player}>
                <h3>{player}</h3>
                <div className="player-properties-cards">
                  {playerProperties[player]?.map(renderPropertyCard)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
export default PropertySelector;