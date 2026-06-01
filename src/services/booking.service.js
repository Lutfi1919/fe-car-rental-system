import api from '../api/axios';

// endpoint get bookings
export const getBookings = async () => {
    const response = await api.get("/booking");
    return response.data;
};

// endpoint get user bookings history
export const getUserBookings = async () => {
    const response = await api.get("/booking/my_bookings")
    return response.data;
};

// endpoitn show booking
export const showBooking = async (id) => {
    const response = await api.get(`/booking/${id}`);
    return response.data;
};