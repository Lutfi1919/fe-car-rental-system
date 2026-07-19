import { FaCircleCheck, FaCircleHalfStroke, FaCircleInfo, FaCircleMinus } from "react-icons/fa6"
import { IoCalendarOutline, IoChevronForward } from "react-icons/io5"
import { showBooking } from "../services/booking.service"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbManualGearbox } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { PiGasPumpLight } from "react-icons/pi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { createReturn } from "../services/return.service";

export default function DashBookingDetail() {
    const { id } = useParams();
    const [booking, setBooking] = useState([]);
    const [returnForm, setReturnForm] = useState({
        returned_at: new Date().toISOString().split("T")[0],
        late_fee: 0,
        damage_fee: 0,
        notes: ""
    });

    async function getBookingDetail() {
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

    const currentAdditionalCost = Number(returnForm.late_fee || 0) + Number(returnForm.damage_fee || 0);

    function handleReturnChange(e) {
        setReturnForm({
            ...returnForm,
            [e.target.name]: e.target.value
        });
    }

    async function handleCreateReturn(e) {
        e.preventDefault();

        try {
            await createReturn({
                booking_id: booking.id,
                returned_at: returnForm.returned_at,
                late_fee: Number(returnForm.late_fee),
                damage_fee: Number(returnForm.damage_fee),
                notes: returnForm.notes
            });

            alert("Return created successfully");

            getBookingDetail();
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getBookingDetail();
    }, [])

    return (
        <>
            <div className="rounded-2xl py-7 px-6 ring ring-[#585858]/20 ring-inset hover:shadow-md transition duration-300 flex justify-between items-center" style={{fontFamily: "Stack Sans Headline"}}>
                <div className="">
                    <p className="mb-3 text-3xl font-medium">Booking <span className="capitalize">{booking.status?.replace("_", " ")}</span></p>
                    <p className="text-sm"><span className="text-[#585858] font-light">Booking ID: </span>{booking.booking_code}</p>
                    <p className="mt-3">Booked By:</p>
                    <div className="flex mt-2 p-3 rounded-2xl ring ring-inset ring-[#222222]/20 items-center gap-3">
                        <img src={booking?.User?.profile_image} alt={booking?.User?.name} className="w-10 h-10 shadow rounded-full object-cover"/>
                        <div>
                            <p className="capitalize">{booking?.User?.name}</p>
                            <p className="text-xs text-[#585858]">{booking?.User?.email}</p>
                        </div>
                    </div>
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
            <div className="mt-5 flex gap-5 pb-10">
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
                    {
                        booking.status !== "completed" ? (
                            <form onSubmit={handleCreateReturn}>
                                <p className="text-xl">Return Form</p>
                                <hr className="text-[#585858]/10 border-t-2 my-4" />
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm mb-1">Returned At</label>
                                        <input type="date"  name="returned_at" value={returnForm.returned_at} onChange={handleReturnChange} className="w-full p-3 rounded-xl ring ring-inset ring-[#222222]/20 focus:outline-none focus:ring-3" required/>
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Late Fee</label>
                                        <input type="number" name="late_fee" min="0" value={returnForm.late_fee} onChange={handleReturnChange} placeholder="0" className="w-full p-3 rounded-xl ring ring-inset ring-[#222222]/20 focus:outline-none focus:ring-3"/>
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Damage Fee</label>
                                        <input type="number" name="damage_fee" min="0" value={returnForm.damage_fee} onChange={handleReturnChange} placeholder="0" className="w-full p-3 rounded-xl ring ring-inset ring-[#222222]/20 focus:outline-none focus:ring-3"/>
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Notes</label>
                                        <textarea rows={4} name="notes" value={returnForm.notes} onChange={handleReturnChange} placeholder="Vehicle condition, scratches, etc..." className="w-full p-3 rounded-xl ring ring-inset ring-[#222222]/20 focus:outline-none focus:ring-3 resize-none"/>
                                    </div>

                                </div>
                                
                                <hr className="text-[#585858]/10 border-t-2 my-4" />
                                <p className="text-sm">TOTAL ADDITIONAL COST</p>
                                <p className="text-2xl font-medium">Rp {currentAdditionalCost.toLocaleString("id-ID")}</p>
                                <button type="submit" className="p-3 bg-[#222222] text-white hover:ring hover:ring-inset hover:ring-[#222222] hover:bg-transparent hover:text-[#222222] transition duration-300 w-full rounded-xl mt-6">Submit form</button>
                            </form>
                        ) : (
                            <div>
                                <p className="text-xl">Return Information</p>
                                <hr className="text-[#585858]/10 border-t-2 my-4" />
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span>Returned At</span>
                                        <span>{new Date(returnBooking?.returned_at).toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"})}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Late Fee</span>
                                        <span>Rp {returnBooking?.late_fee?.toLocaleString("id-ID")}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Damage Fee</span>
                                        <span>Rp {returnBooking?.damage_fee?.toLocaleString("id-ID")}</span>
                                    </div>

                                    <div>
                                        <p className="font-medium mb-1">Notes</p>
                                        <p className="text-[#585858]">{returnBooking?.notes ? returnBooking?.notes : "-"}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <hr className="text-[#585858]/10 border-t-2 my-4" />
                    <p className="text-center mt-5 italic" style={{fontFamily: "Anton"}}>InstaDrive.</p>
                </div>
            </div>
        </>
    )
}