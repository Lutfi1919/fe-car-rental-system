import { FaCircleCheck, FaCircleHalfStroke, FaCircleInfo, FaCircleMinus } from "react-icons/fa6"
import { IoCalendarOutline, IoChevronForward } from "react-icons/io5"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbManualGearbox } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { PiGasPumpLight } from "react-icons/pi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { getUserBookings, showBooking, changeBookingStatus } from "../services/booking.service"
import { ModalAdditionalPayment } from "../components/ModalAdditionalPayment";

export default function UserBookingDetail() {
    const { id } = useParams();
    const [booking, setBooking] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    async function getUserBooking() {
        try {
            const result = await showBooking(id);

            console.log(result);
            
            setBooking(result.data);

        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    }

    const bookingItem = booking.Booking_items?.[0];
    const returnBooking = booking.Return;
    const vehicle = bookingItem?.Vehicle;
    const bookingPackage = booking?.Booking_package;

    const start = new Date(bookingItem?.start_date);
    const end = new Date(bookingItem?.end_date);

    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const rawPrice = vehicle?.price_per_day * days;
    const packagePrice = booking?.total_price - rawPrice;

    const additionalCost = returnBooking?.late_fee + returnBooking?.damage_fee;
    const additionalPayment = booking?.Payments?.find(
        payment =>
            payment.payment_type === "additional_fee" &&
            payment.status !== "failed"
    );

    async function handleCancel() {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) return;

        try {
            await changeBookingStatus(booking.id, "canceled");

            alert("Booking cancelled");

            getUserBooking();

        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getUserBooking();
    }, [])

    return (
        <>
            <div className="rounded-2xl py-7 px-6 ring ring-[#585858]/20 ring-inset  transition duration-300 hover:shadow-md flex justify-between items-center" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in">
                <div className="">
                    <p className="mb-3 text-3xl font-medium">Booking <span className="capitalize">{booking.status?.replace("_", " ")}</span></p>
                    <p className="text-sm"><span className="text-[#585858] font-light">Booking ID: </span>{booking.booking_code}</p>
                </div>
                <div className="flex items-center gap-3">
                    {
                        booking.payment_status == "unpaid" && (
                            <p className="text-sm py-2 px-5 bg-gray-100 text-gray-600 rounded-full flex items-center gap-2"><FaCircleMinus />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                        )
                    }
                    {
                        booking.payment_status == "partial" && (
                            <p className="text-sm py-2 px-5 bg-amber-100 text-amber-600 rounded-full flex items-center gap-2"><FaCircleHalfStroke />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                        )
                    }
                    {
                        booking.payment_status == "paid" && (
                            <p className="text-sm py-2 px-5 bg-green-100 text-green-600 rounded-full flex items-center gap-2"><FaCircleCheck />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                        )
                    }
                    {
                        booking.payment_status == "refunded" && (
                            <p className="text-sm py-2 px-5 bg-red-100 text-red-600 rounded-full flex items-center gap-2"><FaCircleInfo />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                        )
                    }
                    <p className="text-sm py-2 px-5 bg-blue-100 text-blue-600 rounded-full flex items-center gap-2 capitalize"><IoCalendarOutline />{booking.status?.replace("_", " ")}</p>
                </div>
            </div>
            <div className="mt-5 flex gap-5 pb-10" data-aos="fade-in">
                <div className="w-165 shrink-0">
                    <div className="flex flex-col rounded-2xl ring ring-[#585858]/20 hover:shadow-lg transition duration-300">
                        <img src={vehicle?.image} alt="vehicle image" className="object-cover shadow rounded-t-2xl h-100"/>
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div className="">
                                    <p className="text-2xl font-medium">{vehicle?.name}</p>
                                    <p className="font-light text-sm capitalize">{vehicle?.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-medium text-[#85BB65]">Rp {vehicle?.price_per_day.toLocaleString('id-ID')}</p>
                                    <p className="font-light text-sm">PER DAY</p>
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 mt-6">
                                <div className="flex flex-col items-center gap-2 hover:bg-transparent ring ring-inset ring-[#222222] hover:text-[#222222] transition duration-300 bg-[#222222] text-white w-100 py-4 rounded-xl">
                                    <TbManualGearbox className="text-xl"/>
                                    <p className="capitalize text-lg">{vehicle?.transmission}</p>
                                    <p className="text-sm capitalize font-extralight">Transmission</p>
                                </div>
                                <div className="flex flex-col items-center gap-2 hover:bg-transparent ring ring-inset ring-[#222222] hover:text-[#222222] transition duration-300 bg-[#222222] text-white w-100 py-4 rounded-xl">
                                    <GoPeople className="text-xl"/>
                                    <p className="capitalize text-lg">{vehicle?.passengers} Seats</p>
                                    <p className="text-sm capitalize font-extralight">Passengers</p>
                                </div>
                                <div className="flex flex-col items-center gap-2 hover:bg-transparent ring ring-inset ring-[#222222] hover:text-[#222222] transition duration-300 bg-[#222222] text-white w-100 py-4 rounded-xl">
                                    <PiGasPumpLight className="text-xl"/>
                                    <p className="capitalize text-lg">{vehicle?.fuel_type?.replace("_", " ")}</p>
                                    <p className="text-sm capitalize font-extralight">Gasoline</p>
                                </div>
                            </div>
                            <p className="mt-5 font-light text-sm">Description:</p>
                            <p className="">{vehicle?.description}</p>
                        </div>
                    </div>
                    <div className="mt-5 p-6 rounded-2xl ring ring-[#585858]/20 hover:shadow-lg transition duration-300">
                        <p className="text-2xl">Booking Period</p>
                        <div className="mt-8 flex items-center justify-between mx-5">
                            <div className="flex gap-5">
                                <FaRegCalendarAlt className="text-5xl bg-gray-200 p-3 rounded-full"/>
                                <div className="">
                                    <p className="font-light">Start Date</p>
                                    <p className="text-3xl">{new Date(bookingItem?.start_date).toLocaleDateString('id-ID', {day: "numeric", month: "long", year: "numeric"})}</p>
                                </div>
                            </div>
                            <IoChevronForward className="text-3xl"/> 
                            <div className="flex gap-5">
                                <LuCalendarCheck2 className="text-5xl bg-gray-200 p-3 rounded-full"/>
                                <div className="">
                                    <p className="font-light">End Date</p>
                                    <p className="text-3xl">{new Date(bookingItem?.end_date).toLocaleDateString('id-ID', {day: "numeric", month: "long", year: "numeric"})}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit p-6 rounded-2xl ring ring-[#585858]/20 hover:shadow-lg transition duration-300">
                    <p className="text-2xl">Cost Breakdown</p>
                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    <div className="flex text-[#585858] font-light justify-between">
                        <p>Rental ({days} days x Rp {vehicle?.price_per_day?.toLocaleString("id-ID")})</p>
                        <p>Rp {rawPrice?.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="mt-4 flex text-[#585858] font-light justify-between">
                        <p className="">{bookingPackage?.name} Package</p>
                        <p>Rp {packagePrice?.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="mt-4 flex text-[#585858] font-light justify-between">
                        <p className="">Dp Refund Allowed</p>
                        <p>{bookingPackage?.can_refund_dp ? "Yes" : "No"}</p>
                    </div>
                    <div className="mt-4 flex text-[#585858] font-light justify-between">
                        <p className="">Total Price</p>
                        <p>Rp {booking?.total_price?.toLocaleString("id-ID")}</p>
                    </div>
                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    <div className="flex justify-between">
                        <div className="">
                            <p className="text-sm">TOTAL PAID</p>
                            <p className="text-2xl font-medium">Rp {booking?.paid_amount?.toLocaleString("id-ID")}</p>
                        </div>
                        {
                            booking.payment_status == "unpaid" && (
                                <p className="text-sm py-2 px-5 bg-gray-100 text-gray-600 rounded-full flex items-center gap-2"><FaCircleMinus />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                            )
                        }
                        {
                            booking.payment_status == "partial" && (
                                <p className="text-sm py-2 px-5 bg-amber-100 text-amber-600 rounded-full flex items-center gap-2"><FaCircleHalfStroke />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                            )
                        }
                        {
                            booking.payment_status == "paid" && (
                                <p className="text-sm py-2 px-5 bg-green-100 text-green-600 rounded-full flex items-center gap-2"><FaCircleCheck />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                            )
                        }
                        {
                            booking.payment_status == "refunded" && (
                                <p className="text-sm py-2 px-5 bg-red-100 text-red-600 rounded-full flex items-center gap-2"><FaCircleInfo />Payment<span className="capitalize -ms-1">{booking.payment_status}</span></p>
                            )
                        }
                    </div>
                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    <p className="text-xl">Return Breakdown</p>
                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    <div className="mt-4 flex text-[#585858] font-light justify-between">
                        <p className="">Returned At</p>
                        <p>{new Date(returnBooking?.returned_at).toLocaleDateString('id-ID', {day: "numeric", month: "long", year: "numeric"})}</p>
                    </div>
                    <div className="mt-4 flex text-[#585858] font-light justify-between">
                        <p className="">Late Fee</p>
                        <p>{returnBooking?.late_fee?.toLocaleString('id-ID') ? `Rp ${returnBooking?.late_fee?.toLocaleString('id-ID')}` : "-"}</p>
                    </div>
                    <div className="mt-4 flex text-[#585858] font-light justify-between">
                        <p className="">Damage Fee</p>
                        <p>{returnBooking?.damage_fee?.toLocaleString('id-ID') ? `Rp ${returnBooking?.damage_fee?.toLocaleString('id-ID')}` : "-"}</p>
                    </div>
                    <div className="mt-4 flex flex-col text-[#585858] font-light justify-between">
                        <p className="">Notes:</p>
                        <p>{returnBooking?.notes ? returnBooking?.notes : "-"}</p>
                    </div>
                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    <div className="flex justify-between">
                        <div className="">
                            <p className="text-sm">TOTAL ADDITIONAL COST</p>
                            <p className="text-2xl font-medium">Rp {additionalCost ? additionalCost?.toLocaleString('id-ID') : "-"}</p>
                        </div>
                        {
                            additionalPayment?.status === "pending" && (
                                <p className="text-sm py-2 px-5 bg-amber-100 text-amber-600 flex items-center rounded-full">
                                    Pending
                                </p>
                            )
                        }

                        {
                            additionalPayment?.status === "paid" && (
                                <p className="text-sm py-2 px-5 bg-green-100 text-green-600 flex items-center rounded-full gap-2">
                                    <FaCircleCheck />
                                    Paid
                                </p>
                            )
                        }

                        {
                            additionalPayment?.status === "failed" && (
                                <p className="text-sm py-2 px-5 bg-red-100 text-red-600 flex items-center rounded-full">
                                    Failed
                                </p>
                            )
                        }
                    </div>
                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    {
                        booking?.status === "completed" && additionalCost > 0 && !additionalPayment && (
                            <button onClick={() => {setSelectedBookingId(booking.id); setOpenModal(true);}} className="w-full py-3 rounded-xl bg-[#222222] text-white hover:bg-transparent hover:text-[#222222] ring ring-[#222222] transition">
                                Pay Additional Fee
                            </button>
                        )
                    }
                    {
                        booking.status === 'pending' || booking.status === 'confirmed' ? (
                            <button onClick={handleCancel} className="w-full py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">
                                Cancel Booking
                            </button>
                        ) : ("")
                    }
                    <ModalAdditionalPayment
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        bookingId={selectedBookingId}
                        getPayments={getUserBooking}
                    />
                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    <p className="text-center mt-5 italic" style={{fontFamily: "Anton"}}>InstaDrive.</p>
                </div>
            </div>
        </>
    )
}