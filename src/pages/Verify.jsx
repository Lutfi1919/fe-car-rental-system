import { useEffect, useState } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { CiCircleRemove } from "react-icons/ci";

const ImageUploadBox = ({ label }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="p-5 ring ring-inset ring-[#222222]/20 rounded-2xl flex flex-col gap-4">
            <p className="text-lg font-medium">{label}</p>    
            <div className="flex flex-col gap-4">
                <input type="file" accept="image/png, image/jpeg, image/gif" onChange={handleFileChange} className="ring ring-inset ring-[#222222]/30 cursor-pointer rounded-xl p-3 w-full file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"/>
                {preview ? (
                    <div className="mt-2 relative group">
                        <p className="text-xs text-gray-500 mb-2 italic text-center">Preview:</p>
                        <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-gray-200 shadow-sm"/>
                        <button onClick={() => setPreview(null)} className="absolute top-5 cursor-pointer right-0 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <CiCircleRemove />
                        </button>
                    </div>
                ) : (
                    <div className="h-48 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50">
                        <p className="text-sm text-gray-400">Belum ada file dipilih</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Verify() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        })
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-in">
            <ImageUploadBox label="Upload your KTP image:" />
            <ImageUploadBox label="Upload your SIM image:" />
        </div>
    )
}