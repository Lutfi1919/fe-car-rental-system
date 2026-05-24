import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import App from "../App";
import Template from "../Template";
import Catalog from "../pages/Catalog";
import Fleet from "../pages/Fleet";
import Profile from "../pages/Profile";
import SidebarComp from "../components/SidebarComp";
import Bookings from "../pages/Bookings";
import PaymentHistory from "../pages/PaymentHistory";
import DetailBooking from "../pages/DetailBooking";
import Verify from "../pages/Verify";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            { path: "/", element: <App /> },
            { path: "/catalog", element: <Catalog /> },
            { path: "/fleet", element: <Fleet /> },
            { 
                path: "/profile", 
                element: <SidebarComp />,
                children: [
                    { path: "/profile", element: <Profile /> },
                    { path: "verification", element: <Verify /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "payment_history", element: <PaymentHistory /> },
                    { path: "booking_detail", element: <DetailBooking /> },
                ]
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
])