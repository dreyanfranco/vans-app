import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/',
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    // },
});

export const getVans = async () => {
    return axiosInstance.get('/vans')
};

export const getVanById = (van_id) => {
    return axiosInstance.get(`/vans/${van_id}`);
};

export const newVan = (vanData) => {
    return axiosInstance.post('/vans', vanData);
};

export const deleteVanById = (van_id) => {
    return axiosInstance.delete(`/vans/${van_id}`)
};
