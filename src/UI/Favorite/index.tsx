import {Heart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const Favorite = () => {
    const favoriteDeviceCount = useSelector((state:RootState) => state.favorite.favoriteDeviceCount);
    const isAuth = useSelector((state:RootState) => state.auth.isAuth);
    useEffect(() => {

    }, [favoriteDeviceCount, isAuth])

    return (
        <div className="h-[24px]">
            <Link to="favorite" className="flex gap-4">
                <div className="relative">
                    <Heart/>
                    {localStorage.getItem('isAuth') === 'true' ? 
                            localStorage.getItem('countsFavorite') ? 
                            <p className="text-[white] text-[13px] absolute top-[-10px] bg-[#8761D9] right-[-10px] w-[auto] h-[auto] px-1 h-4 flex justify-center items-center rounded-full">
                                {localStorage.getItem('countsFavorite') }
                            </p>
                                : <p></p> : <p></p>} 
                </div> 
            </Link>
        </div>
    )
}

export default Favorite;