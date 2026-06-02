import { Button, Label, Modal, ModalBody, ModalHeader, Select } from "flowbite-react";
import { useState } from "react";
import { changeBookingStatus } from "../services/booking.service";

export function ModalBooking({ openModal, setOpenModal, bookingId, getBookings }) {
    const [status, setStatus] = useState("on_rent");
    const [loading, setLoading] = useState(false);

    async function submitBookingStatus() {
        try {
            setLoading(true);

            await changeBookingStatus(bookingId, status)

            alert("Booking status changed!");

            setOpenModal(false);

            getBookings();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup  style={{fontFamily: "Stack Sans Headline"}}>
            <ModalHeader />

            <ModalBody>
                <div className="space-y-5">
                    <h3 className="text-xl font-semibold">Change Booking Status</h3>
                    <div>
                        <Label>
                            Booking Status
                        </Label>

                        <Select value={status} onChange={(e) => setMethod(e.target.value)}>
                            <option value="confirmed">Confirmed</option>
                            <option value="on_rent">On Rent</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Cancelled</option>
                        </Select>
                    </div>

                    <Button onClick={submitBookingStatus} disabled={loading} className="w-full bg-[#222222] hover:ring hover:ring-inset hover:ring-[#222222] hover:bg-transparent hover:text-[#222222] transition">
                        {
                            loading ? "Processing..." : "Change Booking Status"
                        }
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}