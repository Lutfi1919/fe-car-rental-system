import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import App from "../App";
import Template from "../Template";
import Fleet from "../pages/Fleet";
import Profile from "../pages/Profile";
import SidebarComp from "../components/SidebarComp";
import UserBookingsHistory from "../pages/UserBookingsHistory";
import UserPaymentHistory from "../pages/UserPaymentHistory";
import UserBookingDetail from "../pages/UserBookingDetail";
import UserVerify from "../pages/UserVerify";
import Dashboard from "../pages/Dashboard";
import DashVehicles from "../pages/DashVehicles";
import DashPayments from "../pages/DashPayments";
import DashCustomers from "../pages/DashCustomers";
import VehicleBooking from "../pages/VehicleBooking";
import VehicleCrud from "../pages/VehicleCrud";
import CreateVehicle from "../pages/CreateVehicle";
import DashBookings from "../pages/DashBookings";
import DashVerifications from "../pages/DashVerifications";
import DashReturns from "../pages/DashReturns";
import DashBookingDetail from "../pages/DashBookingDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            { path: "/", element: <App /> },
            { path: "/fleet", element: <Fleet /> },
            { path: "/vehicles/:id", element: <VehicleBooking /> },
            { path: "/vehicles/:id/edit", element: <VehicleCrud /> },
            { path: "/vehicles/create", element: <CreateVehicle /> },
            { 
                path: "/profile", 
                element: <SidebarComp />,
                children: [
                    { path: "/profile", element: <Profile /> },
                    { path: "verification", element: <UserVerify /> },
                    { path: "bookings", element: <UserBookingsHistory /> },
                    { path: "payment_history", element: <UserPaymentHistory /> },
                    { path: "bookings/:id/booking_detail", element: <UserBookingDetail /> },
                ]
            },
            { 
                path: "/dashboard", 
                element: <SidebarComp />,
                children: [
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "vehicles", element: <DashVehicles /> },
                    { path: "bookings", element: <DashBookings /> },
                    { path: ":id/booking_detail", element: <DashBookingDetail /> },
                    { path: "payments", element: <DashPayments /> },
                    { path: "customers", element: <DashCustomers /> },
                    { path: "verifications", element: <DashVerifications /> },
                    { path: "returns", element: <DashReturns /> },
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