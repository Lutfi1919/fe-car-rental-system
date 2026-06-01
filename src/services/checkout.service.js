import api from "../api/axios";

export const checkoutBooking = async (data) => {
    const response = await api.post("/checkout", data);
    return response.data;
};