import { useEffect, useMemo, useState } from "react";
import { CiCircleCheck, CiCircleInfo, CiCircleRemove } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getVehicleById } from "../services/vehicle.service";
import { getBookingPackages } from "../services/bookingPackage.service";
import { checkoutBooking } from "../services/checkout.service";
import { TbManualGearbox } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { PiGasPumpLight } from "react-icons/pi";

export default function VehicleBooking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({});
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        booking_package_id: "",
        method: "online_payment",
        payment_type: "dp"
    });

    const user = JSON.parse(localStorage.getItem("user"));

    async function getVehicle() {
        try {
            const result = await getVehicleById(id);

            setVehicle(result.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function getPackages() {
        try {
            const result = await getBookingPackages();

            setPackages(result.data);

        } catch (error) {

            console.error(error.message);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const totalDays = useMemo(() => {

        if (!formData.start_date || !formData.end_date) {
            return 0;
        }

        const start = new Date(formData.start_date);
        const end = new Date(formData.end_date);

        const diffTime = end.getTime() - start.getTime();

        const days = Math.ceil(
            diffTime / (1000 * 60 * 60 * 24)
        );

        return days > 0 ? days : 0;

    }, [
        formData.start_date,
        formData.end_date
    ]);


    const selectedPackage = useMemo(() => {
        return packages.find(
            (item) => item.id === Number(formData.booking_package_id)
        );
    }, [
        packages,
        formData.booking_package_id
    ]);

    const basePrice = (vehicle.price_per_day || 0) * totalDays;

    const multiplier = selectedPackage?.price_multiplier || 1;

    const totalPrice = basePrice * multiplier;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const result = await checkoutBooking({
                vehicle_id: Number(id),
                booking_package_id: Number(formData.booking_package_id),
                start_date: formData.start_date,
                end_date: formData.end_date,
                method: formData.method,
                payment_type: formData.payment_type
            });

            console.log(result);
            navigate("/profile/payment_history");

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            alert(message);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVehicle();
        getPackages();
    }, [id]);

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
            easing: 'ease-in-out'
        });
    })

    const hariIni = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="mx-8 mt-25" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in">
                <div className="flex gap-5 ">
                    <div className="w-165 flex flex-col rounded-2xl ring ring-[#585858]/20 hover:shadow-lg transition duration-300">
                        <img src={vehicle?.image} alt="vehicle image" className="object-cover shadow rounded-t-2xl h-100"/>
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div className="">
                                    <p className="text-2xl font-medium">{vehicle?.name}</p>
                                    <p className="font-light text-sm capitalize">{vehicle?.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-medium text-[#85BB65]">Rp {vehicle?.price_per_day?.toLocaleString('id-ID')}</p>
                                    <p className="font-light text-sm">PER DAY</p>
                                </div>
                            </div>
                            <p className="mt-5 font-light text-sm">Description:</p>
                            <p className="">{vehicle?.description}</p>
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
                                    <p className="capitalize text-lg">{vehicle?.fuel_type}</p>
                                    <p className="text-sm capitalize font-extralight">Gasoline</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ring ring-[#585858]/20 hover:shadow-xl transition duration-300 p-8 rounded-2xl w-full">
                        <div className="flex justify-between items-center">
                            <p className="text-3xl text-[#85BB65] font-medium">Rp {vehicle.price_per_day?.toLocaleString('id-ID')}<span className="text-base text-[] font-light ms-1">/ day</span></p>
                            {
                                vehicle.status === 'available' && (
                                    <p className="font-light truncate max-w-70 bg-green-400/20 text-green-600 px-3 py-1 rounded-full flex items-center capitalize"><CiCircleCheck className="me-1"/>{vehicle.status}</p>
                                )
                            }
                            {
                                vehicle.status === 'maintenance' && (
                                    <p className="font-light truncate max-w-70 bg-red-400/20 text-red-600 px-3 py-1 rounded-full flex items-center capitalize"><CiCircleRemove className="me-1"/>{vehicle.status}</p>
                                )
                            }
                        </div>
                        <form onSubmit={handleSubmit}className="mt-7">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="font-light">Pick-up Date</label>
                                    <input type="date" name="start_date" min={hariIni} value={formData.start_date} onChange={handleChange}  className=" px-3 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-xl mt-1"required/>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-light">Return Date</label>
                                    <input type="date" name="end_date" min={hariIni} value={formData.end_date} onChange={handleChange} className="px-3 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-xl mt-1"required />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-light">Package</label>
                                    <select name="booking_package_id" value={formData.booking_package_id} onChange={handleChange} className=" px-3 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-xl mt-1" required>
                                        <option value="">Select Package</option>
                                        {
                                            packages.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-light">Payment Method</label>
                                    <select name="method" value={formData.method} onChange={handleChange} className="px-3 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-xl mt-1">
                                        <option value="online_payment">Online Payment</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-light">Payment Type</label>
                                    <select name="payment_type" value={formData.payment_type} onChange={handleChange} className="px-3 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-xl mt-1">
                                        <option value="dp">DP</option>
                                        <option value="full_payment">Full Payment</option>
                                    </select>
                                </div>

                            </div>

                            <hr className="text-[#585858]/40 border my-5 mx-3" />

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <p>Rp {vehicle.price_per_day?.toLocaleString("id-ID")}<span className="mx-2">x</span>{totalDays} days</p>
                                    <p>Rp {basePrice.toLocaleString("id-ID")}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>{selectedPackage?.name ||"-" } Package</p>
                                    <p> x {multiplier}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Can refund DP</p>
                                    <p>
                                        {
                                            selectedPackage?.can_refund_dp ? "Yes" : "No"
                                        }
                                    </p>
                                </div>
                            </div>
                            <hr className="text-[#585858]/40 border my-5 mx-3" />
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-[#585858]">Total Price</p>
                                    <p className="text-3xl font-semibold">Rp { totalPrice.toLocaleString("id-ID")}</p>
                                </div>
                                <button type="submit" disabled={loading} className="bg-[#222222] text-white px-6 py-3 rounded-xl hover:bg-transparent hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] transition disabled:opacity-50 cursor-pointer">
                                    {
                                        loading ? "Processing..." : "Checkout"
                                    }
                                </button>
                            </div>
                            {
                                error && (<p className="text-red-500 text-sm mt-4">{error}</p>)
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}