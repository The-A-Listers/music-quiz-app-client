import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router';

import postUserHighScore from "../../dto/postUserScoreDTO";
import { UserProfileContext } from "../userProfile/useUserProfile";

const GameResults: React.FC = () => {

    console.log("SCREEN: GameResults");
    const navigate = useNavigate();
    const [playURL, setPlayURL] = useState("");
    const gameResults = useLocation().state;

    const [songName,] = useState<string[]>([...gameResults.trackNames]);
    const [songURL,] = useState<string[]>([...gameResults.mp3URLs]);
    const [correctSongName] = useState<string[]>([...gameResults.answers]);

    const [userTimeTaken,] = useState<number>(gameResults.timeTaken);
    const [resultsLoaded, setResultsLoaded] = useState(false);
    const { userProfile, } = useContext(UserProfileContext);
    const [userId,] = useState(userProfile.id);
    const [userPosition, setUserPosition] = useState(0);
    const [userScore,] = useState(songName.reduce((total: number, songName: string, index: number) => total += (songName === correctSongName[index] ? 1 : 0), 0));



    const sendResultsAndGetAnswers = async (userId: string, songName: string[], correctSongName: string[], userTimeTaken: number) => {

        if (!resultsLoaded) {
            console.log("GameResults POSTED DATA");

            setResultsLoaded(true);
            const result = await postUserHighScore({ userId, songName: songName, correctSongName, userTimeTaken });

            setUserPosition(result.userAtPosition);

        }
    }

    useEffect(() => {
        // TODO: reimplement code to get game duration
        sendResultsAndGetAnswers(userId, songName, correctSongName, userTimeTaken);
    }, []);

    // console.log(correctSongNames, correctURLs);

    return <><div className="resultsMain">
        <table className="resultsTable">
            <thead>
                <tr>
                    <th>Your guess</th>
                    <th>The Correct Answer</th>
                    <th>Play</th>
                    <th>Mark</th>
                </tr>
            </thead>
            <tbody>
                {songName.map((trackName: string, index: number) => {
                    return <tr>
                        <td>{trackName}</td>
                        <td>{correctSongName[index]}</td>
                        <td><button onClick={() => { setPlayURL(songURL[index]) }}>▶</button></td>
                        <td>{correctSongName[index] === trackName ? "✓" : "❌"}</td>
                    </tr>
                })}
            </tbody>
        </table>
        <audio loop autoPlay={true} controls src={playURL} ></audio>
        <div className="resultsGameScore"><div>LAST GAME:</div><div>Score: {userScore}</div><div>TimeTaken: {userTimeTaken / 1000.0}s</div><div>HighScore Ranking:{userPosition}</div></div>

        <button onClick={() => navigate("/welcome")}>Finish</button>

    </div ></>;

}
export default GameResults;