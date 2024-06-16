import { useEffect } from "react";
import { Button } from "../../UI/Button";
import { useSelector } from "react-redux";
import {ShoppingBasket} from "lucide-react";
import { RussianRuble } from "lucide-react"
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
const Basket = () => {
    const basketDeviceCount = useSelector((state:RootState) => state.basket.basketDeviceCount);
    const isAuth = useSelector((state:RootState) => state.auth.isAuth);
    useEffect(() => {

    }, [basketDeviceCount, isAuth])

    return (
        <Link to="basket" className="flex gap-4">
            <div className="relative">
                <ShoppingBasket/>
                {localStorage.getItem('isAuth') === 'true' ? 
                        localStorage.getItem('counts') ? 
                        <p className="text-[white] text-[13px] absolute top-[-10px] bg-[#8761D9] right-[-10px] w-[auto] h-[auto] px-1 h-4 flex justify-center items-center rounded-full">
                             {localStorage.getItem('counts')}
                        </p>: <p></p> : <p></p>} 
            </div>
            <MediaQuery minWidth={768}>
                <div className="flex items-center gap-[3px]">
                    <p className="whitespace-nowrap">
                    {localStorage.getItem('isAuth') === 'true' ? 
                            localStorage.getItem('totalAmount') ? localStorage.getItem('totalAmount') : 0 : 0}
                    </p>
                    <RussianRuble className="w-[16px] h-[16px]"/>
                </div>  
            </MediaQuery>        
        </Link>
    )
}

export default Basket;