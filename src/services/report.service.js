import api from "../api/axios";

export const downloadVehicle = async () => {
    return api.get("/reports/vehicles/excel", { responseType: "blob" });
}

export const downloadUserPayments = async () => {
    return api.get("/reports/payments/excel", { responseType: "blob" });
}