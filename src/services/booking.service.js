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

// endpoint show booking
export const showBooking = async (id) => {
    const response = await api.get(`/booking/${id}`);
    return response.data;
};

// endpoint change status
export const changeBookingStatus = async (id, status) => {
    const response = await api.patch(`/booking/${id}`, { status });
    return response.data;
};