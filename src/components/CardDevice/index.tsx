import { FC, useEffect } from "react";
import { Button } from "../../UI/Button";
import { Heart, RussianRuble, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { boolean } from "zod";
import RatingStars from "../../modules/feedBack/components/ratingStars";
interface CardDeviceProps {
    id: number;
    model?: string;
    brand?: string;
    type?: string;
    image?: string;
    descriptionImage?: string;
    rating?: number;
    price: number;
    handlerAddDevice: (deviceId: number, devicePrice: number) => void;
    handlerControllerFavorite:(deviceId: number, isFavorite: boolean | undefined) => void;
    dataDevicesIdFavorite: { id: number; deviceId: number; }[] | undefined;
}


const CardDevice:FC<CardDeviceProps> = ({
    id, 
    model, 
    image, 
    descriptionImage,
     rating = 5, 
     price, 
     brand, 
     type,
    handlerAddDevice,
    handlerControllerFavorite,
    dataDevicesIdFavorite,
}) => {

    const starElements = Array.from({ length: 5 }, (_, index) => index < rating);
    const isFavorite = dataDevicesIdFavorite?.some(item => item.deviceId === id);
    
    return (
            <div className="flex flex-col w-[31%] max-lg:w-[48%]  max-md:w-full border p-4 gap-4 rounded justify-between">
                <div className="flex flex-col gap-4">
                    <div className="relative z-0">
                        <Link to={`/device/${id}`}>
                            <div className="h-[300px]">
                                <img  className="h-full object-contains" src={`http://localhost:8000/${image}`} alt={descriptionImage}/>
                            </div>
                          
                            </Link>
                        <Button onClick={() => handlerControllerFavorite(id, isFavorite)} className="w-[24px] h-[24px] absolute top-0 right-0" variant="link" size="icon">
                            <Heart className={`hover:fill-[gray] ${isFavorite ? "fill-[pink]" : "fill-[white]"}`}/>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link to={`/device/${id}`}>
                            <p className="font-bold">{type}/{model}/{brand}</p>
                            </Link>
                        <p className="flex items-center">{price} <RussianRuble className="w-4 h-4"/></p>
                        <div className="flex">
                            <RatingStars id={id}/>
                        </div>
                    </div>
                </div>
                <Button onClick={() => handlerAddDevice(id, price)} className="bg-[#5129A5] flex gap-2 items-center">
                    <p>Добавить в корзину</p>
                    <ShoppingBag className="w-5"/>
                </Button>
            </div>
    )
}

export default CardDevice;