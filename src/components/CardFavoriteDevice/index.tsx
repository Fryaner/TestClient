import { FC } from "react";
import { Button } from "../../UI/Button";
import { Heart, RussianRuble, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import RatingStars from "../../modules/feedBack/components/ratingStars";

interface CardFavoriteDeviceProps {
    id: number;
    model: string;
    raiting: number;
    image: string;
    price: number;
    handlerControllFavorite: (deviceId: number) => void;
    handlerAddDeviceBasket: (deviceId: number, price: number) => void;
    dataDevices: { id: number; deviceId: number }[];
}

const CardFavoriteDevice:FC<CardFavoriteDeviceProps> = ({
    id, 
    model,
    raiting,
    image,
    price, 
    dataDevices,
    handlerControllFavorite,
    handlerAddDeviceBasket,
    }) => {
    const isActive = dataDevices.find((item) => item.deviceId === id);
    return (
        <div className="w-[31%] max-lg:w-[48%] max-md:w-full flex flex-col justify-between">
            <div className="flex flex-col gap-4 h-full relative p-4 border-r-2 border-[#8761D9] border-t-2 border-[#8761D9] border-l-2 border-[#8761D9]">
                <div>
                    <div className="h-[400px]">
                    <Link className="h-full" to={`/device/${id}`}>
                    <img className="h-full object-contain" src={`http://localhost:8000/${image}`} alt={model}/>
                    </Link>
                    </div>
                <Button variant="link" size="icon" className="absolute top-4 right-4 p-0" onClick={() => handlerControllFavorite(id)} >
                        <Heart className={`${isActive ? "fill-[pink]" : "fill-[white]"}`}/>
                </Button>
                </div>
                <Link className="flex justify-between px-4" to={`/device/${id}`}>
                    <p>{model}</p>
                    <p className="flex">{price}<RussianRuble/></p>   
                </Link>
                <div className="px-4">
                    <RatingStars id={id}/>    
                </div>

            </div>
            <div className="flex flex-col gap-4 justify-between">
                <Button className="rounded-none rounded-b-lg bg-[#8761D9]" onClick={()=> handlerAddDeviceBasket(id, price)} >Добавить в корзину<ShoppingBag/></Button>
            </div>
        </div>
    )
}

export default CardFavoriteDevice;