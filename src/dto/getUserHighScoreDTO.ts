export interface GetUserHighScoreResponseDTO {
    userId: string;
    score: number;
    time: number;
    position: number;
}

const getUserHighScore = async (userId: string): Promise<GetUserHighScoreResponseDTO[]> => {
    const apiUrl = `http://localhost:8080/api/v1/musicquiz/highscores/user?limit=20&userId=${userId}`;

    const response = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {}
    });

    if (!response.ok) {
        console.log("LOG:", response);
        throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export default getUserHighScore;