import axios from "axios";
export const BASE_URL = 'https://upskilling-egypt.com:3006';

export const API =  axios.create({
    baseURL: BASE_URL+'/api/v1',
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${localStorage.getItem("token")}`
    },
})