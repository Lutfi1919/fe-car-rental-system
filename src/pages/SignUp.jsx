import { Link, useLocation, useNavigate } from 'react-router-dom';
import porsche from '../assets/porsche.jpg';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Register } from "../services/user.service";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [phoneNum, setPhoneNum] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");   
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await Register({ name, phoneNum, email, newPassword });

            localStorage.setItem("token", data.token);

            navigate("/login")

        } catch (error) {
            setError("Gagal Login! pastikan mengisi formulir dengan benar");
        }
    }


    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        });
    }, [])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <>
            <div className="h-screen p-10">
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl" data-aos="fade-in">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative w-full"> 
                            <img className='absolute w-full h-full object-cover' src={porsche} alt="porsche"/>
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="relative h-full flex flex-col justify-end p-5 text-white">
                                <h1 className='text-6xl mb-5 tracking-tight font-medium' style={{fontFamily: "Stack Sans Headline"}}>Let's Start a <br /> New Experience.</h1>
                                <p className='text-gray-200 font-satoshi tracking-tight font-medium'>Choose your favourite car, rent it and enjoy new experience!</p>
                            </div>
                        </div>
                        <div className='p-10 flex flex-col justify-center' style={{fontFamily: "Stack Sans Headline"}}>
                            <p className='text-3xl mb-3 text-[#222222]'>Create an Account</p>
                            <p className='text-[#585858] font-satoshi font-medium'>Welcome to <span className='italic text-[#363636] me-0.5' style={{fontFamily: "Anton"}}>InstaDrive.</span> - Let's Get Started</p>
                            <hr className='text-[#585858] border-t-2 my-10'/>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" htmlFor="name">Your name</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="name" type="text" placeholder="Luthfi Ahmad" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" htmlFor="phoneNum">Your phone number</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="phoneNum" type="number" maxLength={12} placeholder="0878 7522 1858" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" htmlFor="email">Your email</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="email" type="email" placeholder="instaDrive@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" htmlFor="password">Create new password</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="password" type="password" placeholder="••••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                                </div>  
                                <button type='submit' className="w-full bg-[#222222] text-white py-2 px-4 rounded-lg hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] hover:bg-transparent transition-all duration-150 cursor-pointer">Create new account</button>
                            </form>
                            <div className="flex items-center justify-center mt-3">
                                <p className='text-center text-sm text-[#585858]'>Already have an account?</p>
                                <Link to="/login" className='text-sm underline ms-1 transition duration-150 hover:text-black/75'>Sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
