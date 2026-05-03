import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function NavbarComp() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 550) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);        
    }, []);

    const isActive = (path) => location.pathname === path;
    const isProfileActive = location.pathname.startsWith("/profile");
    const isHomeActive = isActive("/");
    const NavBackground = isHomeActive ? isScrolled ? ("bg-[#222222] text-white shadow-lg") : ("bg-transparent text-white") : "bg-[#222222] text-white shadow-lg"

    return (  
        <div className="fixed top-0 max-w-[1500px] my-0 mx-auto left-0 right-0 z-50 mt-4" style={{ fontFamily: "Stack Sans Headline" }}>
            <div className={`mx-8 flex items-center justify-between rounded-2xl px-7 py-3 transition-all duration-300 ${NavBackground}`}>
                <Link to="/" className="text-2xl italic" style={{fontFamily: "Anton"}}>InstaDrive.</Link>
                <div className="flex items-center gap-10">
                    <Link to="/" className={`relative flex items-center hover:opacity-100 transition duration-250 ${isActive("/") ? "opacity-100" : "opacity-50"}`}>{isActive("/") && <span className="absolute -left-3 text-2xl">•</span>} Home</Link>
                    <Link to="/catalog" className={`relative flex items-center hover:opacity-100 transition duration-250 ${isActive("/catalog") ? "opacity-100" : "opacity-50"}`}>{isActive("/catalog") && <span className="absolute -left-3 text-2xl">•</span>} Catalog</Link>
                    <Link to="/fleet" className={`relative flex items-center hover:opacity-100 transition duration-250 ${isActive("/fleet") ? "opacity-100" : "opacity-50"}`}>{isActive("/fleet") && <span className="absolute -left-3 text-2xl">•</span>} Fleet</Link>
                    <Link to="/profile" className={`relative flex items-center hover:opacity-100 transition duration-250 ${isProfileActive ? "opacity-100" : "opacity-50"}`}>{isProfileActive && <span className="absolute -left-3 text-2xl">•</span>} Profile</Link>
                </div>
                <div className="flex items-center gap-1">
                    <Link to="/signup" className="px-7 py-1.5 transition duration-150 rounded-full ring-1 ring-inset hover:ring-white hover:bg-white hover:text-black hover:-translate-y-0.5">Sign up</Link>
                    <Link to="/login" className="bg-white text-black hover:text-white px-7 py-1.5 transition duration-150 rounded-full hover:bg-transparent hover:ring-1 hover:ring-inset hover:-translate-y-0.5">Login</Link>
                </div>
            </div>
        </div> 
    )
}