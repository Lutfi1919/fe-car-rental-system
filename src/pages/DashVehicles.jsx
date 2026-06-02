import { useEffect, useState } from 'react';
import CarCardComp from '../components/CarCardComp';
import ListCarCard from '../components/ListCarCard';
import { SlMagnifier } from 'react-icons/sl';
import DropdownComp from '../components/DropdownComp';
import { FaPlus } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getVehicles } from '../services/vehicle.service';
import { downloadVehicle } from '../services/report.service';
import { GoDownload } from 'react-icons/go';

export default function DashVehicles() {
    const [vehicle, setVehicle] = useState([]);

    async function getVehicle() {
        try {
            const result = await getVehicles();

            setVehicle(result.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleDownload() {
        try {
            const response = await downloadVehicle();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "vehicle-report.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getVehicle();
    }, [])

    return (
        <>
            <div className="mb-7" data-aos="fade-in">
                <p className="text-6xl tracking-tight font-medium">Vehicles Management</p>
                <p className="text-[#585858] mt-2">Manage user database and verify identity documents</p>
            </div>
            <div className="flex items-center justify-between mb-10 " data-aos="fade-in">
                <div className="flex items-center gap-2">
                    <Link to={'/vehicles/create'} className="font-light hover:ring hover:ring-inset hover:ring-[#222222] pe-4 ps-3 py-1.5 rounded-full cursor-pointer bg-[#222222] text-white hover:bg-transparent hover:text-[#222222] transition duration-300 flex items-center gap-2"><FiPlus /> Add a car</Link>
                    <button onClick={handleDownload} className="font-light hover:ring hover:ring-inset hover:ring-[#222222] pe-4 ps-3 py-1.5 rounded-full cursor-pointer bg-[#222222] text-white hover:bg-transparent hover:text-[#222222] transition duration-300 flex items-center gap-2">
                        <GoDownload />
                        Export Excel
                    </button>
                </div>
            </div>
            <div className="mb-10 ">
                <ListCarCard data={vehicle} type={"admin"} />
            </div>
        </>
    )
}