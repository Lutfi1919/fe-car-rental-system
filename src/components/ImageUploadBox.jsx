import { CiCircleRemove } from "react-icons/ci";

export default function ImageUploadBox({ label, file, setFile}) {
    const preview = file ? URL.createObjectURL(file) : null;

    return (
        <div className="p-5 ring ring-inset ring-[#222222]/20 rounded-2xl flex flex-col gap-4">
            <p className="text-lg font-medium">{label}</p>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files)} className="ring ring-inset ring-[#222222]/30 cursor-pointer rounded-xl p-3 w-full file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white"/>

            {preview ? (
                <div className="relative group">
                    <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-xl"/>

                    <button type="button" onClick={() => setFile(null)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition">
                        <CiCircleRemove size={25} />
                    </button>
                </div>
            ) : (
                <div className="h-48 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50">
                    <p className="text-sm text-gray-400">
                        No file selected
                    </p>
                </div>
            )}
        </div>
    );
}