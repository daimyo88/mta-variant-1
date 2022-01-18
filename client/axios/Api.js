import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
});

export default Api;