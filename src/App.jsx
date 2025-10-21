import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles/App.css";

// todo: Ensure there is always at least 1 card that has not been selected

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
    const [selectedCards, setSelectedCards] = useState([]); //Array of digimon names that have been selected previously
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
            console.log(`New batch of 10: ${results[0].name}`);

            // There includes at least one card that has not been selected

            if (!results.every((data) => selectedCards.includes(data.name))) {
                setDigimonList(results);
            } else {
                await fetchAllDigimon();
            }
        }

        fetchAllDigimon();
    }, [selectedCards]);

    // When a card is clicked
    function handleClick(clickedDigimon) {
        usedIds.clear();

        const isCardDuplicate = selectedCards.includes(clickedDigimon);
        // Clicked on a duplicate, game over
        if (isCardDuplicate) {
            setSelectedCards([]); //Reset back to empty array
            setCurrentScore(0);
        } else {
            //Correct guess
            // setSelectedCards((prev) => [...prev, clickedDigimon]);
            setSelectedCards((prev) => {
                const newSelectedCards = [...prev, clickedDigimon];

                if (newSelectedCards.length === 20) {
                    alert("You got them all!");
                }

                return newSelectedCards;
            });
            setCurrentScore((prevScore) => {
                const newScore = prevScore + 1;

                if (newScore > highestScore) {
                    setHighestScore(newScore);
                }

                return newScore;
            });
        }

        console.log(usedIds);
    }

    return (
        <div className="main">
            <div className="header">
                <div className="score">
                    <p className="score-text">Current Score: {currentScore}</p>
                    <p className="score-text">Highest Score: {highestScore}</p>
                </div>
            </div>
            <div className="board">
                {digimonList.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    digimonList.map((digimon) => (
                        <Card
                            // selectedCards={selectedCards}
                            key={digimon.name}
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
