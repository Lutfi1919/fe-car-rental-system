import { Link } from 'react-router-dom';
import './App.css'
import orangecar from './assets/orangecar.jpg';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoArrowForward } from 'react-icons/io5';
import { Ri24HoursLine } from 'react-icons/ri';
import { MdSupportAgent } from 'react-icons/md';
import { BsLightningCharge } from 'react-icons/bs';
import { GoShieldCheck } from 'react-icons/go';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
      easing: 'ease-in-out'
    })
  })

  return (
    <>
      <div className="p-5 -mt-2" style={{fontFamily: "Stack Sans Headline"}} data-aos="fade-in">
        <div className="relative shadow-2xl rounded-[22px] h-[600px] w-full overflow-hidden mb-10">
          <img className='absolute w-full h-full object-cover' src={orangecar} alt="porsche"/>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative p-8 mt-30">
            <h1 className='text-white font-medium text-7xl mb-5' style={{fontFamily: "Stack Sans Headline"}}>Find, Reserve, & <br /> Hire Vehicle Easily.</h1>
            <p className='text-white/80 leading-tight font-satoshi w-120 mb-6'>From luxury sedans for business to rugged SUVs for family adventures, InstaRide offers the largest selection of premium vehicles at unbeatable daily rates.</p>
            <Link className='bg-white w-fit ps-5 pe-1.5 text-sm py-1 mt-3 rounded-full flex items-center hover:bg-[#222222] hover:text-white transition-all duration-150 cursor-pointer'>Rent a car <span className='ms-5 bg-[#222222] rounded-full p-3 text-white -rotate-40'><IoArrowForward /></span></Link>
            <div className="mt-5 flex items-center">
              <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="users" className='w-9 h-9 border-2 border-white rounded-full object-cover' />
              <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="users" className='w-9 h-9 border-2 border-white -translate-x-3 rounded-full object-cover' />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIyTZVXyb90oYHRiiX6YkNUc0CnzGwWjI3Q&s" alt="users" className='w-9 h-9 border-2 border-white -translate-x-6 rounded-full object-cover' />
              <p className='text-white/70 font-light text-sm -ms-3'>Join <span className='text-white'>5,000+</span> Happy Riders.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 h-65 mb-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className='text-6xl mb-4 font-medium text-[#363636]'>1+</h1>
            <p className='text-center mx-20 text-black/70'>Years of Excellence in premium vehicle rentals.</p>
          </div>
          <div className="flex flex-col items-center justify-center border-x-2 border-gray-200">
            <h1 className='text-6xl mb-4 font-medium text-[#363636]'>50+</h1>
            <p className='text-center mx-20 text-black/70'>Location nationwide for convenient pickup and drop-off.</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className='text-6xl mb-4 font-medium text-[#363636]'>100k+</h1>
            <p className='text-center mx-20 text-black/70'>Kilometers driven by our satisfied community last year.</p>
          </div>
        </div>
        <div className="grid grid-rows-2 shadow-2xl bg-[#222222] text-white p-7 rounded-[22px] w-full">
          <div className="mt-5">
            <p className='bg-[#363636] px-5 py-2 rounded-full text-sm w-fit'>Services we provide</p>
            <div className="grid grid-cols-2 mt-5">
              <p className='text-5xl'>Feel Secure & Get The <br /> Best Experience</p>
              <p className=' text-white/80'>We've redefined car rentals by putting you peace of mind first. From transparent pricing to 24/7 roadside assistance, our mission is to ensure every journey you take is seamless, safe, and tailored to your specific travel needs.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-7">
            <div className="ring-1 ring-white/70 p-5 rounded-2xl">
              <p className='text-4xl text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><Ri24HoursLine /></p>
              <p>24-hours car delevery</p>
            </div>
            <div className="ring-1 ring-white/70 p-5 rounded-2xl">
              <p className='text-4xl text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><MdSupportAgent /></p>
              <p>24/7 technical support</p>
            </div>
            <div className="ring-1 ring-white/70 p-5 rounded-2xl">
              <p className='text-4xl text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><BsLightningCharge /></p>
              <p>All models have a premium package</p>
            </div>
            <div className="ring-1 ring-white/70 p-5 rounded-2xl">
              <p className='text-4xl text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><GoShieldCheck /></p>
              <p>Absolute confidentiality</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App