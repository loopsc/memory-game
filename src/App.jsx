import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles/App.css";

function App() {
    const [imageUrl, setImageUrl] = useState("");
    const [digimonName, setDigimonName] = useState("");
    const [deck, setDeck] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);


    useEffect(() => {
        async function fetchImage() {
            let key = getRandNum();
            let url = `https://digi-api.com/api/v1/digimon/${key}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result.images[0].href);

                setImageUrl(result.images[0].href);
                setDigimonName(result.name);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchImage();
    }, []);

    function getRandNum() {
        return Math.floor(Math.random() * 20) + 1;
    }

    // Controls score
    function handleClick(clickedDigimon) {
        const foundName = deck.find((digimon) => digimon == clickedDigimon)
        // Clicked on a duplicate, game over
        if (foundName) {
            setDeck([])
            setCurrentScore(0)
        }
        else {
            setCurrentScore(prevScore => {
                const newScore = prevScore + 1;
                
                if (newScore > highestScore) {
                    setHighestScore(newScore)
                }

                return newScore
            })
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
                {imageUrl ? (
                    <Card onClick={handleClick} img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
                {imageUrl ? (
                    <Card img={imageUrl} name={digimonName} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default App;
