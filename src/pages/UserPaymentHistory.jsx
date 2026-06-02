import { GoDownload, GoHistory } from "react-icons/go";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { ModalPayment } from "../components/ModalPayment";
import { getUserPayments } from "../services/payment.service";
import { downloadUserPayments } from "../services/report.service";

export default function UserPaymentHistory() {
    const [payments, setPayments] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    async function getPayments() {
        try {
            const result = await getUserPayments();

            console.log(result)

            setPayments(result.data);
        } catch (error) {
            console.error(error.message);
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
            once: false,
            easing: "ease-in-out"
        });

        getPayments();
    }, [])

    return (
        <>
            <div className="p-6 rounded-2xl ring ring-inset ring-[#585858]/10 w-full h-fit" data-aos="fade-in">
                <p className="mx-2 flex items-center justify-between">Payment History <GoHistory /></p>
                <hr className="text-[#585858]/10 border-t-2 my-5" />
                <div className="flex flex-col gap-5">
                    {
                        payments.map((item, index) => {
                            const booking = item.Booking;
                            const bookingItem = booking?.Booking_items?.[0];
                            const vehicle = bookingItem?.Vehicle;

                            return (
                                <div key={item.id}>
                                    <div className="flex justify-between">
                                        <p>{vehicle?.name || "Vehicle"}</p>
                                        <p className="font-semibold">Rp {Number(item.amount).toLocaleString("id-ID")}</p>
                                    </div>

                                    <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <p>{new Date(item.createdAt).toLocaleDateString("id-ID", {day: "numeric", month: "short", year: "numeric"})}</p>
                                            <p>Booking ID:{" "}{booking?.booking_code}</p>
                                        </div>

                                        <div className="flex gap-1">
                                            <p className="bg-blue-400/20 text-blue-600 px-3 py-1 rounded-full uppercase">{item.method}</p>
                                            <p className="bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full uppercase">{item.payment_type}</p>
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
                                        booking?.payment_status == 'partial' && (
                                            <button onClick={() => {setSelectedBookingId(booking.id); setOpenModal(true);}} className="flex ml-auto mr-0 mt-3 text-sm w-fit bg-[#222222] text-white px-5 py-2 rounded-xl hover:bg-transparent hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] transition cursor-pointer">Complete the payment</button>
                                        )
                                    }

                                    {
                                        index !== payments.length - 1 && (<hr className="text-[#585858]/10 border-t-2 mt-5" />)
                                    }

                                </div>
                            );
                        })
                    }
                    <ModalPayment
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        bookingId={selectedBookingId}
                        getPayments={getPayments}
                    />

                    {
                        payments.length === 0 && (
                            <p className="text-center text-gray-400 py-10">
                                No payment history
                            </p>
                        )
                    }
                    <hr className="text-[#585858]/10 border-t-2 my-5" />
                    <button onClick={handleDownload} className="w-full hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg">Download all invoices <GoDownload /></button>
                </div>   
            </div>     
        </>
    )
}