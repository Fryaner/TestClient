import CatalogPopUp from "./catalogPopUp";
import MediaQuery from 'react-responsive'
import InputSearch from "../../UI/InputSearch";
import Logo from "../../UI/Logo";
import Favorite from "../../UI/Favorite";
import Basket from "../../UI/Basket";
import User from "../../UI/User";
import Mobileheader from "./mobileHeader";
import {NavLink } from "react-router-dom";


const Header = () => {
    return (
        <header>
            <MediaQuery minWidth={768}>
            <div className="bg-[#8761D9]/[50%]">
        <div className="flex max-md:flex-col max-w-[1440px] m-auto justify-between py-4 px-4">
            <nav>
                <ul className="flex gap-[24px] max-md:flex-col  max-md:gap-[16px]">
                    <li><NavLink to="pay" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Оплата</NavLink></li>
                    <li><NavLink to="delivery" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Доставка</NavLink></li>
                    <li><NavLink to="trade" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Обмен и возврат</NavLink></li>
                </ul>
            </nav>
            <div className="flex max-md:flex-col gap-[16px]">
                <p className="text-zinc-600">Доставка с 8:00 до 23:00</p>
                <p>+7 (924) 218 33 76</p>
            </div>
        </div>
    </div>
                    <div className="flex items-center max-w-[1440px] m-auto gap-[35px] py-6 px-4">
                        <div className="flex gap-[4px]">
                            <Logo/>
                        </div>
                        <div className="flex items-center gap-[16px] flex-auto">
                            <CatalogPopUp/>
                            <InputSearch/>
                        </div>
                        <div className="flex items-center">
                            <div className="flex gap-4">
                                <User/>
                                <div className="flex gap-2">
                                    <Favorite/>
                                    <Basket/>
                                </div>
                            </div>
                        </div>
                    </div>
            </MediaQuery>
            <MediaQuery maxWidth={768}>
                <Mobileheader/>
            </MediaQuery>
        </header>
    )
}

export default Header;