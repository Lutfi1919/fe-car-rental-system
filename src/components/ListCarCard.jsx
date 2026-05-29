import CarCardComp from "./CarCardComp";

export default function ListCarCard({ data, type }) {
    return (
        <>
            {
                type === "admin" ?
                <div className="flex flex-wrap mx-auto gap-5" data-aos="fade-in">
                    {
                        data.map((item) => (<CarCardComp item={item} type={"admin"}/>))
                    }
                </div>
                :
                <div className="grid grid-cols-3 justify-center gap-5" data-aos="fade-in">
                    {
                        data.map((item) => (<CarCardComp item={item}/>))
                    }
                </div>

            }
        </>
    )
} 