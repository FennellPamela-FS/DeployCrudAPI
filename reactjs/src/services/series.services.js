import axios from "axios";
import AuthHeader from "./authHeader";

// const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

const API_URL = "http://localhost:8000/api/v1/series";

const getAllPrivateSeries = () => {
    return axios.get(API_URL, { headers: AuthHeader() });
}

const seriesService = {
    getAllPrivateSeries
}

export default seriesService;
