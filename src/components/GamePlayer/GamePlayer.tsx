import React, { useState } from 'react';
import CountDownTimer from "./parts/CountdownTimer";
import TrackCard from "./parts/TrackCard";
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useRequireUserProfile } from '../router/protectedRoute';

const GamePlayer: React.FC = () => {
    const MAX_GAME_TIME = 90000;
    const gameResults = useLocation().state;
    const [mp3URLs,] = useState<string[]>([...gameResults.mp3URLs]);
    const [trackNames, setTrackNames] = useState<string[]>([...gameResults.trackNames]);
    const [gameStartTime,] = useState<number>(new Date().getTime());
    const navigate = useNavigate();
    const [indexOfTrackPlaying, setTrackId] = useState(0);
    const [correctNames,] = useState<string[]>([...gameResults.answers]);
    const uuid = trackNames.map(() => uuidv4());

    console.log("SCREEN: GamePlayer");

    const swapTrackNames = (draggedIndex: number, droppedIndex: number) => {
        [trackNames[draggedIndex], trackNames[droppedIndex]] = [trackNames[droppedIndex], trackNames[draggedIndex]];
        setTrackNames([...trackNames]);
    };

    const playTrack = (trackId: number) => {
        setTrackId(trackId);
    };

    const endGame = () => {
        const transfer = { state: { trackNames: trackNames, mp3URLs: mp3URLs, timeTaken: Math.min(MAX_GAME_TIME, new Date().getTime() - gameStartTime), answers: correctNames }, };
        console.log({ transfer });
        navigate("/gameresults", transfer);
    };

    const verifyEndGame = () => {
        if (confirm("End Game?") === true) {
            endGame();
        }
    }

    return <div className="gameplayer">
        <fieldset className="trackcontainer" >
            {trackNames.map((trackName, index) =>
                <TrackCard
                    index={index}
                    indexOfTrackPlaying={indexOfTrackPlaying}
                    trackName={trackName}
                    playTrack={playTrack}
                    swapTrackNames={swapTrackNames}
                    key={uuid[index]}
                />)}
        </fieldset>
        <fieldset className="lowerFieldSet">
            <legend>Game controls:</legend>
            <CountDownTimer duration={MAX_GAME_TIME} endGame={endGame} />
            {<audio loop className="tunePlayer" autoPlay={true} controls src={indexOfTrackPlaying === -1 ? "" : mp3URLs[indexOfTrackPlaying]} ></audio>}
            <button onClick={verifyEndGame}>DONE!</button>
        </fieldset>
    </div >

};

export default GamePlayer;