import { useState } from "react"
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../services/vehicle.service";

export default function CreateVehicle() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        type: "",
        transmission: "",
        passengers: "",
        fuel_type: "",
        price_per_day: "",
        description: "",
        plate_number: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleImage(e) {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("File must be an image");
            return;
        }

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

            const result = await createVehicle(formData);

            console.log(result);

            alert("Vehicle created!");
            setForm({
                name: "",
                type: "",
                transmission: "",
                passengers: "",
                fuel_type: "",
                price_per_day: "",
                description: "",
                plate_number: "",
            });

            setImage(null);
            setPreview("");

            navigate("/dashboard/vehicles");

        } catch (error) {
            alert(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 my-10 mt-20 bg-white rounded-xl shadow-lg" style={{ fontFamily: "Stack Sans Headline" }}>
                <div className="flex items-center justify-between -mb-5">
                    <h1 className="text-3xl tracking-tight font-medium">Create Vehicle</h1>
                    <Link to="/dashboard/vehicles" className='ring-1 ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all ring-inset rounded-full px-5 py-1.5 w-fit flex items-center gap-2'><IoArrowBack /> Back</Link>
                </div>

                <hr className='text-[#585858] border-t-2 my-10'/>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-semibold">Vehicle Image</label>
                        {preview && (
                            <img src={preview} alt="preview" className="w-full h-60 object-cover rounded-lg mb-3"/>
                        )}
                        <input type="file" accept="image/*" onChange={handleImage} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Toyota Avanza" className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
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
                        <input type="number" name="passengers" value={form.passengers} onChange={handleChange} placeholder="7" className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Fuel Type</label>
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
                        <input type="number" name="price_per_day" value={form.price_per_day} onChange={handleChange} placeholder="350000" className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Plate Number</label>
                        <input type="text" name="plate_number" value={form.plate_number} onChange={handleChange} placeholder="B 1234 ABC" className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Vehicle description..." className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 rounded-lg"/>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#222222] text-white hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] py-2 px-4 rounded-lg">
                        {loading ? "Creating..." : "Create Vehicle"}
                    </button>
                </form>
            </div>
        </>
    )
}