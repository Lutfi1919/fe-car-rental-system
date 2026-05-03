import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Catalog() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
            easing: "ease-in-out"
        })
    }, [])
    return (
        <>
            <div className="p-5 pt-25" style={{fontFamily: "Stack Sans Headline"}}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt laudantium sed dolor et architecto alias, fuga molestiae commodi quas dolorem corrupti voluptates sunt rem inventore adipisci perferendis soluta nam sit!</p>
            </div>
        </>
    )
}