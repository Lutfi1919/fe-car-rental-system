import { redirect } from "react-router-dom";
import { getProfile } from "../services/user.service";

export async function adminAuth() {
    try {
        const result = await getProfile();

        if (result.data.role !== "admin") {
            throw redirect("/");
        }

        return null;
    } catch {
        throw redirect("/login");
    }
}