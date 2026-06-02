import { useEffect, useState } from "react";
import ListCarCard from "../components/ListCarCard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getVehicles as getAllVehicles } from "../services/vehicle.service";

export default function Fleet() {
    const [vehicles, setVehicles] = useState([]);
    
    async function getVehicles() {
        try {
            const result = await getAllVehicles();

            setVehicles(result.data);
    
        } catch (error) {
            console.error(error.message);
        }
    }

    const totalVehicles = vehicles.length

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        })
    }, [])

    useEffect(() => {
        getVehicles();
    }, [])
    return (
        <>
            <div className="p-10 pt-25" style={{fontFamily: "Stack Sans Headline"}}>
                <div className="flex justify-between items-center mt-5" data-aos="fade-in">
                    <p className="text-6xl tracking-tight font-medium text-[#222222]">All The Fleets We Provide</p>
                    <p className="text-[#585858]">Showing {totalVehicles} premium vehicles for your journey</p>
                </div>
                <hr className='text-[#585858]/50 border-t-2 my-10'/>
                <ListCarCard data={vehicles} />
            </div>
        </>
    )
}