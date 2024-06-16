import CardFavoriteDevice from "../../../../components/CardFavoriteDevice";
import { 
    useGetFavoriteQuery, 
    useDeleteDeviceMutation, 
    useGetFavoriteDevicesQuery, 
    useAddDeviceMutation,
    useAddDeviceBasketMutation,
    useGetBasketDevicesQuery
} from "../../api/apiFavorite";
import { useGetDevicesQuery } from "../../../catalog/api/catalogApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { favoriteDeviceCountMinuse } from "../../../../store/favoriteSlice";
import { basketDeviceCountMinus } from "../../../../store/basketSlice";
import { useToast } from "../../../../UI/UseToast";
import { Check } from "lucide-react";
const FavoritePage = () => {
    const favoriteId = Number(localStorage.getItem('favoriteId'));
    const basketId = Number(localStorage.getItem('basketId'));

    const dispatch = useDispatch();

    const {data: dataDevices, refetch: refetchFavorite} = useGetFavoriteDevicesQuery({id: favoriteId});
    const {data: dataDevicesBasket, refetch: refetchBasket} = useGetBasketDevicesQuery({basketId});
    const {data: dataAllDevices} = useGetDevicesQuery();

    const [addDevice, {data: dataAddDevice}] = useAddDeviceMutation();
    const [addDeviceBasket, {data: dataAddDeviceBasket}] = useAddDeviceBasketMutation();
    const [deleteDevice, {data: dataDeleetDevice}] = useDeleteDeviceMutation();

    const {toast} = useToast();

    useEffect(() => {
        refetchFavorite();
    }, [dataAddDevice, dataDeleetDevice])

    useEffect(() => {
        refetchBasket();
    }, [dataAddDeviceBasket])

    useEffect(() => {
        if (!dataDevices) {
            return;
        }
        localStorage.setItem('countsFavorite', String(dataDevices?.length))
        dispatch(favoriteDeviceCountMinuse(1));
    }, [dataDevices])
    
    useEffect(() => {
        if (!dataDevicesBasket) {
            return;
        }
        localStorage.setItem('counts', String(dataDevicesBasket?.length))
        dispatch(basketDeviceCountMinus(1));
    }, [dataDevicesBasket])

    if(!dataDevices) {
        return <></>;
    }

    const handlerControllFavorite = (deviceId: number) => {
            deleteDevice({
                favoriteId,
                deviceId
            })
            toast({
                title: 'Вы удалили товар из избранного.',
                action: <Check/>
            })
    }

    const handlerAddDeviceBasket = (deviceId: number, price: number) => {
        addDeviceBasket({
            basketId,
            deviceId,
        })
        toast({
            title: 'Вы добавили товар в корзину.',
            action: <Check/>
        })
        localStorage.setItem('totalAmount', String(Number(localStorage.getItem('totalAmount'))+ price))
    }
    
    return (
        <div className="px-4 pt-4">
            {dataDevices.length === 0 ? <p className="text-cenetr font-bold text-[18px] flex justify-center items-center px-4 h-dvh">Избранное пусто. Добавьте товары из каталога.</p> :
            <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold">Избранное</h3>
            <div className="flex flex-wrap gap-4 max-md:flex-col max-md:flex-nowrap">
            {dataDevices?.map((deviceId) => 
                    dataAllDevices?.rows.map((device) =>                
                         deviceId.deviceId === device.id ? 
                        <CardFavoriteDevice
                        dataDevices={dataDevices}
                        handlerControllFavorite={handlerControllFavorite}
                        handlerAddDeviceBasket={handlerAddDeviceBasket}
                        id={device.id}
                        image={device.image}
                        model={device.model}
                        price={device.price}
                        raiting={device.rating}
                        /> : <></>
                )
            )}
            </div>
            </div>
    }
        </div>
    )
}

export default FavoritePage;