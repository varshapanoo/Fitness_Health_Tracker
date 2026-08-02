import axios from "axios";

const API = axios.create({
    baseURL:"https://fitness-health-tracker.onrender.com/api",
});

export default API;