import { Link, Outlet, useLocation } from "react-router-dom"
import devGanteng from "../assets/dev ganteng.jpeg"
import { IoArrowForward, IoCalendarOutline, IoPersonOutline } from "react-icons/io5"
import { PiIdentificationCardLight, PiMoneyWavyLight } from "react-icons/pi"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { GoHistory } from "react-icons/go";

export default function NavbarProfileComp() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        })
    }, [])

    return (
        <>
            <div className="pt-25 flex min-h-screen text-[#222222]" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in">
                <div className="shrink-0 flex flex-col items-center p-10 border-e-2 border-[#585858]/10 w-70 max-w-200">
                    <img src={devGanteng} alt="poto propil" className="w-22 h-22 object-cover rounded-full shadow-lg"/>
                    <p className="mt-3 text-xl truncate max-w-70">Luthfi Ahmad</p>
                    <p className="text-sm font-light truncate max-w-70 text-[#585858]">adew19@gmail.com</p>
                    <div className="mt-15 flex mb-20 flex-col self-start gap-5 text-[#222222]">
                        <Link to="/profile" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/profile") ? 'opacity-100' : 'opacity-75'}`}><IoPersonOutline />Profile Settings {isActive("/profile") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                        <Link to="booking" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/profile/booking") ? 'opacity-100' : 'opacity-75'}`}><IoCalendarOutline />My Bookings {isActive("/profile/booking") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                        <Link to="payment_history" className={`flex items-center gap-3 transition duration-300 hover:opacity-100 relative ${isActive("/profile/payment_history") ? 'opacity-100' : 'opacity-75'}`}><PiMoneyWavyLight />Payment History {isActive("/profile/payment_history") && <span className="absolute -right-8 text-2xl">•</span>}</Link>
                    </div>
                    <Link to="/" className='w-full mt-auto hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg mb-3'>Logout <IoIosLogOut className='ms-2'/></Link>
                    <Link to="/fleet" className='w-full hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg'>Book new ride <IoArrowForward className='ms-2'/></Link>
                </div>
                <div className="flex-1 ps-7 pe-5">
                    <Outlet />
                </div>
            </div>
        </>
    )
}