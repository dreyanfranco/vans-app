import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/',

});

axiosInstance.interceptors.request.use((config) => {
    const storedStoken = localStorage.getItem('authToken')

    if (storedStoken) {
        config.headers = { Authorization: `Bearer ${storedStoken}` }
    }
    return config
})

export const getVans = async () => {
    return axiosInstance.get('/vans')
};

export const getOneVan = (van_id) => {
    return axiosInstance.get(`/vans/${van_id}`);
};

export const saveVan = (vanData) => {
    return axiosInstance.post('/vans', vanData);
};

export const deleteVanById = (van_id) => {
    return axiosInstance.delete(`/vans/${van_id}`)
};

export const updateVan = (van_id, vanData) => {
    return axiosInstance.patch(`/vans/${van_id}`, vanData)
}