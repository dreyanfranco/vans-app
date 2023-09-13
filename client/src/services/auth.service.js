import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:5005/auth`,
});

export const signup = (userData) => {
    return axiosInstance.post('/signup', userData);
}

export const login = (userData) => {
    return axiosInstance.post('/login', userData)
}

export const verify = (token) => axiosInstance.get('/verify', { headers: { Authorization: `Bearer ${token}` } })

const authService = {
    axiosInstance,
    signup,
    login,
    verify,
};

export default authService;