import { Dropdown, DropdownItem } from "flowbite-react";
import { CiFilter } from "react-icons/ci";

export default function DropdownComp({  }) {
    return (
        <Dropdown label="Urutkan surat"  dismissOnClick={false} renderTrigger={() => (
            <button className="w-50 mt-3 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-inset transition-all duration-300 hover:bg-gray-50 hover:shadow-md ">
                Sort cars <CiFilter className="h-5 w-5" />
            </button>
        )} className="overflow-hidden text-end w-40">
            <DropdownItem className="rounded-sm transition-all duration-200 hover:translate-x-1 hover:bg-gray-100">Urutan Menaik</DropdownItem>
            <DropdownItem className="rounded-sm transition-all duration-200 hover:translate-x-1 hover:bg-gray-100">Urutan Menurun</DropdownItem>
            <DropdownItem className="rounded-sm transition-all duration-200 hover:translate-x-1 hover:bg-gray-100">Surat Terbanyak</DropdownItem>
            <DropdownItem className="rounded-sm transition-all duration-200 hover:translate-x-1 hover:bg-gray-100">Surat Tersedikit</DropdownItem>
        </Dropdown>
    )
}