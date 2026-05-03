import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import App from "../App";
import Template from "../Template";
import Catalog from "../pages/Catalog";
import Fleet from "../pages/Fleet";
import Profile from "../pages/Profile";
import NavbarProfileComp from "../components/NavbarProfileComp";
import Bookings from "../pages/Bookings";
import PaymentHistory from "../pages/PaymentHistory";

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
                element: <NavbarProfileComp />,
                children: [
                    { path: "/profile", element: <Profile /> },
                    { path: "booking", element: <Bookings /> },
                    { path: "payment_history", element: <PaymentHistory /> }
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