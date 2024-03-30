import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

/**
 * Fetches a list of cats based on a specific breed.
 * 
 * @param {string} breedId - The unique identifier for the breed.
 * @param {number} [limit=10] - The maximum number of cat images to return.
 * @param {number} [page=1] - The page number for pagination, starting at 1.
 * @returns {Promise<any[]>} A promise that resolves to an array of cat images.
 * @throws Will throw an error if the request fails.
 */
export const fetchCatsByBreed = async (breedId: string, limit: number = 10, page: number = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/images/search?breed_id=${breedId}&limit=${limit}&page=${page}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cats", error);
        throw error;
    }
};

/**
 * Fetches detailed information for a specific cat by its ID.
 * 
 * @param {string} catId - The unique identifier for the cat.
 * @returns {Promise<any>} A promise that resolves to the details of the cat.
 * @throws Will throw an error if the request fails.
 */
export const fetchCatDetails = async (catId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/images/${catId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cat details", error);
        throw error;
    }
};

/**
 * Fetches a list of all cat breeds available in TheCatAPI.
 * 
 * @returns {Promise<any[]>} A promise that resolves to an array of cat breeds.
 * @throws Will throw an error if the request fails.
 */
export const fetchBreeds = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/breeds`);
        return response.data;
    } catch (error) {
        console.error("Error fetching breeds", error);
        throw error;
    }
};
