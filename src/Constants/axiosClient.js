import axios from "axios";

export const API =  axios.create({
    baseURL: "https://upskilling-egypt.com:3006/api/v1",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${localStorage.getItem("token")}`
    },
})