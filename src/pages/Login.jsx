import { Link } from 'react-router-dom';
import porsche from '../assets/porsche.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Login() {
    
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out'
        })
    }, [])

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
                            <form>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" for="email">Your email</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="email" type="email" placeholder="instaDrive@email.com" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#222222] text-sm font-bold mb-2" for="password">Your password</label>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" id="password" type="password" placeholder="••••••••••" />
                                </div>  
                                <button className="w-full bg-[#222222] text-white py-2 px-4 rounded-lg hover:ring hover:ring-inset hover:ring-[#222222] hover:text-[#222222] hover:bg-transparent transition-all duration-150 cursor-pointer">Let's get started</button>
                            </form>
                            <div className="flex items-center justify-center mt-3">
                                <p className='text-center text-sm text-[#585858]'>Don't have an account?</p>
                                <Link to="/signup" className='text-sm underline ms-1 transition duration-150 hover:text-black/75'>Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
