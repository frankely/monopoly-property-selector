import React, { useState } from 'react';
import './PropertySelector.css'; // Assume we have a CSS file for styling

const initialProperties = {
    Cheap: ['States Ave', 'Virginia Ave', 'St. James Place', 'Tennessee Ave', 'New York Ave', 'St. Charles Place', 'States Ave', 'Virginia Ave', 'St. James Place', 'Tennessee Ave'],
    Medium: ['Kentucky Ave', 'Indiana Ave', 'Illinois Ave', 'Atlantic Ave', 'Ventnor Ave', 'Marvin Gardens', 'Kentucky Ave', 'Indiana Ave', 'Illinois Ave', 'Atlantic Ave', 'Ventnor Ave'],
    Hot: ['Pacific Ave', 'North Carolina Ave', 'Pennsylvania Ave', 'Park Place', 'Board Walk']
};

const PropertySelector = () => {
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [properties, setProperties] = useState(initialProperties);
    const [playerProperties, setPlayerProperties] = useState({});
    const [gameStarted, setGameStarted] = useState(false);

    const addPlayer = (name) => {
        if (name) {
            setPlayers([...players, name]);
            setPlayerProperties({ ...playerProperties, [name]: { Cheap: [], Medium: [], Hot: [] } });
        }
    };

    const startGame = () => {
        if (players.length > 0) {
            setGameStarted(true);
        } else {
            alert('Please add at least one player to start the game!');
        }
    };

    const selectProperty = (category) => {
        if (properties[category].length === 0) {
            alert(`No more properties available in the ${category} category!`);
            return;
        }

        const currentPlayer = players[currentPlayerIndex];
        const index = Math.floor(Math.random() * properties[category].length);
        const selected = properties[category][index];

        setPlayerProperties(prev => ({
            ...prev,
            [currentPlayer]: {
                ...prev[currentPlayer],
                [category]: [...prev[currentPlayer][category], selected]
            }
        }));

        const updatedCategory = properties[category].filter((_, i) => i !== index);
        setProperties(prev => ({ ...prev, [category]: updatedCategory }));

        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    };

    return (
        <div className="game-container">
            {!gameStarted && (
                <div className="player-setup">
                    <input type="text" id="playerName" placeholder="Enter player name" />
                    <button onClick={() => addPlayer(document.getElementById('playerName').value)}>Add Player</button>
                    <button onClick={startGame}>Start Game</button>
                </div>
            )}

            {gameStarted && (
                <div className="game-play">
                    <h1>Current turn: {players[currentPlayerIndex]}</h1>
                    <div className="category-buttons">
                        <button onClick={() => selectProperty('Cheap')}>Cheap</button>
                        <button onClick={() => selectProperty('Medium')}>Medium</button>
                        <button onClick={() => selectProperty('Hot')}>Hot</button>
                    </div>
                </div>
            )}

            <div className="properties-display">
                <div className="available-properties">
                    <h2>Available Properties</h2>
                    {['Cheap', 'Medium', 'Hot'].map(category => (
                        <div key={category}>
                            <h3>{category}</h3>
                            <ul>
                                {properties[category].map((property, index) => (
                                    <li key={index}>{property}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="players-properties">
                    <h2>Players' Properties</h2>
                    {players.map(player => (
                        <div key={player}>
                            <h3>{player}</h3>
                            {['Cheap', 'Medium', 'Hot'].map(category => (
                                <ul key={category}>
                                    {playerProperties[player] && playerProperties[player][category].map((property, index) => (
                                        <li key={index}>{property}</li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertySelector;
