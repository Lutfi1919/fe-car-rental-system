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
export const getUsers = async (page = 1, limit = 5) => {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
};

// endpoint get profile
export const getProfile = async () => {
    const response = await api.get("/users/profile");
    return response.data;
};

// endpoint update profile
export const updateUser = async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
};

// endpoint delete user
export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};  