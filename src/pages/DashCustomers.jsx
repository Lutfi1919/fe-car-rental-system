import { useState, useEffect } from "react";
import { getUsers as getAllUsers, deleteUser } from "../services/user.service";
import { HiOutlineTrash } from "react-icons/hi";
import PaginationComp from "../components/PaginationComp";

export default function DashCustomers() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState({
        rows: "",
        total: 0
    });
    const limit = 5;

    async function getUsers(page = 1) {
        try {
            const result = await getAllUsers(page, limit);

            const pagination = result.data;

            setUsers(pagination.data);

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
            console.log(error);
        }
    }

    async function handleDelete(userId, namw) {
        const confirmDelete = window.confirm(
            `Delete customer "${namw}"? This action cannot be undone.`
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteUser(userId);

            alert("Customer deleted successfully");

            getUsers();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                error.message
            );
        }
    }

    useEffect(() => {
        getUsers(currentPage);
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    return (
        <>
            <div className="mb-7" data-aos="fade-in">
                <p className="text-6xl tracking-tight font-medium">Customer Management</p>
                <p className="text-[#585858] mt-2">Manage user database and verify identity documents</p>
            </div>
            <div className="rounded-2xl ring ring-inset ring-[#585858]/10 overflow-hidden" data-aos="fade-in">
                <div className="overflow-x-auto">
                    <table className="min-w-[1200px] w-full">
                        <thead>
                            <tr className="text-left text-xs text-[#585858]">
                                <th className="px-6 py-4">USER</th>
                                <th className="px-6 py-4">PHONE</th>
                                <th className="px-6 py-4">ROLE</th>
                                <th className="px-6 py-4">VERIFICATION</th>
                                <th className="px-6 py-4">JOINED</th>
                                <th className="px-6 py-4">ACTION</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-100 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.profile_image} alt={user.name} className="w-10 h-10 rounded-full object-cover"/>
                                            <div>
                                                <p className="capitalize">{user.name}</p>
                                                <p className="text-xs text-[#585858]">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">{user.phoneNum.match(/.{1,4}/g).join(" - ")}</td>

                                    <td className="px-6 py-4 capitalize">
                                        <span className="bg-blue-400/20 text-blue-600 px-3 py-1 rounded-full text-xs">{user.role}</span>
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.is_verified === "verified" && (
                                            <span className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full text-xs">
                                                VERIFIED
                                            </span>
                                        )}

                                        {user.is_verified === "pending" && (
                                            <span className="bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-xs">
                                                PENDING
                                            </span>
                                        )}

                                        {user.is_verified === "rejected" && (
                                            <span className="bg-red-400/20 text-red-600 px-3 py-1 rounded-full text-xs">
                                                REJECTED
                                            </span>
                                        )}

                                        {user.is_verified === "unverified" && (
                                            <span className="bg-gray-400/20 text-gray-600 px-3 py-1 rounded-full text-xs">
                                                UNVERIFIED
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        {new Date(user.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(user.id, user.name)} className="p-3 bg-red-600 text-white rounded-xl hover:bg-transparent hover:ring hover:ring-inset hover:ring-red-600 hover:text-red-600 transition cursor-pointer">
                                            <HiOutlineTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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