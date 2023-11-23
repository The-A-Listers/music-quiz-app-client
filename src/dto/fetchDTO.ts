async function getDTO<T>(url: string) : Promise<T>  {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {}
    });

    if (!response.ok) {
        console.log("LOG:", response);
        throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data:T = await response.json();
    return data;
    
}

export default getDTO;