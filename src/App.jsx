import { Link } from 'react-router-dom';
import './App.css'
import orangecar from './assets/orangecar.jpg';
import alfar from './assets/logos/alfar.png';
import audi from './assets/logos/audi.png';
import bentley from './assets/logos/bentley.png';
import lambo from './assets/logos/lambo.png';
import mercy from './assets/logos/mercy.png';
import porsche from './assets/logos/porsche.png';
import vw from './assets/logos/vw.png';
import sideBlueCar from './assets/side blue car.png';
import sideGrayCar from './assets/side gray car.png';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoArrowForward, IoCarSportOutline } from 'react-icons/io5';
import { Ri24HoursLine } from 'react-icons/ri';
import { MdSupportAgent } from 'react-icons/md';
import { BsLightningCharge } from 'react-icons/bs';
import { GoPeople, GoShieldCheck } from 'react-icons/go';
import { TbManualGearbox } from 'react-icons/tb';
import { PiGasPumpLight } from 'react-icons/pi';
import { HashLink } from 'react-router-hash-link';
import devGanteng from './assets/dev ganteng.jpeg';

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
        <div className="relative shadow-2xl rounded-[22px] h-[600px] w-full overflow-hidden mb-15">
          <img className='absolute w-full h-full object-cover' src={orangecar} alt="porsche"/>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative p-8 mt-30">
            <h1 className='text-white font-medium text-7xl mb-5 tracking-tight' style={{fontFamily: "Stack Sans Headline"}}>Find, Reserve, & <br /> Hire Vehicle Easily.</h1>
            <p className='text-white/80 leading-tight font-satoshi w-120 mb-6'>From luxury sedans for business to rugged SUVs for family adventures, InstaRide offers the largest selection of premium vehicles at unbeatable daily rates.</p>
            <Link to="/fleet" className='bg-white w-fit ps-5 pe-1.5 text-sm py-1 mt-3 rounded-full flex items-center hover:bg-[#222222] hover:text-white transition-all duration-150 cursor-pointer group'>Rent a car <span className='ms-5 bg-[#222222] rounded-full p-3 text-white -rotate-40 group-hover:rotate-0 transition duration-300'><IoArrowForward /></span></Link>;
            <div className="mt-5 flex items-center">
              <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="users" className='w-9 h-9 border-2 border-white rounded-full object-cover' />
              <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="users" className='w-9 h-9 border-2 border-white -translate-x-3 rounded-full object-cover' />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIyTZVXyb90oYHRiiX6YkNUc0CnzGwWjI3Q&s" alt="users" className='w-9 h-9 border-2 border-white -translate-x-6 rounded-full object-cover' />
              <p className='text-white/70 font-light text-sm -ms-3'>Join <span className='text-white'>5,000+</span> Happy Riders.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-15 gap-17" data-aos="fade-in">
          <img src={alfar} alt="car logo" className='grayscale hover:grayscale-0 transition duration-200 w-16 h-16 object-cover'/>
          <img src={audi} alt="car logo" className='grayscale hover:grayscale-0 transition duration-200 w-26'/>
          <img src={bentley} alt="car logo" className='grayscale hover:grayscale-0 transition duration-200 w-31 h-16 object-cover'/>
          <img src={lambo} alt="car logo" className='grayscale hover:grayscale-0 transition duration-200 w-16 h-19 object-cover'/>
          <img src={mercy} alt="car logo" className='grayscale hover:grayscale-0 transition duration-200 w-22 h-16 object-cover'/>
          <img src={porsche} alt="car logo" className='grayscale hover:grayscale-0 transition duration-200 w-26 h-16 object-cover'/>
          <img src={vw} alt="car logo" className='grayscale hover:grayscale-0 transition duration-200 w-16 h-16 object-cover'/>
        </div>
        <div className="grid grid-cols-3 h-65 mb-10" data-aos="fade-in">
          <div className="flex flex-col items-center justify-center">
            <h1 className='text-6xl mb-4 font-medium text-[#222222]' style={{fontFamily: "Anton"}}>1+</h1>
            <p className='text-center mx-20 text-black/70'>Years of Excellence in premium vehicle rentals.</p>
          </div>
          <div className="flex flex-col items-center justify-center border-x-2 border-gray-200">
            <h1 className='text-6xl mb-4 font-medium text-[#222222]' style={{fontFamily: "Anton"}}>50+</h1>
            <p className='text-center mx-20 text-black/70'>Location nationwide for convenient pickup and drop-off.</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className='text-6xl mb-4 font-medium text-[#222222]' style={{fontFamily: "Anton"}}>100k+</h1>
            <p className='text-center mx-20 text-black/70'>Kilometers driven by our satisfied community last year.</p>
          </div>
        </div>
        <div className="grid grid-rows-2 shadow-2xl bg-[#222222] text-white p-7 rounded-[22px] w-full mb-20" data-aos="fade-in">
          <div className="mt-5">
            <p className='bg-[#363636] px-5 py-2 rounded-full text-sm w-fit'>Services we provide</p>
            <div className="grid grid-cols-2 mt-5">
              <p className='text-5xl'>Feel Secure & Get The <br /> Best Experience</p>
              <p className=' text-white/80'>We've redefined car rentals by putting you peace of mind first. From transparent pricing to 24/7 roadside assistance, our mission is to ensure every journey you take is seamless, safe, and tailored to your specific travel needs.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-7">
            <div className="group ring-1 ring-white/70 p-5 rounded-2xl hover:bg-white/70 hover:text-[#222222] transition duration-200">
              <p className='text-4xl group-hover:-rotate-35 transition-transform duration-400 text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><Ri24HoursLine /></p>
              <p>24-hours car delevery</p>
            </div>
            <div className="group ring-1 ring-white/70 p-5 rounded-2xl hover:bg-white/70 hover:text-[#222222] transition duration-200">
              <p className='text-4xl group-hover:-rotate-35 transition-transform duration-400 text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><MdSupportAgent /></p>
              <p>24/7 technical support</p>
            </div>
            <div className="group ring-1 ring-white/70 p-5 rounded-2xl hover:bg-white/70 hover:text-[#222222] transition duration-200">
              <p className='text-4xl group-hover:-rotate-35 transition-transform duration-400 text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><BsLightningCharge /></p>
              <p>All models have a premium package</p>
            </div>
            <div className="group ring-1 ring-white/70 p-5 rounded-2xl hover:bg-white/70 hover:text-[#222222] transition duration-200">
              <p className='text-4xl group-hover:-rotate-35 transition-transform duration-400 text-white/80 bg-[#363636] w-fit p-7 rounded-full mb-4'><GoShieldCheck /></p>
              <p>Absolute confidentiality</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-5 items-center mb-12" id="car" data-aos="fade-in">
            <p className='px-8 py-2 text-sm rounded-full bg-[#222222] text-white w-fit shadow'>Only the best cars</p>
            <p className="text-8xl tracking-tight font-medium text-[#222222]">Our featured fleet</p>
            <p className="text-center text-sm text-[#585858] -mt-1">We provide our customer with the most increadible driving emotions. That's why we have only world-class <br /> cars in our fleet.</p>
          </div>
          <div className="grid grid-cols-3 gap-5" data-aos="fade-in">
            <div className="flex flex-col overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
              <img src="https://cdn.pixabay.com/photo/2020/05/19/10/05/opel-5190050_1280.jpg" alt="Fleet" className='h-55 object-cover' />
              <div className="p-5 text-[#222222]">
                <p className="text-xl">Mobil Merah</p>
                <p className="font-light text-sm">Sedan</p>
                <div className="flex flex-row justify-between mt-5 text-[#585858]">
                  <div className="text-sm font-light">
                    <p className='flex items-center'><GoPeople className='me-2'/>2 Passengers</p>
                    <p className='flex items-center'><PiGasPumpLight className='me-2'/>Gasoline</p>
                  </div>
                  <div className="text-sm font-light">
                    <p className='flex items-center'><IoCarSportOutline className='me-2'/>Porsche</p>
                    <p className='flex items-center'><TbManualGearbox className='me-2'/>Manual</p>
                  </div>
                </div>
                <hr className='text-[#585858]/40 border my-5 mx-3'/>
                <div className="flex items-center justify-between mb-3">
                  <p className=''>Price</p>
                  <p className='font-bold text-lg'><span className='text-[#85BB65]'>$220</span><span className='font-light text-sm ms-1'>/day</span></p>
                </div>
                <div className="flex justify-end">
                  <Link to="/" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center'>Rent now <IoArrowForward className='ms-2'/></Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
              <img src="https://cdn.pixabay.com/photo/2016/05/05/18/03/coupe-1374448_1280.jpg" alt="Fleet" className='h-55 object-cover' />
              <div className="p-5">
                <p className='text-xl'>Rolls-Royce Phantom</p>
                <p className="font-light text-sm">Sedan</p>
                <div className="flex flex-row justify-between mt-5 text-[#585858]">
                  <div className="text-sm font-light">
                    <p className='flex items-center'><GoPeople className='me-2'/>5 Passengers</p>
                    <p className='flex items-center'><PiGasPumpLight className='me-2'/>Gasoline</p>
                  </div>
                  <div className="text-sm font-light">
                    <p className='flex items-center'><IoCarSportOutline className='me-2'/>Rolls-Royce</p>
                    <p className='flex items-center'><TbManualGearbox className='me-2'/>Automatic</p>
                  </div>
                </div>
                <hr className='text-[#585858]/40 border my-5 mx-3'/>
                <div className="flex items-center justify-between mb-3">
                  <p className=''>Price</p>
                  <p className='font-bold text-lg'><span className='text-[#85BB65]'>$530</span><span className='font-light text-sm ms-1'>/day</span></p>
                </div>
                <div className="flex justify-end">
                  <Link to="/" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center'>Rent now <IoArrowForward className='ms-2'/></Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden ring-1 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-2xl text-[#222222] ring-[#585858]/10 shadow-lg rounded-2xl">
              <img src="https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg" alt="Fleet" className='h-55 object-cover' />
              <div className="p-5">
                <p className='text-xl'>Mercedes Benz AMG</p>
                <p className="font-light text-sm">Sedan</p>
                <div className="flex flex-row justify-between mt-5 text-[#585858]">
                  <div className="text-sm font-light">
                    <p className='flex items-center'><GoPeople className='me-2'/>3 Passengers</p>
                    <p className='flex items-center'><PiGasPumpLight className='me-2'/>Hybrid</p>
                  </div>
                  <div className="text-sm font-light">
                    <p className='flex items-center'><IoCarSportOutline className='me-2'/>Mercedes Benz</p>
                    <p className='flex items-center'><TbManualGearbox className='me-2'/>Manual</p>
                  </div>
                </div>
                <hr className='text-[#585858]/40 border my-5 mx-3'/>
                <div className="flex items-center justify-between mb-3">
                  <p className=''>Price</p>
                  <p className='font-bold text-lg'><span className='text-[#85BB65]'>$480</span><span className='font-light text-sm ms-1'>/day</span></p>
                </div>
                <div className="flex justify-end">
                  <Link to="/" className='hover:ring-1 hover:ring-[#222222] hover:ring-inset hover:bg-transparent transition duration-300 hover:text-[#222222] bg-[#222222] text-white text-sm px-5 py-2 rounded-full flex items-center'>Rent now <IoArrowForward className='ms-2'/></Link>
                </div>            
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8" data-aos="fade-in">
            <Link to="/fleet" className='ring-1 ring-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all ring-inset rounded-full px-5 py-1.5 w-fit flex items-center gap-2'>Show all vehicles <IoArrowForward /></Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-120 -my-10 justify-center overflow-hidden  text-[#222222]" style={{fontFamily: "Stack Sans Headline"}}>
        <img src={sideGrayCar} alt="gray car" className='-translate-x-40 hover:-translate-x-20 transition duration-500 object-cover'/>
        <div className="flex flex-col justify-center items-center shrink-0" data-aos="fade-in">
          <img src={devGanteng} alt="dev ganteng" className='rounded-full w-30 h-30 object-cover shadow-lg animate-spin [animation-duration:6s]'/>
          <p className='mt-5 mb-3 text-[#585858]'>Have any question?</p>
          <p className='text-2xl'>(+62) 878-7522-1858</p>
        </div>
        <img src={sideBlueCar} alt="blue car" className='translate-x-40 hover:translate-x-20 transition duration-500 object-cover'/>
      </div>
    </>
  )
}

export default App
// gray text: text-[#585858]