import axios from "axios";

const API = axios.create({
    baseURL:"https://fitness-health-tracker.onrender/api",
});

export default API;