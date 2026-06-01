import api from "../api/axios";

// endpoint get all verif
export const getVerifications = async () => {
    const response = await api.get("/verification");
    return response.data;
};

// endpoint create verif
export const createVerification = async (formData) => {
    const response = await api.post("/verification", formData);
    return response.data;
};

// endpoint change status verif (for admin)
export const changeStatusVerification = async (id, status) => {
    const response = await api.patch(`/verification/${id}`, {status});
    return response.data;
};
