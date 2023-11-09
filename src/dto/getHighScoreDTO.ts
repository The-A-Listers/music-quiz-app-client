export interface GetHighScoreResponseDTO {
    userName: string;
    score: number;
    time: number
}

const getHighScore = async (): Promise<GetHighScoreResponseDTO[]> => {
    const apiUrl = "http://localhost:8080/api/v1/musicquiz/highscores?limit=12";


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

export default getHighScore;