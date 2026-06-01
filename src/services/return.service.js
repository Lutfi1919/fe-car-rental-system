import api from "../api/axios";

// endpoint create return
export const createReturn = async (data) => {
    const response = await api.post("/return", data);
    return response.data;
};