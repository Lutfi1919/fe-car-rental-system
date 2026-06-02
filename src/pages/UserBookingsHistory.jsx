import { useEffect, useState } from "react";
import { GoDownload, GoHistory } from "react-icons/go";
import AOS from 'aos';
import 'aos/dist/aos.css';
import orangeCar from '../assets/orangecar.jpg';
import { IoArrowForward, IoCalendarOutline } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { getUserBookings as getUserBookingsHistory } from "../services/booking.service";

export default function UserBookingsHistory() {
    const [bookings, setBookings] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");

    async function getUserBookings() {
        try {
            const result = await getUserBookingsHistory();

            setBookings(result.data);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
            easing: "ease-in-out"
        });

        getUserBookings();
    }, [])

    const filteredBookings = bookings.filter((booking) => {
        const bookingItem = booking.Booking_items?.[0];
        const today = new Date();
        
        const startDate = bookingItem?.start_date ? new Date(bookingItem.start_date) : null;
        const endDate = bookingItem?.end_date ? new Date(bookingItem.end_date) : null;

        if (activeFilter === "active") {
            return booking.status === "on_rent";
        }
        if (activeFilter === "upcoming") {
            return startDate && startDate > today;
        }
        if (activeFilter === "past") {
            return endDate && endDate < today;
        }
        
        return true;
    });

    const totalBookings = filteredBookings.length;

    return (
        <>
            <div className="" data-aos="fade-in">
                <div className="flex items-center justify-between">
                    <div className="">
                        <p className="text-5xl font-medium tracking-tight">My Bookings.</p>
                        <p className="text-[#585858] mt-2">You have {totalBookings} total bookings in your history</p>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                        <button onClick={() => setActiveFilter("all")} className={`${activeFilter === "all" ? "bg-[#222222] text-white" : "ring ring-inset ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white"} px-6 py-1.5 rounded-full cursor-pointer transition duration-300`}>All</button>
                        <button onClick={() => setActiveFilter("active")} className={`${activeFilter === "active" ? "bg-[#222222] text-white" : "ring ring-inset ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white"} px-6 py-1.5 rounded-full cursor-pointer transition duration-300`}>Active</button>
                        <button onClick={() => setActiveFilter("upcoming")} className={`${activeFilter === "upcoming" ? "bg-[#222222] text-white" : "ring ring-inset ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white"} px-6 py-1.5 rounded-full cursor-pointer transition duration-300`}>Upcoming</button>
                        <button onClick={() => setActiveFilter("past")} className={`${activeFilter === "past" ? "bg-[#222222] text-white" : "ring ring-inset ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white"} px-6 py-1.5 rounded-full cursor-pointer transition duration-300`}>Past</button>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-7">
                    {
                        filteredBookings.length > 0 ? filteredBookings.map((booking) => {
                            const bookingItem = booking.Booking_items?.[0];
                            const vehicle = bookingItem?.Vehicle;

                            return (
                                <div className="group rounded-2xl ring ring-[#585858]/10 ring-inset p-5 flex hover:shadow-lg transition duration-300">
                                    <div className="overflow-hidden rounded-2xl shadow-lg">
                                        <img src={vehicle.image} alt="car booking" className="w-70 h-45 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"/>

                                    </div>
                                    <div className="px-5 flex-1">
                                        <div className="flex justify-between flex-1">
                                            <div className="">
                                                {
                                                    booking.status == "confirmed" && (
                                                        <p className="text-xs w-fit bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-light mb-1 capitalize">{booking.status.replace("_", " ")}</p>
                                                    )
                                                }
                                                {
                                                    booking.status == "on_rent" && (
                                                        <p className="text-xs w-fit bg-green-400/20 text-green-600 px-3 py-1 rounded-full font-light mb-1 capitalize">{booking.status.replace("_", " ")}</p>
                                                    )
                                                }
                                                {
                                                    booking.status == "completed" && (
                                                        <p className="text-xs w-fit bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-light mb-1 capitalize">{booking.status.replace("_", " ")}</p>
                                                    )
                                                }
                                                {
                                                    booking.status == "pending" && (
                                                        <p className="text-xs w-fit bg-amber-200 text-amber-600 px-3 py-1 rounded-full font-light mb-1 capitalize">{booking.status.replace("_", " ")}</p>
                                                    )
                                                }
                                                {
                                                    booking.status == "canceled" && (
                                                        <p className="text-xs w-fit bg-red-200 text-red-600 px-3 py-1 rounded-full font-light mb-1 capitalize">{booking.status.replace("_", " ")}</p>
                                                    )
                                                }
                                                {
                                                    booking.status == "completed" ? (
                                                        <p className="text-2xl font-medium text-[#222222]/80">{vehicle.name}</p>
                                                    ) : (
                                                        <p className="text-2xl font-medium">{vehicle.name}</p>
                                                    )
                                                }
                                                
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[#585858]">Booking ID</p>
                                                {
                                                    booking.status == "completed" ? (
                                                        <p className="text-sm text-[#222222]/40">#{booking.booking_code}</p>
                                                    ) : (
                                                        <p className="text-sm text-[#222222]">#{booking.booking_code}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <hr className="my-3 border-[#585858]/10"/>
                                        {
                                            booking.status == "completed" ? (
                                                <div className="flex justify-around gap-5">
                                                    <div className="flex items-center line-through">
                                                        <IoCalendarOutline className="text-[#222222]/40 text-xl me-2" />
                                                        <div className="">
                                                            <p className="text-xs text-[#585858]/60">Rental Period</p>
                                                            <p className="text-[#222222]/40">{new Date(bookingItem.start_date).toLocaleDateString('id-ID',{day: "numeric", month: "long"})} - {new Date(bookingItem.end_date).toLocaleDateString('id-ID',{day: "numeric", month: "long", year: "numeric"})}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center line-through">
                                                        <LiaMoneyBillWaveSolid className="text-[#222222]/40 text-xl me-2" />
                                                        <div className="">
                                                            <p className="text-xs text-[#585858]/60">Total Price</p>
                                                            <p className="text-[#222222]/40">Rp {booking.total_price.toLocaleString('id-ID')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-around gap-5">
                                                    <div className="flex items-center">
                                                        <IoCalendarOutline className="text-[#222222] text-xl me-2" />
                                                        <div className="">
                                                            <p className="text-xs text-[#585858]">Rental Period</p>
                                                            <p className="text-[#222222]">{new Date(bookingItem.start_date).toLocaleDateString('id-ID',{day: "numeric", month: "long"})} - {new Date(bookingItem.end_date).toLocaleDateString('id-ID',{day: "numeric", month: "long", year: "numeric"})}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <LiaMoneyBillWaveSolid className="text-[#222222] text-xl me-2" />
                                                        <div className="">
                                                            <p className="text-xs text-[#585858]">Total Price</p>
                                                            <p className="text-[#222222]">Rp {booking.total_price.toLocaleString('id-ID')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <hr className="my-3 border-[#585858]/10"/>
                                        <div className="flex justify-end">
                                            <Link to={`${booking.id}/booking_detail`} className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Details <IoArrowForward className='ms-2'/></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : (<p className="text-center text-gray-400 py-40">No booking history</p>)
                    }
                </div>
            </div>
        </>
    )
}