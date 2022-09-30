import axios from "axios";
export const baseURL = 'https://localhost:8085/api'; 

const customAxios = axios.create({
    baseURL
});

customAxios.interceptors.request.use(async (config) => {
    const storagedUser = localStorage.getItem("@FinanceWeb::user");

    if (storagedUser !== null) {
        const token = JSON.parse(localStorage.getItem("@FinanceWeb::user") || '{}' );

        config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default customAxios;