import { useParams } from "react-router-dom";
import { 
    useGetDeviceOneQuery, 
    useGetBrandQuery, 
    useGetTypeQuery,
    useAddDeviceToBasketMutation,
    useGetBasketDeviceIdQuery,
    useAddDeviceToFavoriteMutation,
    useGetFavoriteDeviceIdQuery,
    useDeleteDeviceToFavoriteMutation,
} from "../../api/apiDevice";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "../../../../UI/Button";
import { Separator } from "../../../../UI/Separator";
import { Spinner } from "@radix-ui/themes";
import { useDispatch } from "react-redux";
import { basketDeviceCountMinus } from "../../../../store/basketSlice";
import { useEffect } from "react";
import { favoriteDeviceCountPlus } from "../../../../store/favoriteSlice";
import {  Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../UI/Tabs";
import FeedBackDevices from "../../../../modules/feedBack/components/feedBackDevices";
import RatingForm from "../../../../modules/feedBack/components/ratingForm";
import RatingStars from "../../../../modules/feedBack/components/ratingStars";
import { useToast } from "../../../../UI/UseToast";

const DeviceInfo = () => {
    const basketId = Number(localStorage.getItem('basketId'));
    const favoriteId = Number(localStorage.getItem('favoriteId'));

    const {id} = useParams();

    const {data: dataDeviceInfo} = useGetDeviceOneQuery({id: Number(id)});
    const {data: dataBrand} = useGetBrandQuery();
    const {data: dataType} = useGetTypeQuery();

    const [addDevice, {data: dataAddDevice, isLoading: isAddDeviceLoading}] = useAddDeviceToBasketMutation();
    const [addDeviceFavorite, {data: dataAddDeviceFavorite}] = useAddDeviceToFavoriteMutation();
    const [deleteDeviceFavorite, {data: dataDeleteDeviceFavorite}] = useDeleteDeviceToFavoriteMutation();

    const {data: dataDeviceId, refetch: refetchBasket} = useGetBasketDeviceIdQuery({basketId})
    const {data: dataDeviceIdFavorite, refetch: refetchFavorite} = useGetFavoriteDeviceIdQuery({favoriteId})

    const dispath = useDispatch();
    const {toast} = useToast();

    useEffect(() => {
        if (!dataDeviceId) {
            return;
        }
        refetchBasket()
    }, [dataAddDevice])

    
    useEffect(() => {
        refetchFavorite()
    }, [dataAddDeviceFavorite, dataDeleteDeviceFavorite])

    useEffect(() => {
        if (!dataDeviceId) {
            return;
        }        
        if(!dataDeviceInfo) {
            return;
        }
        localStorage.setItem('counts', String(dataDeviceId?.length))
        dispath(basketDeviceCountMinus(1));
        dispath(basketDeviceCountMinus(1));
    }, [dataDeviceId])

    useEffect(() => {
        if (!dataDeviceIdFavorite) {
            return;
        }        
        if(!dataDeviceInfo) {
            return;
        }
        localStorage.setItem('countsFavorite', String(dataDeviceIdFavorite?.length))
        dispath(favoriteDeviceCountPlus(1));
    }, [dataDeviceIdFavorite])

    if (!dataDeviceInfo) {
        return <></>;
    }
    const isFavorite = dataDeviceIdFavorite?.find((item) => item.deviceId === dataDeviceInfo.id)

    const handlerAddDevice = () => {
        addDevice({
            basketId,
            deviceId: dataDeviceInfo.id
        })
        toast({
            title: 'Вы добавили товар в корзину.',
            action: <Check/>
        })
        localStorage.setItem('totalAmount', String(Number(localStorage.getItem('totalAmount')) + dataDeviceInfo.price))
    }

    const handlerControllFavorite = () => {
        if (isFavorite) {
            deleteDeviceFavorite({
                favoriteId,
                deviceId: dataDeviceInfo.id
            })
            toast({
                title: 'Вы удалили товар из избранного.',
                action: <Check/>
            })
            return;
        }
        addDeviceFavorite({
            favoriteId,
            deviceId: dataDeviceInfo.id
        })
        toast({
            title: 'Вы добавили товар в избранное.',
            action: <Check/>
        })
    }
    const nameBrandDevice = dataBrand?.find((brand) => brand.id === dataDeviceInfo?.brandId);
    const nameTypeDevice = dataType?.find((type) => type.id === dataDeviceInfo?.typeId);
    const starElements = Array.from({ length: 5 }, (_, index) => index < dataDeviceInfo?.rating);
    return (
        <div className="flex flex-col gap-12 px-4 pt-6">
            <div className="flex gap-12 max-md:flex-col">
                <div className="w-[50%] max-md:w-full flex justify-center items-center">
                    <img src={`http://localhost:8000/${dataDeviceInfo?.image}`} alt={`${dataDeviceInfo?.model}/${nameBrandDevice?.name}/${nameTypeDevice?.name}`}/>
                </div>
                <div className="flex flex-col justify-center w-[50%] gap-6 max-md:w-full">
                    <div className="flex flex-col gap-4">
                        <p className="flex items-center font-bold text-[24px]">
                            {dataDeviceInfo?.model}/{nameBrandDevice?.name}/{nameTypeDevice?.name}
                            <Button onClick={() => handlerControllFavorite()} className="p-0 h-full" variant="link" size="icon">
                                <Heart className={`hover:fill-[gray] ${isFavorite ? "fill-[pink]" : "fill-[white]"}`}/>
                            </Button>
                        </p>
                            <RatingStars id={Number(id)}/>
                        <Separator/>
                        <p className="flex">Доступно в рассрочку от {(Math.round((dataDeviceInfo.price/6) * 10)/10).toFixed(0)} ₽/мес.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-[24px] font-bold flex items-center">{dataDeviceInfo?.price} ₽</p>
                        <div className="flex flex-1 items-end">
                            <Button onClick={() => handlerAddDevice()} className="flex flex-1 bg-[#8761D9]">
                                {isAddDeviceLoading ? <Spinner/> : <p className="flex flex-1 justify-center gap-2">Добавить в корзину<ShoppingBag className="w-5"/></p>}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
            <Tabs defaultValue="characteristic">
                <TabsList className="w-full">
                    <TabsTrigger value="characteristic" className="w-full">Характеристики</TabsTrigger>
                    <TabsTrigger value="rating"  className="w-full">Отзывы</TabsTrigger>
                </TabsList>
                <TabsContent value="characteristic">
                {dataDeviceInfo.info.length === 0 ? <p className="pt-6">Характеристики товара ещё не были указаны. Приносим извинения.</p> :
                <ul>
                    {dataDeviceInfo?.info.map((info) =>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center pt-6">
                            <li className="flex-1 font-bold">{info.title}</li>
                            <li className="flex-1">{info.description}</li>
                        </div>
                        <Separator/>
                    </div>
                    )}
                </ul>
                }
                </TabsContent>
                <TabsContent value="rating" className="pt-6 flex flex-col gap-12">
                    {localStorage.getItem("isAuth") === "true" ? <RatingForm/> : <></>}
                    <FeedBackDevices/>
                </TabsContent>
            </Tabs>
            </div>
        </div>
    )
}

export default DeviceInfo;