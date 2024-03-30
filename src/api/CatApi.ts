import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

export const fetchCatsByBreed = async (breedId: string, limit: number = 10, page: number = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/images/search?breed_id=${breedId}&limit=${limit}&page=${page}&api_key=live_EvWVEXmeBJZHidTY4XRx1enz6vzjHAUWIWDvSvcV5Dlfag0KZNQ0v2VEWR6r1isq`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cats", error);
        throw error;
    }
};

export const fetchCatDetails = async (catId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/images/${catId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cat details", error);
        throw error;
    }
};

export const fetchBreeds = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/breeds`);
        return response.data;
    } catch (error) {
        console.error("Error fetching breeds", error);
        throw error;
    }
};
