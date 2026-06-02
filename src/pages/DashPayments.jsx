import { useEffect, useState } from "react"
import { GoDownload } from "react-icons/go";
import { getPayments, changePaymentStatus } from "../services/payment.service";
import { IoCheckmarkOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
import PaginationComp from "../components/PaginationComp";

export default function DashPayments() {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState({
        rows: "",
        total: 0
    });
    const limit = 5;

    async function fetchPayments(page = 1) {
        try {
            const result = await getPayments(page, limit);

            const pagination = result.data;

            setPayments(pagination.data);

            setTotalPages(
                Math.ceil(
                    pagination.total / Number(limit)
                )
            );

            setPaginationInfo({
                rows: result.data.rows,
                total: result.data.total
            });

            setCurrentPage(Number(page));
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const today = new Date().toISOString().split('T')[0];

    async function handleAccept(paymentId) {
        try {
            const formData = new FormData();

            formData.append('status', 'paid');
            formData.append('paid_at', today)

            await changePaymentStatus(paymentId, formData
            );

            alert("Success accepting payment!");

            fetchPayments();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    }

    async function handleRefuse(paymentId) {
        try {
            const formData = new FormData();

            formData.append('status', 'failed');
            formData.append('paid_at', today)

            await changePaymentStatus(paymentId, formData);

            alert("Success refusing payment!");

            fetchPayments();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        fetchPayments(currentPage);
    }, [currentPage])

    return (
        <>
            <div className="" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in">
                <div className="mb-7">
                    <p className="text-6xl tracking-tight font-medium">Payments Management</p>
                    <p className="text-[#585858] mt-2">Manage the entire history and rental status of your Velocity fleet.</p>
                </div>
            </div>
            <div className="w-full overflow-hidden rounded-2xl ring ring-inset ring-[#585858]/10 transition duration-300 hover:shadow-lg" data-aos="fade-in">
                <div className="max-w-full overflow-x-auto">
                    <table className="min-w-[1200px]">
                        <thead className="text-[#585858] text-xs text-left">
                            <tr>
                                <th className="px-6 py-4">BOOKING ID</th>
                                <th className="w-60 px-6 py-4">CUSTOMER</th>
                                <th className="px-6 py-4">VEHICLE</th>
                                <th className="px-6 py-4">AMOUNT</th>
                                <th className="px-6 py-4">METHOD</th>
                                <th className="px-6 py-4">PAYMENT TYPE</th>
                                <th className="px-6 py-4">STATUS</th>
                                <th className="px-6 py-4">DATE</th>
                                <th className="px-6 py-4">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            { payments.map((payment, index) => {
                                const booking = payment?.Booking;
                                const bookingItem = booking?.Booking_items?.[0];
                                const vehicle = bookingItem?.Vehicle;

                                return (
                                    <tr key={payment.id} className="hover:bg-slate-100 transition-all duration-300">
                                        <td className="px-6 py-4 text-sm font-semibold">{booking?.booking_code}</td>
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <img src={booking?.User?.profile_image} alt="customer" className="w-10 h-10 shadow rounded-full object-cover"/>
                                            <div>
                                                <p className="text-sm truncate capitalize">{booking?.User?.name}</p>
                                                <p className="text-xs text-[#585858] truncate">{booking?.User?.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{bookingItem?.Vehicle?.name || "-"}</td>
                                        <td className="px-6 py-4 font-medium">Rp {payment.amount.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-sm capitalize"><span className="bg-blue-400/20 ring ring-blue-600 text-blue-600 px-3 py-1 rounded-full">{payment.method}</span></td>
                                        <td className="px-6 py-4 text-sm capitalize"><span className="bg-yellow-400/20 ring ring-yellow-600 text-yellow-600 px-3 py-1 rounded-full ">{payment.payment_type}</span></td>
                                        {
                                            payment.status == "pending" && (
                                                <td className="text-sm"><p className="text-center w-fit ring ring-abmer-600 bg-amber-400/20 text-amber-600 px-6 py-1 rounded-full uppercase">{payment.status}</p></td>
                                            ) 
                                        }
                                        {
                                            payment.status == "paid" && (
                                                <td className="text-sm"><p className="text-center w-fit ring ring-green-600 bg-green-400/20 text-green-600 px-6 py-1 rounded-full uppercase">{payment.status}</p></td>
                                            ) 
                                        }
                                        {
                                            payment.status == "failed" && (
                                                <td className="text-sm"><p className="text-center w-fit ring ring-red-600 bg-red-400/20 text-red-600 px-6 py-1 rounded-full uppercase">{payment.status}</p></td>
                                            ) 
                                        }
                                        <td className="px-6 py-4 capitalize font-extralight">{new Date(payment.paid_at).toLocaleDateString("id-ID", {day: "numeric", month: "short", year: "numeric"})}</td>
                                        <td className="px-6 py-4">
                                            {
                                                payment.status == 'pending' ? (
                                                    <div className="flex justify-center gap-3 mt-1">
                                                        <button onClick={() => handleAccept(payment.id)} className="text-sm w-fit h-fit p-3 bg-green-600 text-white rounded-xl hover:bg-transparent hover:ring hover:ring-inset hover:ring-green-600 hover:text-green-600 transition cursor-pointer"><IoCheckmarkOutline /></button>
                                                        <button onClick={() => handleRefuse(payment.id)} className="text-sm w-fit h-fit p-3 bg-red-600 text-white rounded-xl hover:bg-transparent hover:ring hover:ring-inset hover:ring-red-600 hover:text-red-600 transition cursor-pointer"><HiXMark /></button>
                                                    </div> 
                                                ) : (
                                                    <p>-</p>
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
            <PaginationComp
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                rows={paginationInfo.rows}
                total={paginationInfo.total}
            />
        </>
    )
}