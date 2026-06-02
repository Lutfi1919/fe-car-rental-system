import { useState, useEffect } from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoArrowBack, IoTrashBinOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById, updateVehicle, deleteVehicle } from "../services/vehicle.service";
import AOS from 'aos';
import 'aos/dist/aos.css'

export default function VehicleCrud() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [form, setForm] = useState({
        name: "",
        type: "",
        transmission: "",
        passengers: "",
        fuel_type: "",
        price_per_day: "",
        description: "",
        plate_number: "",
        status: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    async function getVehicle() {
        try {
            const result = await getVehicleById(id);

            setVehicle(result.data);

            setForm({
                name: result.data.name || "",
                type: result.data.type || "",
                transmission: result.data.transmission || "",
                passengers: result.data.passengers || "",
                fuel_type: result.data.fuel_type || "",
                price_per_day: result.data.price_per_day || "",
                description: result.data.description || "",
                plate_number: result.data.plate_number || "",
                status: result.data.status || "",
            });

            setPreview(result.data.image);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        });
    }, [])

    useEffect(() => {
        getVehicle();
    }, [id])

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleImage(e) {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });
            if (image) {
                formData.append("image", image);
            }

            const result = await updateVehicle(id, formData);

            alert("Vehicle updated!");

            setVehicle(result.data);

            navigate("/dashboard/vehicles");
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        const confirmDelete = confirm("Are you sure want to delete this vehicle?");

        if (!confirmDelete) return;

        try {
            await deleteVehicle(id);

            alert("Vehicle deleted!");
            
            navigate("/dashboard/vehicles");
        } catch (error) {
            alert(error.message);
        }
    }

    if (!vehicle) {
        return <p className="p-10">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto rounded-2xl ring ring-inset ring-[#222222]/20 hover:shadow-xl transition-all duration-300 p-8 my-25 text-[#222222]" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in" >
            <div className="flex items-center justify-between -mb-5">
                <h1 className="text-3xl tracking-tight font-medium">Update Vehicle</h1>
                <Link to="/dashboard/vehicles" className='ring-1 ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all ring-inset rounded-full px-5 py-1.5 w-fit flex items-center gap-2'><IoArrowBack /> Back</Link>
            </div>
            <hr className='text-[#585858]/10 border-t-2 my-10'/>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-2 font-semibold">Vehicle Image</label>
                    {preview && (
                        <img src={preview} alt="preview" className="w-120 h-80 object-cover rounded-lg shadow mb-3"/>
                    )}
                    <input type="file" accept="image/*" onChange={handleImage} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg">
                        <option value="">Select Type</option>
                        <option value="sedan">Sedan</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="coupe">Coupe</option>
                        <option value="sport">Sport</option>
                        <option value="LCGC">LCGC</option>
                        <option value="SUV">SUV</option>
                        <option value="MPV">MPV</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Transmission</label>
                    <select name="transmission" value={form.transmission} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg">
                        <option value="">Select Transmission</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Passengers</label>
                    <input type="number" name="passengers" value={form.passengers} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block mb-2 font-semibold"> Fuel Type</label>
                    <select name="fuel_type" value={form.fuel_type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg">
                        <option value="">Select Fuel</option>
                        <option value="pertalite">Pertalite</option>
                        <option value="pertamax">Pertamax</option>
                        <option value="pertamax_turbo">
                            Pertamax Turbo
                        </option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Price Per Day</label>
                    <input type="number" name="price_per_day" value={form.price_per_day} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block mb-2 font-semibold"> Plate Number</label>
                    <input type="text" name="plate_number" value={form.plate_number} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg">
                        <option value="">Select Status</option>
                        <option value="available">Available</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold"> Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                </div>
                <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex items-center gap-3 bg-[#222222] text-white hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] py-2 px-4 rounded-lg">
                        <HiOutlinePencilSquare />{loading ? "Updating..." : "Update Vehicle"}
                    </button>

                    <button type="button" onClick={handleDelete} className="flex items-center gap-3 bg-red-600 text-white hover:ring-1 hover:ring-red-600 hover:ring-inset hover:bg-transparent transition duration-300 hover:text-red-600 py-2 px-4 rounded-lg"><IoTrashBinOutline />Delete</button>
                </div>
            </form>
        </div>
    )
}