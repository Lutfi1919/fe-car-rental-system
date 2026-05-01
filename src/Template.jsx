import { Outlet } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import FooterComp from "./components/FooterComp";

export default function Templates() {
    return (
        <>
            <NavbarComp />
            <Outlet />
            <FooterComp />
        </>
    )
}