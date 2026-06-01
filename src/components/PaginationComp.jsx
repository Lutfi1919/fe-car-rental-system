import { Pagination } from "flowbite-react";

export default function PaginationComp({ currentPage, totalPages, onPageChange, rows, total }) {
    return (
        <div className="flex justify-between items-center mt-5" data-aos="fade-in">
            <p className="text-sm text-[#585858]">
                Showing {rows} of {total} Entries
            </p>

            <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                previousLabel="Go back"
                nextLabel="Go forward"
                showIcons
            />
        </div>
    );
}