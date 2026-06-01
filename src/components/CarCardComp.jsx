import { GoPeople } from "react-icons/go";
import { IoArrowForward, IoCarSportOutline } from "react-icons/io5";
import { PiGasPumpLight } from "react-icons/pi";
import { TbManualGearbox } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function CarCardComp({ item, type }) {
    const token = localStorage.getItem("token");

    return(
        <>
            {
                type === 'admin' ? 
                <div className="flex w-86 flex-col overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
                    <img src={item.image} alt="Fleet" className='h-45 object-cover' />
                    <div className="p-5">
                        <p className='text-xl capitalize'>{item.name}</p>
                        <p className="font-light text-sm capitalize">{item.type}</p>
                        <div className="flex flex-row justify-between mt-5 text-[#585858]">
                            <div className="text-sm font-light">
                                <p className='flex items-center'><GoPeople className='me-2'/>{item.passengers} Passengers</p>
                                <p className='flex items-center capitalize'><PiGasPumpLight className='me-2'/>{item.fuel_type}</p>
                            </div>
                            <div className="text-sm font-light">
                                <p className='flex items-center capitalize'><TbManualGearbox className='me-2'/>{item.transmission}</p>
                            </div>
                        </div>
                        <hr className='text-[#585858]/40 border my-5 mx-3'/>
                        <div className="flex items-center justify-between mb-3">
                            <p className=''>Price</p>
                            <p className='font-bold text-lg'><span className='text-[#85BB65]'>Rp {item.price_per_day.toLocaleString('id-ID')}</span><span className='font-light text-sm ms-1'>/day</span></p>
                        </div>
                        <div className="flex justify-end">
                            <Link to={`/vehicles/${item.id}/edit`} className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Edit <IoArrowForward className='ms-2'/></Link>
                        </div>
                    </div>
                </div>
                :
                <div className="flex w-110 flex-col overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
                    <img src={item.image} alt="Fleet" className='h-55 object-cover' />
                    <div className="p-5">
                        <p className='text-xl capitalize'>{item.name}</p>
                        <p className="font-light text-sm capitalize">{item.type}</p>
                        <div className="flex flex-row justify-between mt-5 text-[#585858]">
                            <div className="text-sm font-light">
                                <p className='flex items-center'><GoPeople className='me-2'/>{item.passengers} Passengers</p>
                                <p className='flex items-center capitalize'><PiGasPumpLight className='me-2'/>{item.fuel_type}</p>
                            </div>
                            <div className="text-sm font-light">
                                <p className='flex items-center capitalize'><TbManualGearbox className='me-2'/>{item.transmission}</p>
                            </div>
                        </div>
                        <hr className='text-[#585858]/40 border my-5 mx-3'/>
                        <div className="flex items-center justify-between mb-3">
                            <p className=''>Price</p>
                            <p className='font-bold text-lg'><span className='text-[#85BB65]'>Rp {item.price_per_day.toLocaleString('id-ID')}</span><span className='font-light text-sm ms-1'>/day</span></p>
                        </div>
                        <div className="flex justify-end">
                            <Link to={token ? `/vehicles/${item.id}` : '/login'} className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center hover:shadow-lg'>Rent now <IoArrowForward className='ms-2'/></Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}