import { IoCarSportOutline } from 'react-icons/io5'
import fotoCus from '../assets/dev ganteng.jpeg'
import { useEffect, useState } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { changeBookingStatus, getBookings as getAllBookings } from '../services/booking.service';
import { Link } from 'react-router-dom';
import { ModalBooking } from '../components/ModalBooking';

export default function DashBookings() {
    const [bookings, setBookings] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    async function getBookings() {
        try {
            const result = await getAllBookings();

            setBookings(result.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    function getStatusStyle(status) {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-600 ring-green-600";

            case "on_rent":
                return "bg-blue-100 text-blue-600 ring-blue-600";

            case "completed":
                return "bg-slate-100 text-slate-600 ring-slate-600";

            case "canceled":
                return "bg-red-100 text-red-600 ring-red-600";

            default:
                return "bg-amber-100 text-amber-600 ring-amber-600";
        }
    }

    useEffect(() => {
        getBookings();
    }, [])

    return (
        <div className="" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in">
            <div className="mb-7">
                <p className="text-6xl tracking-tight font-medium">Bookings Management</p>
                <p className="text-[#585858] mt-2">Manage the entire history and rental status of your Velocity fleet.</p>
            </div>
            <div className="rounded-2xl overflow-x-auto ring ring-inset ring-[#585858]/10 w-full transition duration-300 hover:shadow-lg">
                <table className="w-full table-fixed">
                    <thead className="text-[#585858] text-xs text-left">
                        <tr>
                            <th className="w-30 px-6 py-4">BOOKING ID</th>
                            <th className="w-60 px-6 py-4">CUSTOMER</th>
                            <th className="w-40 px-6 py-4">VEHICLE</th>
                            <th className="px-6 py-4">RENTAL DATE</th>
                            <th className="px-6 py-4">TOTAL COST</th>
                            <th className="px-6 py-4">STATUS</th>
                            <th className="px-6 py-4">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking) => {
                            const bookingItem = booking.Booking_items?.[0];

                            return (
                                <tr key={booking.id} className="hover:bg-slate-100 transition-all duration-300">
                                    <td className="px-6 py-4 text-sm font-semibold hover:underline"><a href={`${booking.id}/booking_detail`}>{booking.booking_code}</a></td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={booking.User?.profile_image} alt="customer" className="w-10 h-10 shadow rounded-full object-cover"/>
                                        <div>
                                            <p className="text-sm truncate capitalize">{booking.User?.name}</p>
                                            <p className="text-xs text-[#585858] truncate">{booking.User?.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{bookingItem?.Vehicle?.name || "-"}</td>
                                    <td className="px-6 py-4 font-extralight">
                                        {new Date(bookingItem.start_date).toLocaleDateString('id-ID',{day: "numeric", month: "long", year: "numeric"})}
                                        <span> - </span> 
                                        {new Date(bookingItem.end_date).toLocaleDateString('id-ID',{day: "numeric", month: "long", year: "numeric"})}
                                    </td>
                                    <td className="px-6 py-4 font-semibold">Rp {booking.total_price.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-4 py-2 text-sm rounded-full ring ring-inset capitalize ${getStatusStyle(booking.status)}`}>
                                            {booking.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <HiOutlinePencilSquare onClick={() => {setSelectedBookingId(booking.id); setOpenModal(true);}} className="text-4xl bg-amber-100 ring ring-inset ring-amber-600 text-amber-600 p-2 rounded-full cursor-pointer" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ModalBooking
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    bookingId={selectedBookingId}
                    getBookings={getBookings}
                />
            </div>
        </div>
    )
}