const BASE_URL = "https://swapi.tech/api/people/";

export const fetchCharacterData = async (name) => {
    try {
        const response = await fetch(`${BASE_URL}?name=${name}`);
        const data = await response.json();

        if (data.result.length > 0) {
            return data.result[0].properties;
        } else {
            throw new Error("Character not found");
        }
    } catch (err) {
        throw new Error(err.message || "Failed to fetch data");
    }
};
