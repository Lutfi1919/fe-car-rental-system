import api from '../api/axios';

// endpoint get payments
export const getPayments = async () => {
    const response = await api.get("/payments");
    return response.data;
};

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