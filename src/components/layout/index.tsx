import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header/index";

const Layout = () => {
    return (
        <>
            <Header/>
            <div className="max-w-[1440px] m-auto">
                <Outlet/>  
            </div>

            <Footer/>
        </>
    )
}

export default Layout;