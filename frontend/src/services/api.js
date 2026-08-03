import axios from "axios";

const API = axios.create({
    baseURL:"https://fitness-health-tracker-p8g9.onrender.com/api",
});

export default API;