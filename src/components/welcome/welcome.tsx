import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import getGame from '../../dto/getGameDTO';
import getHighScore, { GetHighScoreResponseDTO } from '../../dto/getHighScoreDTO';
import getUserHighScore, { GetUserHighScoreResponseDTO } from '../../dto/getUserHighScoreDTO';
import { UserProfileContext } from '../userProfile/useUserProfile';
import { v4 as uuidv4 } from 'uuid';
import { GetGameResponseDTO } from '../../dto/getGameDTO';

const Welcome: React.FC = () => {

    const navigate = useNavigate();

    const { userProfile, } = useContext(UserProfileContext);
    const [userId,] = useState(userProfile.id);

    const [gameLoaded, setDataLoaded] = useState(false);
    const [songName, setSongName] = useState<string[]>([]);
    const [songURL, setSongURL] = useState<string[]>([]);
    const [correctName, setCorrectName] = useState<string[]>([]);

    const [highScoreLoaded, setHighScoreLoaded] = useState(false);
    const [highScore, setHighScore] = useState<GetHighScoreResponseDTO[]>([]);

    const [userHighScoreLoaded, setUserHighScoreLoaded] = useState(false);
    const [userHighScore, setUserHighScore] = useState<GetUserHighScoreResponseDTO[]>([]);
    const [userHighScoreUUID, setUserHighScoreUUID] = useState<string[]>([]);

    const asyncFetchGameDTO = async () => {

        if (!gameLoaded) {

            const gameDTO: GetGameResponseDTO = await getGame();
            console.log("Welcome, asyncFetchGameDTO", { gameDTO });
            const songList = gameDTO.songName.map((song: string, index: number) => `"${song}", ${gameDTO.songArtist[index]}`);
            setCorrectName([...songList]);
            const randomisedArray = [...songList.sort(() => Math.random() - 0.5)];
            setSongName([...randomisedArray]);
            setSongURL([...gameDTO.songURL]);

            if (songName && songURL) {
                setDataLoaded(true);
            }

            console.log(songName, songURL);

        }

    };

    const asyncFetchHighScoreDTO = async () => {

        const highScoreDTO = await getHighScore();

        if (!highScoreLoaded) {
            setHighScoreLoaded(true);
            setHighScore(highScoreDTO.map((score) => { return { ...score, uuid: uuidv4() } }));
            setHighScore(highScoreDTO.map((score) => { return { ...score, uuid: uuidv4() } }));
            console.log({ highScore });
        }

    };

    const asyncFetchUserHighScoreDTO = async (userId: string) => {

        if (!userHighScoreLoaded) {
            const userHighScoreDTO = await getUserHighScore(userId);
            setUserHighScoreLoaded(true);
            setUserHighScore(userHighScoreDTO);
            setUserHighScoreUUID(userHighScoreDTO.map(() => uuidv4()));
        }

    };

    useEffect(() => {
        asyncFetchGameDTO();
        asyncFetchHighScoreDTO();
        asyncFetchUserHighScoreDTO(userId);
    }, []);

    const transferState = { state: { trackNames: songName, mp3URLs: songURL, answers: correctName } };
    console.log({ transferState });
    return <div className="welcomeMain">
        <div className="welcomeInstructions"><h1>How to Play</h1><ul><li>Click the&nbsp; <strong>Start Game</strong> button, below, to start a game. </li><li>Click the <strong>Play Track</strong> buttons to play each track, in turn</li><li>Drag the music names onto the correct playing tunes before time runs out!</li><li>Click the <strong>Done</strong> button to finish early.</li><li>Your score will be the number of tunes you guessed correctly, with time taken as a tie breaker.</li></ul></div>
        <div className="welcomeHighscoreContainer">
            <table className="welcomeHighScoreTable">
                <caption>High Scores</caption>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User Name</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        highScore && highScore
                            .sort((a, b) => a.score == b.score ? a.time - b.time : b.score - a.score)
                            .map(({ userName: username, score, time }, index, array: GetHighScoreResponseDTO[]) => <tr key={userHighScoreUUID[index]}>
                                <td>{array.filter((hiscore) => hiscore.score > score || (hiscore.score === score && hiscore.time < time)).length + 1}</td>
                                <td>{username}</td>
                                <td>{score}</td>
                                <td>{time / 1000.0}</td>
                            </tr>)
                    }
                </tbody>
            </table>

            <table className="welcomeHighScoreTable">
                <caption>Personal Bests</caption>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {userHighScore && userHighScore.sort((a, b) => a.score == b.score ? a.time - b.time : b.score - a.score)
                        .map(({ position, score, time }) => <tr>
                            <td>{position}</td>
                            <td>{score}</td>
                            <td>{time / 1000.0}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
        {<button disabled={!gameLoaded} onClick={() => navigate("/gameplayer", transferState)}>{gameLoaded ? "Start Game" : "Loading game data..."}</button>}
    </div>
}
export default Welcome;

