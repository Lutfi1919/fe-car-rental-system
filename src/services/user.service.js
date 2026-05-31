import api from '../api/axios';

// endpoint login
export const Login = async (formData) => {
    const response = await api.post("/login", formData);
    return response.data;
};

// endpoint register
export const Register = async (formData) => {
    const response = await api.post("/register", formData);
    return response.data;
};

// endpoint get users
export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};