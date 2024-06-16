import { FC } from "react";

interface BurgerProps {
    isActive: boolean;
}

const Burger:FC<BurgerProps> = ({isActive}) => {
    return (
        <div className="flex flex-col gap-[2px] relative">
            <div className={`w-[16px] h-[2px] bg-[#FFFFFF] ease-in duration-300 absolute top-[-4px]    ${isActive ? "rotate-[45deg] top-[0]" : ""}`}></div>
            <div className={`w-[16px] h-[2px] bg-[#FFFFFF] ease-in duration-300                         ${isActive ? "opacity-[0]" : ""}`}></div>
            <div className={`w-[16px] h-[2px] bg-[#FFFFFF] ease-in duration-300 absolute bottom-[-4px] ${isActive ? "rotate-[-45deg] bottom-[0]" : ""}`}></div>
        </div>
    )
}

export default Burger