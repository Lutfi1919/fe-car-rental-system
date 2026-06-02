import { redirect } from "react-router-dom";
import { getProfile } from "../services/user.service";

export async function userAuth() {
    try {
        const result = await getProfile();

        if (result.data.role !== "user") {
            throw redirect("/dashboard");
        }

        return null;
    } catch {
        throw redirect("/login");
    }
}