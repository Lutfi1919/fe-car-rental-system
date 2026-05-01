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

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mx-8 mt-4 rounded-2xl flex items-center justify-between px-7 py-3 ${
                isScrolled ? 'bg-[#222222] text-white shadow-lg' : 'bg-transparent text-white'
            }`} style={{ fontFamily: "Stack Sans Headline" }}>                
                <Link to="/" className="text-2xl italic" style={{fontFamily: "Anton"}}>InstaRide</Link>
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center">{isActive("/") && <span className="text-2xl me-2">•</span>} Home</Link>
                    <Link to="/catalog" className="">{isActive("/catalog") && <span className="text-2xl me-2">•</span>} Catalog</Link>
                    <Link to="/fleet" className="">{isActive("/fleet") && <span className="text-2xl me-2">•</span>} Fleet</Link>
                </div>
                <div className="flex items-center gap-1">
                    <Link to="/signup" className="px-7 py-1.5 transition duration-150 rounded-full ring-1 ring-inset hover:bg-white hover:text-black hover:-translate-y-1">Sign up</Link>
                    <Link to="/login" className="bg-white text-black hover:text-white px-7 py-1.5 transition duration-150 rounded-full hover:bg-transparent hover:ring-1 hover:ring-inset hover:-translate-y-1">Login</Link>
                </div>
            </div>
        </>
    )
}