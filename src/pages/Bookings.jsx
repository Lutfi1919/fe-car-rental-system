import { useEffect } from "react";
import { GoDownload, GoHistory } from "react-icons/go";
import AOS from 'aos';
import 'aos/dist/aos.css';
import orangeCar from '../assets/orangecar.jpg';
import { IoArrowForward, IoCalendarOutline } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function Bookings() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
            easing: "ease-in-out"
        })
    })

    return (
        <>
            <div className="" data-aos="fade-in">
                <div className="flex items-center justify-between">
                    <div className="">
                        <p className="text-5xl font-medium tracking-tight">My Bookings.</p>
                        <p className="text-[#585858] mt-2">You have 19 total bookings in your history</p>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                        <p className="bg-[#222222] text-white px-6 py-1.5 rounded-full cursor-pointer">All</p>
                        <p className="ring ring-inset ring-[#222222] px-6 py-1.5 rounded-full cursor-pointer hover:bg-[#222222] hover:text-white transition duration-300">Active</p>
                        <p className="ring ring-inset ring-[#222222] px-6 py-1.5 rounded-full cursor-pointer hover:bg-[#222222] hover:text-white transition duration-300">Upcoming</p>
                        <p className="ring ring-inset ring-[#222222] px-6 py-1.5 rounded-full cursor-pointer hover:bg-[#222222] hover:text-white transition duration-300">Past</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-7">
                    <div className="rounded-2xl ring ring-[#585858]/10 ring-inset p-5 flex hover:shadow-lg transition duration-300">
                        <img src={orangeCar} alt="car booking" className="w-70 rounded-2xl shadow object-cover"/>
                        <div className="px-5 flex-1">
                            <div className="flex justify-between flex-1">
                                <div className="">
                                    <p className="text-xs w-fit bg-green-400/20 text-green-600 px-3 py-1 rounded-full font-light mb-1">In Progress</p>
                                    <p className="text-2xl font-medium">Ferrari SF90 Stradale</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#585858]">Booking ID</p>
                                    <p className="text-sm text-[#222222]">#BID-00001</p>
                                </div>
                            </div>
                            <hr className="my-3 border-[#585858]/10"/>
                            <div className="flex justify-around gap-5">
                                <div className="flex items-center">
                                    <IoCalendarOutline className="text-[#222222] text-xl me-2" />
                                    <div className="">
                                        <p className="text-xs text-[#585858]">Rental Period</p>
                                        <p className="text-[#222222]">Apr 28 - May 01, 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <LiaMoneyBillWaveSolid className="text-[#222222] text-xl me-2" />
                                    <div className="">
                                        <p className="text-xs text-[#585858]">Total Price</p>
                                        <p className="text-[#222222]">$1,200.00</p>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 border-[#585858]/10"/>
                            <div className="flex justify-end">
                                <Link to="/" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Details <IoArrowForward className='ms-2'/></Link>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl ring ring-[#585858]/10 ring-inset p-5 flex hover:shadow-lg transition duration-300">
                        <img src="https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg" alt="car booking" className="w-70 rounded-2xl shadow object-cover"/>
                        <div className="px-5 flex-1">
                            <div className="flex justify-between flex-1">
                                <div className="">
                                    <p className="text-xs w-fit bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-light mb-1">Confirmed</p>
                                    <p className="text-2xl font-medium">Mercedes Benz AMG</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#585858]">Booking ID</p>
                                    <p className="text-sm text-[#222222]">#BID-00002</p>
                                </div>
                            </div>
                            <hr className="my-3 border-[#585858]/10"/>
                            <div className="flex justify-around gap-5">
                                <div className="flex items-center">
                                    <IoCalendarOutline className="text-[#222222] text-xl me-2" />
                                    <div className="">
                                        <p className="text-xs text-[#585858]">Rental Period</p>
                                        <p className="text-[#222222]">Apr 19 - Apr 22, 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <LiaMoneyBillWaveSolid className="text-[#222222] text-xl me-2" />
                                    <div className="">
                                        <p className="text-xs text-[#585858]">Total Price</p>
                                        <p className="text-[#222222]">$2,100.00</p>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 border-[#585858]/10"/>
                            <div className="flex justify-end">
                                <Link to="/profile/booking_detail" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Details <IoArrowForward className='ms-2'/></Link>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl ring ring-[#585858]/10 ring-inset p-5 flex hover:shadow-lg transition duration-300">
                        <img src="https://cdn.pixabay.com/photo/2021/02/13/14/58/lamborghini-6011781_1280.jpg" alt="car booking" className="grayscale w-70 rounded-2xl shadow object-cover"/>
                        <div className="px-5 flex-1">
                            <div className="flex justify-between flex-1">
                                <div className="">
                                    <p className="text-xs w-fit bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-light mb-1">Completed</p>
                                    <p className="text-2xl font-medium text-[#222222]/80">Lamborghini Aventador</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#585858]">Booking ID</p>
                                    <p className="text-sm text-[#222222]/40">#BID-00003</p>
                                </div>
                            </div>
                            <hr className="my-3 border-[#585858]/10"/>
                            <div className="flex justify-around gap-5 line-through">
                                <div className="flex items-center">
                                    <IoCalendarOutline className="text-[#222222]/40 text-xl me-2" />
                                    <div className="">
                                        <p className="text-xs text-[#585858]/60">Rental Period</p>
                                        <p className="text-[#222222]/40">Feb 08 - Feb 13, 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <LiaMoneyBillWaveSolid className="text-[#222222]/40 text-xl me-2" />
                                    <div className="">
                                        <p className="text-xs text-[#585858]/60">Total Price</p>
                                        <p className="text-[#222222]/40">$2,340.00</p>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 border-[#585858]/10"/>
                            <div className="flex justify-end">
                                <Link to="/" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Details <IoArrowForward className='ms-2'/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}