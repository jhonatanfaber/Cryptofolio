import axios from "axios"

// https://api.cryptofolio.cf
export const BASE_URL = axios.create({
    baseURL: 'http://localhost:3000' 
});


