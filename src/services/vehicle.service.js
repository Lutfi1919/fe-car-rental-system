import api from "../api/axios";

// endpoint get vehicle
export const getVehicles = async () => {
    const response = await api.get("/vehicles");
    return response.data;
};

// endpoint get vehicle by id
export const getVehicleById = async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
};

// endpoint create vehicle
export const createVehicle = async (formData) => {
    const response = await api.post("/vehicles", formData);
    return response.data;
};

// endpoint update evhicle
export const updateVehicle = async (id, formData) => {
    const response = await api.put(`/vehicles/${id}`, formData);
    return response.data;
};

// endpoint delete vehicle
export const deleteVehicle = async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
};