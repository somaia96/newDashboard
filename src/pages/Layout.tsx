import { Outlet } from "react-router-dom"
import SideBar from "../components/Layout/SideBar"

const Layout = () => {
  return <div className="flex w-4/5 absolute top-0 left-0">
    <SideBar />
    <div className="container my-5">
      <Outlet />
    </div>
  </div>
}

export default Layout