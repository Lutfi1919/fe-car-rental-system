import { GoDownload, GoHistory } from "react-icons/go";

export default function PaymentHistory() {
    return (
        <>
            <div className="flex justify-start">
                <div className="p-6 rounded-2xl ring ring-inset ring-[#585858]/10 w-full h-fit hover:shadow-xl transition duration-300">
                    <p className="mx-2 flex items-center justify-between">Payment History <GoHistory /></p>
                    <hr className="text-[#585858]/10 border-t-2 my-5" />
                    <div className="flex flex-col gap-5">
                        <div className="">
                            <div className="flex justify-between">
                                <p>Porsche 911</p>
                                <p className="font-semibold">$515,00</p>
                            </div>
                            <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                <p>Mar 18, 2026</p>
                                <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full">PAID</p>
                            </div>
                        </div>
                        <hr className="text-[#585858]/10 border-t-2" />
                        <div className="">
                            <div className="flex justify-between">
                                <p>Porsche 911</p>
                                <p className="font-semibold">$515,00</p>
                            </div>
                            <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                <p>Mar 18, 2026</p>
                                <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full">PAID</p>
                            </div>
                        </div>
                        <hr className="text-[#585858]/10 border-t-2" />
                        <div className="">
                            <div className="flex justify-between">
                                <p>Porsche 911</p>
                                <p className="font-semibold">$515,00</p>
                            </div>
                            <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                <p>Mar 18, 2026</p>
                                <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full">PAID</p>
                            </div>
                        </div>
                        <hr className="text-[#585858]/10 border-t-2" />
                        <div className="">
                            <div className="flex justify-between">
                                <p>Porsche 911</p>
                                <p className="font-semibold">$515,00</p>
                            </div>
                            <div className="mt-1 text-[#585858] text-xs flex items-center justify-between">
                                <p>Mar 18, 2026</p>
                                <p className="bg-green-400/20 text-green-600 px-3 py-1 rounded-full">PAID</p>
                            </div>
                        </div>
                        <hr className="text-[#585858]/10 border-t-2 my-5" />
                        <button className="w-full hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex justify-between items-center hover:shadow-lg">Download all invoices <GoDownload /></button>
                    </div>   
                </div>     
            </div>
        </>
    )
}