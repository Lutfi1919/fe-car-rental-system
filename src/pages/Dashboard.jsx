import { Link, useLocation, useNavigate } from "react-router-dom"
import devGanteng from "../assets/dev ganteng.jpeg"
import { IoArrowForward, IoCalendarOutline, IoCarSportOutline, IoPersonOutline } from "react-icons/io5"
import { PiIdentificationCardLight, PiMoneyWavyLight } from "react-icons/pi"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { GoDownload, GoHistory, GoShield } from "react-icons/go";
import emptyPayment from '../assets/empty state/payment.png';
import emptyBooking1 from '../assets/empty state/booking_1.png';
import emptyBooking2 from '../assets/empty state/booking_2.png';
import { CiWallet } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { getVehicles } from "../services/vehicle.service";
import { getVerifications } from "../services/verification.service";
import { getBookings } from "../services/booking.service";

export default function Dashboard() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [verifications, setVerifications] = useState([]);
    const [bookings, setBookings] = useState([]);

    async function getVehicle() {
        try {
            const result = await getVehicles();

            setVehicles(result.data);
        } catch (error) {
            console.error(error.message); 
        }
    }
    
    async function getVerification() {
        try {
            const result = await getVerifications();

            setVerifications(result.data);
        } catch (error) {
            console.error(error.message); 
        }
    }

    async function getBooking() {
        try {
            const result = await getBookings();

            setBookings(result.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        })
    }, [])

    useEffect(() => {
        getVehicle();
        getVerification();
        getBooking();
    }, []);

    const totalIncome = bookings.filter((booking) => booking.payment_status === "paid").reduce((acc, booking) => acc + booking.total_price, 0);

    const activeRental = bookings.filter(
        (booking) => booking.status === "on_rent"
    ).length;

    const pendingVerification = verifications.filter(
        (verification) => verification.status === "pending"
    ).length;

    return (
        <>
            <div className="mb-7" data-aos="fade-in">
                <p className="text-6xl tracking-tight font-medium">Welcome, Admin</p>
                <p className="text-[#585858] mt-2">Monitor your InstaDrive performance today</p>
            </div>
            <div className="">
                <div className="flex gap-4" data-aos="fade-in">
                    <div className="w-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ring-1 ring-[#222222]/20 p-5 rounded-xl ring-inset">
                        <CiWallet className="text-blue-600 text-5xl bg-blue-200 p-3 rounded-lg" />
                        <p className="mt-3 text-sm font-light text-[#585858]">Total Income</p>
                        <p className="text-2xl mt-1">Rp {totalIncome.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="w-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ring-1 ring-[#222222]/20 p-5 rounded-xl ring-inset">
                        <IoCarSportOutline className="text-orange-500 text-5xl bg-orange-200 p-3 rounded-lg" /> 
                        <p className="mt-3 text-sm font-light text-[#585858]">Active Rental</p>
                        <p className="text-2xl mt-1">{activeRental}</p>
                    </div>
                    <div className="w-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ring-1 ring-[#222222]/20 p-5 rounded-xl ring-inset">
                        <GoShield className="text-red-500 text-5xl bg-red-200 p-3 rounded-lg" /> 
                        <p className="mt-3 text-sm font-light text-[#585858]">Pending Verification</p>
                        <p className="text-2xl mt-1">{pendingVerification}</p>
                    </div>
                </div>
            </div>
        </>
    )
}