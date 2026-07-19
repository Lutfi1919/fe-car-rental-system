import { useEffect, useState } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css'
import ImageUploadBox from "../components/ImageUploadBox";
import { createVerification } from "../services/verification.service";
import { getProfile } from "../services/user.service";

export default function UserVerify() {
    const [profile, setProfile] = useState({});
    const [ktpFile, setKtpFile] = useState(null);
    const [simFile, setSimFile] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchProfile() {
        try {
            const result = await getProfile();

            setProfile(result.data);
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    }

    async function handleSubmit() {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("user_id", profile.id);
            formData.append("ktp_image", ktpFile);
            formData.append("sim_image", simFile);

            await createVerification(formData);

            alert("Verification submitted");

            fetchProfile();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        });
        fetchProfile();
    }, [])

    return (
        <>
            {
                profile.is_verified == "verified" && (
                    <div className="text-start" style={{fontFamily: "Anton"}}>
                        <p className="text-[190px] leading-43 text-[#222222] ">YOU HAVE <br /> BEEN <br /> <span className="text-green-500 italic">VERIFIED.</span></p>
                    </div>
                )
            }
            {
                profile.is_verified == "pending" && (
                    <div className="text-start" style={{fontFamily: "Anton"}}>
                        <p className="text-[190px] leading-43 text-[#222222] ">YOU HAVE <br /> SUBMITTED <br /> <span className="text-green-500 italic">VERIFICATION.</span></p>
                    </div>
                )
            }
            {
               profile.is_verified == "unverified" && (
                    <div className="space-y-6" data-aos="fade-in">
                        <div className="grid md:grid-cols-2 gap-6">
                            <ImageUploadBox label="Upload KTP" file={ktpFile} setFile={setKtpFile}/>
                            <ImageUploadBox label="Upload SIM" file={simFile} setFile={setSimFile}/>
                            {/* <input type="file"  accept="image/*" /> */}
                        </div>

                        <button onClick={handleSubmit} disabled={ !ktpFile || !simFile || loading } className="bg-[#222222] text-white px-6 py-3 rounded-xl hover:bg-transparent hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] transition disabled:opacity-50">
                            {loading ? "Submitting..." : "Submit Verification"}
                        </button>
                    </div>
                ) 
            }
        </>
    )
}