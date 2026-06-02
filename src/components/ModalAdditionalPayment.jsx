import { Button, Label, Modal, ModalBody, ModalHeader, Select } from "flowbite-react";
import { useState } from "react";
import { createAdditionalPayment } from "../services/payment.service";

export function ModalAdditionalPayment({ openModal, setOpenModal, bookingId, getPayments }) {
    const [method, setMethod] = useState("cash");
    const [loading, setLoading] = useState(false);

    async function submitAdditional() {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("booking_id", bookingId);
            formData.append("method", method);

            await createAdditionalPayment(formData)

            alert("Additional payment created");

            setOpenModal(false);

            getPayments();
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
                    <h3 className="text-xl font-semibold">Additional Fee Payment</h3>
                    <div>
                        <Label>
                            Payment Method
                        </Label>

                        <Select value={method} onChange={(e) => setMethod(e.target.value)}>
                            <option value="cash">Cash</option>
                            <option value="online_payment">Online Payment</option>
                        </Select>
                    </div>

                    <Button onClick={submitAdditional} disabled={loading} className="w-full bg-[#222222] hover:ring hover:ring-inset hover:ring-[#222222] hover:bg-transparent hover:text-[#222222] transition">
                        {
                            loading ? "Processing..." : "Pay Additional Fee"
                        }
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}