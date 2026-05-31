import { Link, useNavigate } from 'react-router-dom';
import porsche from '../assets/porsche.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useContext, useState } from 'react';
import { Login } from '../services/user.service';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");   
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await Login({ email, password });

            localStorage.setItem("token", data.data.token);

            navigate("/");

        } catch (error) {
            setError("Gagal Login! pastikan email dan password sesuai");
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        })
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
                        <div className="relative h-[600px] w-full"> 
                            <img className='absolute w-full h-full object-cover' src={porsche} alt="porsche"/>
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="relative h-full flex flex-col justify-end p-5 text-white">
                                <h1 className='text-6xl mb-5 tracking-tight font-medium' style={{fontFamily: "Stack Sans Headline"}}>Let's Start a <br /> New Experience.</h1>
                                <p className='text-gray-200 font-satoshi tracking-tight font-medium'>Choose your favourite car, rent it and enjoy new experience!</p>
                            </div>
                        </div>
                        <div className='p-10 flex flex-col justify-center' style={{fontFamily: "Stack Sans Headline"}}>
                            <p className='text-3xl text-[#222222] mb-3'>Welcome back!</p>
                            <p className='text-[#585858] font-satoshi font-medium'>Enter your email and password to access your <span className='italic text-[#363636] me-0.5' style={{fontFamily: "Anton"}}>InstaDrive.</span> account</p>
                            <hr className='text-[#585858] border-t-2 my-10'/>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" htmlFor="email">Your email</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="email" type="email" placeholder="instaDrive@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" htmlFor="password">Your password</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="password" type="password" placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>  
                                <button type="submit" className="w-full bg-[#222222] text-white py-2 px-4 rounded-lg hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] hover:bg-transparent transition-all duration-150 cursor-pointer">Let's get started</button>
                            </form>
                            <div className="flex items-center justify-center mt-3">
                                <p className='text-center text-sm text-[#585858]'>Don't have an account?</p>
                                <Link to="/signup" className='text-sm underline ms-1 transition duration-150 hover:text-black/75'>Sign up</Link>
                            </div>
                            <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${error ? "max-h-20 opacity-100 translate-y-0 mt-3" : "max-h-0 opacity-0 -translate-y-2"}`}>
                                <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-lg px-4 py-3">
                                    {error}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
