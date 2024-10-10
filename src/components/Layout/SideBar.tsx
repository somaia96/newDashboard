import { Button } from "@material-tailwind/react"
import { NavLink } from "react-router-dom"
import { navLink } from "../../data"
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    let navigate = useNavigate()
    const logOutHandler =()=>{
        localStorage.removeItem("tokenMunicipality")
        setTimeout(()=>{
            navigate("/login")
        } ,1000);
    }

    return (
        <nav className="bg-[#F8F0E5] px-7 right-0 top-0 fixed py-10 text-gray-500 w-1/5 h-screen">
            <div className="flex flex-col space-y-10 items-center justify-start h-full">
                <div className="flex w-4/5 flex-col space-y-3 items-center justify-center">
                    <div className="flex items-center  justify-center">
                        <img className="w-10 h-10" src="/images/logo.png" alt="" />
                        <h3 className="text-[#524F4D] font-bold text-lg">بلدية ضاحية الأسد</h3>
                    </div>
                    <div className="bg-primary w-full rounded-full flex items-center justify-between py-1 px-5">
                        <div className="flex items-center justify-center gap-1">
                            <img className="w-8 h-8 rounded-full" src="/images/admin.jfif" alt="" />
                            <div className="">
                                <h2 className="text-sm text-white">مازن سعيد</h2>
                                <h3 className="text-sm">مدير</h3>
                            </div>
                        </div>
                        <div>
                        <i className="fa-lg fa-regular fa-bell"></i>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-10 space-y-3 border-y-2 border-gray-300 items-center justify-center gap-4 text-lg">
                    {navLink.map((item, i) => <NavLink key={i} to={item.link}>{item.text}</NavLink>)}
                </div>
                <Button onClick={logOutHandler} className="bg-transparent p-3 border-0 ring-0 shadow-none p-0 text-gray-600 text-xl" >
                <i className="fa-solid fa-right-from-bracket mx-4"></i> 
                    تسجيل الخروج
                    </Button>
            </div>
        </nav>
    )
}

export default SideBar
