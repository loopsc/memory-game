import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles/App.css";

const usedIds = new Set();

function getRandNum() {
    if (usedIds.size >= 20) {
        throw new Error("All Digimon IDs used");
    }

    let id;
    do {
        id = Math.floor(Math.random() * 20) + 1;
    } while (usedIds.has(id));

    usedIds.add(id);
    return id;
}

function App() {
    const [selectedCards, setSelectedCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [digimonList, setDigimonList] = useState([]);

    useEffect(() => {
        // Async function fetches data for 10 digimon
        async function fetchAllDigimon() {
            const promises = Array.from({ length: 10 }, async () => {
                const id = getRandNum();
                const response = await fetch(
                    `https://digi-api.com/api/v1/digimon/${id}`
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const data = await response.json();

                return { name: data.name, img: data.images[0].href };
            });

            const results = await Promise.all(promises);
            setDigimonList(results);
        }

        fetchAllDigimon();
    }, [selectedCards]);

    // Controls score
    function handleClick(clickedDigimon) {
        if (!selectedCards) return;
        const cardSelected = selectedCards.includes(clickedDigimon);
        // Clicked on a duplicate, game over
        if (cardSelected) {
            setSelectedCards([]); //Reset back to empty array
            setCurrentScore(0);
        } else {
            selectedCards.push(clickedDigimon);
            setCurrentScore((prevScore) => {
                const newScore = prevScore + 1;

                if (newScore > highestScore) {
                    setHighestScore(newScore);
                }

                return newScore;
            });
        }
    }

    return (
        <div className="main">
            <div className="header">
                <div className="score">
                    <p>Current Score: {currentScore}</p>
                    <p>Highest Score: {highestScore}</p>
                </div>
            </div>
            <div className="board">
                {digimonList.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    digimonList.map((digimon, index) => (
                        <Card
                            key={index}
                            img={digimon.img}
                            name={digimon.name}
                            onClick={() => handleClick(digimon.name)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
