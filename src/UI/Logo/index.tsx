import { NavLink } from "react-router-dom";
import {Aperture} from "lucide-react";

const Logo = () => {
    return (
        <NavLink to="/" className="flex gap-[4px] text-[32px] items-center text-[#8761D9] font-bold">
            <Aperture size={32} strokeWidth={2} />
            Atom
        </NavLink>
    )
}

export default Logo;