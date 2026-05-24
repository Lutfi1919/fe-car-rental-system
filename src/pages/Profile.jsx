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

export default function Profile() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneNum: ""
    });

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
            setForm({
                name: result.data.name || "",
                email: result.data.email || "",
                phoneNum: result.data.phoneNum || ""
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    const isChanged =
        form.name !== (profile.name || "") ||
        form.email !== (profile.email || "") ||
        form.phoneNum !== (profile.phoneNum || "");

    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:4000/users/${profile.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },
                    body: JSON.stringify(form)
                }
            );

            const result = await response.json();

            setProfile(result.data);
            window.location.reload()

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
        getUser();
    }, [])

    return (
        <>
            <div className="mb-7" data-aos="fade-in">
                <p className="text-6xl tracking-tight font-medium">{profile.role == "user" ? "Account Settings." : "Welcome, Admin"}</p>
                <p className="text-[#585858] mt-2">{profile.role == "user" ? "Manage your account and car rental preferences" : "Monitor your InstaDrive performance today"}</p>
            </div>
            {
                profile.role == 'user' ?
                <div className="flex gap-5 mb-5" data-aos="fade-in">
                    <div className="">
                        <div className="p-6 rounded-2xl ring ring-[#585858]/10 ring-inset h-fit hover:shadow-xl transition duration-300">
                            <p className="flex items-center gap-3 mb-8 text-2xl"><PiIdentificationCardLight className="text-2xl"/> Personal Information</p>
                            <div className="text[15px]">
                                <form onSubmit={handleUpdate}>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="">
                                            <label className="block text-[#222222] text-sm mb-2" for="name">Full Name</label>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="name" type="text" placeholder="Luthfi Ahmad" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                                        </div>  
                                        <div className="">
                                            <label className="block text-[#222222] text-sm mb-2" for="email">Email Address</label>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="email" type="email" placeholder="adew19@email.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                                        </div>
                                        <div className="mb-5 col-span-2">
                                            <label className="block text-[#222222] text-sm mb-2" for="phone_num">Phone Number</label>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="phone_num" type="text" placeholder="0878-7522-1858" value={form.phoneNum} onChange={(e) => setForm({...form, phoneNum: e.target.value})} />
                                        </div>  
                                    </div>
                                    <button className={`text-sm py-2 px-4 rounded-lg transition-all duration-150 ${isChanged ? "bg-[#222222] text-white hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] hover:bg-transparent cursor-pointer" : "bg-[#222222]/50 text-white cursor-not-allowed"}`} disabled={!isChanged}>Edit information</button>
                                </form>
                            </div>
                        </div>
                        <div className="" data-aos="fade-in">
                            <div className="flex items-center mt-9 mb-5 justify-between">
                                <p className="text-2xl tracking-tight font-medium">My Bookings.</p>
                                <div className="flex justify-center">
                                    <Link to="bookings" className='ring-1 ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all ring-inset rounded-full px-5 py-1.5 w-fit flex items-center gap-2 text-sm'>Show all bookings <IoArrowForward /></Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
                                    <img src="https://cdn.pixabay.com/photo/2021/02/13/14/58/lamborghini-6011781_1280.jpg" alt="Fleet" className='h-55 object-cover' />
                                    <div className="p-5 text-[#222222]">
                                        <p className="text-xl">Lamborghini Aventador</p>
                                        <p className="font-light text-sm flex items-center gap-2 text-[#585858]"><IoCalendarOutline />May 2 - June 14, 2026</p>
                                        <div className="flex items-center justify-between mt-5">
                                            <p className='font-bold text-lg'><span className='text-[#85BB65]'>$400</span><span className='font-light text-sm ms-1'>/day</span></p>
                                            <div className="flex justify-end">
                                                <Link to="/" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-xs px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Details <IoArrowForward className='ms-2'/></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
                                    <img src="https://cdn.pixabay.com/photo/2020/09/20/23/48/bentley-5588541_1280.jpg" alt="Fleet" className='h-55 object-cover' />
                                    <div className="p-5 text-[#222222]">
                                        <p className="text-xl">Bentley Bentayga</p>
                                        <p className="font-light text-sm flex items-center gap-2 text-[#585858]"><IoCalendarOutline />May 2 - June 14, 2026</p>
                                        <div className="flex items-center justify-between mt-5">
                                            <p className='font-bold text-lg'><span className='text-[#85BB65]'>$360</span><span className='font-light text-sm ms-1'>/day</span></p>
                                            <div className="flex justify-end">
                                                <Link to="/" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-xs px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Details <IoArrowForward className='ms-2'/></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col items-center">
                                <img src={emptyBooking2} alt="Empty state" className="w-40"/>
                                <p className="mt-5 text-center leading-5">Your booking history is empty</p>
                            </div> */}
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl ring ring-inset ring-[#585858]/10 shrink-0 w-75 h-fit hover:shadow-xl transition duration-300">
                        <p className="mx-2 flex items-center justify-between">Payment History <GoHistory /></p>
                        <hr className="text-[#585858]/10 border-t-2 my-5" />
                        <div className="flex flex-col gap-5">
                            <div className="">
                                <div className="flex justify-between">
                                    <p>Porsche 911</p>
                                    <p className="font-medium">$515,00</p>
                                </div>
                                <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                    <p>Mar 18, 2026</p>
                                    <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full">PAID</p>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between">
                                    <p>Porsche 911</p>
                                    <p className="font-medium">$515,00</p>
                                </div>
                                <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                    <p>Mar 18, 2026</p>
                                    <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full">PAID</p>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between">
                                    <p>Porsche 911</p>
                                    <p className="font-medium">$515,00</p>
                                </div>
                                <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                    <p>Mar 18, 2026</p>
                                    <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full">PAID</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex flex-col items-center">
                            <img src={emptyPayment} alt="Empty state" className="w-40"/>
                            <p className="mt-5 w-50 text-center leading-5">Your payment history is empty</p>
                        </div> */}
                        <hr className="text-[#585858]/10 border-t-2 my-5" />
                        <button className="w-full hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg">Download all invoices <GoDownload /></button>
                    </div>
                </div>
                :
                <div className="">
                    <div className="flex gap-4">
                        <div className="w-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ring-1 ring-[#222222]/20 p-5 rounded-xl ring-inset">
                            <CiWallet className="text-blue-600 text-5xl bg-blue-200 p-3 rounded-lg" />
                            <p className="mt-3 text-sm font-light text-[#585858]">Total Income</p>
                            <p className="text-2xl mt-1">Rp 12.580.000</p>
                        </div>
                        <div className="w-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ring-1 ring-[#222222]/20 p-5 rounded-xl ring-inset">
                            <IoCarSportOutline className="text-orange-500 text-5xl bg-orange-200 p-3 rounded-lg" /> 
                            <p className="mt-3 text-sm font-light text-[#585858]">Active Rental</p>
                            <p className="text-2xl mt-1">46</p>
                        </div>
                        <div className="w-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ring-1 ring-[#222222]/20 p-5 rounded-xl ring-inset">
                            <GoShield className="text-red-500 text-5xl bg-red-200 p-3 rounded-lg" /> 
                            <p className="mt-3 text-sm font-light text-[#585858]">Pending Verification</p>
                            <p className="text-2xl mt-1">29</p>
                        </div>
                        <div className="w-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ring-1 ring-[#222222]/20 p-5 rounded-xl ring-inset">
                            <FiUsers className="text-purple-500 text-5xl bg-purple-200 p-3 rounded-lg" /> 
                            <p className="mt-3 text-sm font-light text-[#585858]">New Customer</p>
                            <p className="text-2xl mt-1">156</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}