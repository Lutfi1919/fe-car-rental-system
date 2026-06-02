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
import { getUserBookings } from "../services/booking.service";
import { getUserPayments } from "../services/payment.service";
import { getProfile, updateUser } from "../services/user.service";
import { downloadUserPayments } from "../services/report.service";

export default function Profile() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [vehicle, setVehicle] = useState({});
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
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
        try {
            const result = await getProfile();

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

    async function getPayments() {
        try {
            const result = await getUserPayments();

            console.log(result)

            setPayments(result.data.slice(0,3));
        } catch (error) {
            console.error(error.message);
        }
    }

    
    async function getBookings() {
        try {
            const result = await getUserBookings();

            console.log(result)

            setBookings(result.data);
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
            const result = await updateUser(profile.id, form);

            setProfile(result.data);

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }

    async function handleDownload() {
        try {
            const response = await downloadUserPayments();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "user-payment-history.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
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
        getPayments();
        getBookings();

    }, [])

    return (
        <>
            <div className="mb-7" data-aos="fade-in">
                <p className="text-6xl tracking-tight font-medium">Account Settings</p>
                <p className="text-[#585858] mt-2">Manage your account and car rental preferences</p>
            </div>
            <div className="flex gap-5 mb-5" data-aos="fade-in">
                <div className="">
                    <div className="p-6 rounded-2xl ring ring-[#585858]/10 ring-inset h-fit hover:shadow-xl transition duration-300">
                        <p className="flex items-center gap-3 mb-8 text-2xl"><PiIdentificationCardLight className="text-2xl"/> Personal Information</p>
                        <div className="text-[15px]">
                            <form onSubmit={handleUpdate}>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="">
                                        <label className="block text-[#222222] text-sm mb-2" htmlFor="name">Full Name</label>
                                        <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="name" type="text" placeholder="Luthfi Ahmad" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                                    </div>  
                                    <div className="">
                                        <label className="block text-[#222222] text-sm mb-2" htmlFor="email">Email Address</label>
                                        <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="email" type="email" placeholder="adew19@email.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                                    </div>
                                    <div className="mb-5 col-span-2">
                                        <label className="block text-[#222222] text-sm mb-2" htmlFor="phone_num">Phone Number</label>
                                        <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="phone_num" type="text" placeholder="0878-7522-1858" value={form.phoneNum} onChange={(e) => setForm({...form, phoneNum: e.target.value})} />
                                    </div>  
                                </div>
                                <button className={`text-sm py-2 px-4 rounded-full transition-all duration-150 ${isChanged ? "bg-[#222222] text-white hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] hover:bg-transparent cursor-pointer" : "bg-[#222222]/50 text-white cursor-not-allowed"}`} disabled={!isChanged}>Edit information</button>
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
                            {
                                bookings.length > 0 ? bookings.slice(0, 2).map((booking) => {
                                    const bookingItem = booking.Booking_items?.[0];
                                    const vehicle = bookingItem?.Vehicle;

                                    return (
                                        <div className="flex flex-col w-80 overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
                                            <img src={vehicle.image} alt="booked vehicle" className='h-55 object-cover' />
                                            <div className="p-5 text-[#222222]">
                                                <p className="text-xl">{vehicle.name}</p>
                                                <p className="font-light text-sm flex items-center gap-2 text-[#585858]"><IoCalendarOutline />
                                                    {new Date(bookingItem.start_date).toLocaleDateString('id-ID',{day: "numeric", month: "long", year: "numeric"})}
                                                    <span> - </span> 
                                                    {new Date(bookingItem.end_date).toLocaleDateString('id-ID',{day: "numeric", month: "long", year: "numeric"})}
                                                </p>
                                                <div className="flex items-center justify-between mt-10">
                                                    <p className='font-bold text-lg'><span className='text-[#85BB65]'>Rp {vehicle.price_per_day.toLocaleString('id-ID')}</span><span className='font-light text-sm ms-1'>/day</span></p>
                                                    <div className="flex justify-end">
                                                        <Link to={`bookings/${booking.id}/booking_detail`} className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-xs px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Details <IoArrowForward className='ms-2'/></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="flex flex-col items-center">
                                        <img src={emptyBooking2} alt="Empty state" className="w-40"/>
                                        <p className="mt-5 text-center leading-5">Your booking history is empty</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-2xl ring ring-inset ring-[#585858]/10 shrink-0 w-75 h-fit hover:shadow-xl transition duration-300">
                    <Link to="/profile/payment_history" className="mx-2 flex items-center justify-between hover:underline">Payment History <GoHistory /></Link>
                    <hr className="text-[#585858]/10 border-t-2 my-5" />
                    <div className="flex flex-col gap-5">
                        {
                            payments.map((item, index) => {
                                const booking = item.Booking;
                                const bookingItem = booking?.Booking_items?.[0];
                                const vehicle = bookingItem?.Vehicle;

                                return (
                                    <div key={item.payment_id}>
                                        <div className="flex justify-between">
                                            <p>{vehicle?.name || "Vehicle"}</p>
                                            <p className="font-semibold">Rp {Number(item.amount).toLocaleString("id-ID")}</p>
                                        </div>

                                        <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                            <p>{new Date(item.createdAt).toLocaleDateString("id-ID", {day: "numeric", month: "short", year: "numeric"})}</p>

                                            <div className="flex gap-1">
                                                {
                                                    item.status == "pending" && (
                                                        <p className="bg-amber-400/20 text-amber-600 px-3 py-1 rounded-full uppercase">{item.status}</p>
                                                    ) 
                                                }
                                                {
                                                    item.status == "paid" && (
                                                        <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full uppercase">{item.status}</p>
                                                    ) 
                                                }
                                                {
                                                    item.status == "failed" && (
                                                        <p className="bg-red-400/20 text-red-600 px-3 py-1 rounded-full uppercase">{item.status}</p>
                                                    ) 
                                                }
                                            </div>
                                        </div>

                                        {
                                            index !== payments.length - 1 && (<hr className="text-[#585858]/10 border-t-2 mt-5" />)
                                        }

                                    </div>
                                );
                            })
                        }
                    </div>
                    {
                        payments.length === 0 && (
                            <div className="flex flex-col items-center">
                                <img src={emptyPayment} alt="Empty state" className="w-40"/>
                                <p className="mt-5 w-50 text-center leading-5">Your payment history is empty</p>
                            </div>
                        )
                    }
                    <hr className="text-[#585858]/10 border-t-2 my-5" />
                    <button onClick={handleDownload} className="w-full hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg">Download all invoices <GoDownload /></button>
                </div>
            </div>
        </>
    )
}