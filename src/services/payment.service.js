import api from '../api/axios';

// endpoint get payments
export const getPayments = async (page = 1, limit = 5) => {
    const response = await api.get(`/payments?page=${page}&limit=${limit}`);
    return response.data;
};

// endpoint get user payments
export const getUserPayments = async () => {
    const response = await api.get("/payments/profile");
    return response.data;
}

// endpoint change payment status
export const changePaymentStatus = async (paymentId, formData) => {
    const response = await api.patch(`/payments/${paymentId}/status`, formData);
    return response.data;
};

// endpoint create settlement payment
export const createSettlementPayment = async (formData) => {
    const response = await api.post(`/payments/settlement`, formData);
    return response.data;
};

// endpoint create additional payment
export const createAdditionalPayment = async (formData) => {
    const response = await api.post(`/payments/additional`, formData);
    return response.data;
};