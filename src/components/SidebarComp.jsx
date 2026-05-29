import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import devGanteng from "../assets/dev ganteng.jpeg"
import { IoArrowForward, IoCalendarOutline, IoCarSportOutline, IoPersonOutline } from "react-icons/io5"
import { PiIdentificationCardLight, PiMoneyWavyLight } from "react-icons/pi"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { CiCircleCheck, CiCircleInfo, CiCircleMinus, CiCircleRemove, CiGrid31 } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";

export default function SidebarComp() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    async function getUser() {
        const url = "http://localhost:4000/users/profile";
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(url, {
                headers: {
                    Authorization: token
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        
            const result = await response.json();
            setProfile(result.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        })
    }, [])

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
            <div className="pt-25 flex min-h-screen text-[#222222]" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in">
                <div className="shrink-0 flex flex-col items-center p-10 border-e-2 border-[#585858]/10 w-70 max-w-200">
                    <img src={profile.profile_image} alt="poto propil" className="w-22 h-22 object-cover rounded-full shadow-lg"/>
                    <p className="mt-3 text-xl truncate max-w-70 capitalize">{profile.name}</p>
                    <p className="text-sm font-light truncate max-w-70 text-[#585858]">{profile.email}</p>
                    {
                        profile.is_verified === 'unverified' && (
                            <p className="text-xs mt-2 font-light truncate max-w-70 bg-gray-400/20 text-gray-600 px-3 py-1 rounded-full flex items-center"><CiCircleMinus className="me-1"/>Unverified</p>
                        )
                    }
                    {
                        profile.is_verified === 'pending' && (
                            <p className="text-xs mt-2 font-light truncate max-w-70 bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full flex items-center"><CiCircleInfo className="me-1"/>Pending</p>
                        )
                    }
                    {
                        profile.is_verified === 'verified' && (
                            <p className="text-xs mt-2 font-light truncate max-w-70 bg-green-400/20 text-green-600 px-3 py-1 rounded-full flex items-center"><CiCircleCheck className="me-1"/>Verified</p>
                        )
                    }
                    {
                        profile.is_verified === 'rejected' && (
                            <p className="text-xs mt-2 font-light truncate max-w-70 bg-red-400/20 text-red-600 px-3 py-1 rounded-full flex items-center"><CiCircleRemove className="me-1"/>Rejected</p>
                        )
                    }
                    {
                        profile.role == 'user' ?
                        <div className="mt-15 flex mb-20 flex-col self-start gap-5 text-[#222222]">
                            <Link to="/profile" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/profile") ? 'opacity-100' : 'opacity-65'}`}><IoPersonOutline />Profile Settings {isActive("/profile") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                            <Link to="bookings" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/profile/bookings") || isActive("/profile/booking_detail")  ? 'opacity-100' : 'opacity-65'}`}><IoCalendarOutline />My Bookings {(isActive("/profile/bookings") || isActive("/profile/booking_detail")) && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                            <Link to="payment_history" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/profile/payment_history") ? 'opacity-100' : 'opacity-65'}`}><PiMoneyWavyLight />Payment History {isActive("/profile/payment_history") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                        </div>
                        :
                        <div className="mt-15 flex mb-20 flex-col self-start gap-5 text-[#222222]">
                            <Link to="/dashboard" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/dashboard") ? 'opacity-100' : 'opacity-65'}`}><CiGrid31 />Dashboard {isActive("/dashboard") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                            <Link to="vehicles" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/dashboard/vehicles") ? 'opacity-100' : 'opacity-65'}`}><IoCarSportOutline />Vehicles {(isActive("/dashboard/vehicles") || isActive("/dashboard/vehicles")) && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                            <Link to="payments" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/dashboard/payments") ? 'opacity-100' : 'opacity-65'}`}><PiMoneyWavyLight />Payments {isActive("/dashboard/payments") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                            <Link to="customers" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/dashboard/customers") ? 'opacity-100' : 'opacity-65'}`}><FiUsers />Customers {isActive("/dashboard/customers") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                        </div>

                    }
                    <button onClick={handleLogout} className='w-full mt-auto hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg mb-3'>Logout <IoIosLogOut className='ms-2'/></button>
                    {
                        profile.role == 'user' ?
                            <div className="w-full">
                                <Link to="verification" className='w-full hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg  mb-3'>Get verified <IoArrowForward className='ms-2'/></Link>
                                <Link to="/fleet" className='w-full hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg'>Book new ride <IoArrowForward className='ms-2'/></Link>
                            </div>
                            :
                            ""
                    }
                </div>
                <div className="flex-1 ps-7 pe-5">
                    <Outlet />
                </div>
            </div>
        </>
    )
}