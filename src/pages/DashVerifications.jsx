import { useEffect, useState } from "react"
import { getVerifications as getAllVerifications, changeStatusVerification} from "../services/verification.service";
import { IoCheckmarkOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";

export default function DashVerifications() {
    const [verifications, setVerifications] = useState([]);

    async function getVerifications() {
        try {
            const result = await getAllVerifications();

            setVerifications(result.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getVerifications();
    }, [])

    async function handleApprove(id) {
        try {
            await changeStatusVerification( id, "verified");

            alert("User verified successfully");

            getVerifications();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                error.message
            );
        }
    }

    async function handleReject(id) {
        try {
            await changeStatusVerification( id, "rejected" );

            alert("Verification rejected");

            getVerifications();
        } catch (error) {
            alert( error.response?.data?.message || error.message);
        }
    }

    return (
        <>
            <div className="mb-7" data-aos="fade-in">
                <p className="text-6xl tracking-tight font-medium">Verifications Management</p>
                <p className="text-[#585858] mt-2">Manage and verify identity documents</p>
            </div>
            <div className="rounded-2xl ring ring-inset ring-[#585858]/10 overflow-hidden" data-aos="fade-in">
                <div className="overflow-x-auto">
                    <table className="min-w-[1200px] w-full">
                        <thead>
                            <tr className="text-left text-xs text-[#585858]">
                                <th className="px-6 py-4">USER</th>
                                <th className="px-6 py-4">KTP</th>
                                <th className="px-6 py-4">SIM</th>
                                <th className="px-6 py-4">DATE</th>
                                <th className="px-6 py-4">STATUS</th>
                                <th className="px-6 py-4">ACTION</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {verifications.map((verification) => (
                                <tr key={verification.id} className="hover:bg-slate-100 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={verification.User?.profile_image} alt="" className="w-10 h-10 rounded-full object-cover"/>
                                            <div>
                                                <p className="capitalize">{verification.User?.name}</p>
                                                <p className="text-xs text-[#585858]">{verification.User?.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <a href={verification.ktp_image} target="_blank" className="underline">View KTP</a>
                                    </td>

                                    <td className="px-6 py-4">
                                        <a href={verification.sim_image} target="_blank" className="underline">View SIM</a>
                                    </td>

                                    <td className="px-6 py-4">{new Date(verification.createdAt).toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"})}</td>

                                    <td className="px-6 py-4">
                                        {verification.status === "pending" && (
                                            <span className="bg-yellow-400/20 text-yellow-600 px-4 py-1 rounded-full uppercase text-xs">
                                                Pending
                                            </span>
                                        )}

                                        {verification.status === "verified" && (
                                            <span className="bg-green-400/20 text-green-600 px-4 py-1 rounded-full uppercase text-xs">
                                                Verified
                                            </span>
                                        )}

                                        {verification.status === "rejected" && (
                                            <span className="bg-red-400/20 text-red-600 px-4 py-1 rounded-full uppercase text-xs">
                                                Rejected
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        {verification.status === "pending" ? (
                                            <div className="flex gap-3">
                                                <button onClick={() => handleApprove(verification.id)} className="p-3 bg-green-600 text-white rounded-xl hover:bg-transparent hover:ring hover:ring-green-600 hover:text-green-600 transition">
                                                    <IoCheckmarkOutline />
                                                </button>

                                                <button onClick={() => handleReject(verification.id)} className="p-3 bg-red-600 text-white rounded-xl hover:bg-transparent hover:ring hover:ring-red-600 hover:text-red-600 transition">
                                                    <HiXMark />
                                                </button>
                                            </div>
                                        ) : (
                                            <p>-</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}