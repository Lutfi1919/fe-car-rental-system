import api from '../api/axios';

// endpoint get booking packages
export const getBookingPackages = async () => {
    const response = await api.get("/booking_package");
    return response.data;
};