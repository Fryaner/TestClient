import { useEffect } from "react"
import { Input } from "../../../../UI/Input"
import { Separator } from "../../../../UI/Separator"
import CardDevice from "../../../../components/CardDevice"
import { 
    useGetDevicesQuery, 
    useGetBrandDevicesQuery,
    useGetTypeDevicesQuery,
    useAddBasketDeviceMutation,
    useGetBasketDeviceIdQuery,
    useAddFavoriteDeviceMutation,
    useGetFavoriteDeviceIdQuery,
    useDeleteFavoriteDeviceMutation,
 } from "../../api/catalogApi"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { basketDeviceCountMinus, totalAmountBasketMinus } from "../../../../store/basketSlice"
import { favoriteDeviceCountMinuse } from "../../../../store/favoriteSlice"
import {   Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "../../../../UI/Select"
import { useToast } from "../../../../UI/UseToast"
import { Check } from "lucide-react"

const CatalogMouse = () => {
    const {id} = useParams();
    const dispath = useDispatch();

    const basketId = Number(localStorage.getItem('basketId'));
    const favoriteId = Number(localStorage.getItem('favoriteId'));

    const {data: dataDevices } = useGetDevicesQuery();

    const {data: dataDevicesId, refetch: refetchBasket} = useGetBasketDeviceIdQuery({basketId});
    const {data: dataDevicesIdFavorite, refetch: refetchFavorite} = useGetFavoriteDeviceIdQuery({favoriteId});

    const {data: dataBrands} = useGetBrandDevicesQuery();
    const {data: dataTypes} = useGetTypeDevicesQuery();

    const [addDevice, {data: dataAddDevice}] = useAddBasketDeviceMutation();
    const [addFavorite, {data: dataAddDeviceFavorite}] = useAddFavoriteDeviceMutation();
    const [deleteFavorite, {data: dataDeleteDeviceFavorite}] = useDeleteFavoriteDeviceMutation();

    const {toast} = useToast();

    const needDevices = dataDevices?.rows.filter((device) => device.typeId === Number(id));

    const handlerAddDevice = (deviceId: number, devicePrice: number) => {
        addDevice({
            basketId,
            deviceId
        })
        toast({
            title: 'Вы успешно добавили товар в корзину.',
            action: <Check/>
        })
        if (!dataDevicesId) {
            return;
        } 
        localStorage.setItem('totalAmount', String(Number(localStorage.getItem('totalAmount')) + devicePrice))
    }

    const handlerControllerFavorite = (deviceId: number, isFavorite: boolean | undefined) => {
        if (isFavorite) {
            deleteFavorite({ favoriteId, deviceId });
            toast({
                title: 'Вы удалили товар из избранного.',
                action: <Check/>
            })
            return;
        } 
            addFavorite({ favoriteId, deviceId });
            toast({
                title: 'Вы добавили товар в избранное.',
                action: <Check/>
            })
  
    };

    useEffect(() => {
        refetchBasket();
    }, [dataAddDevice])

    useEffect(() => {
        refetchFavorite();
    }, [dataAddDeviceFavorite, dataDeleteDeviceFavorite])

    useEffect(() => {
        if (!dataDevicesId || dataDevicesId.length === 0) {
            return;
        }
        localStorage.setItem('counts', String(dataDevicesId?.length))
        dispath(basketDeviceCountMinus(1));
        dispath(totalAmountBasketMinus(1));

    }, [dataDevicesId])

    useEffect(() => {
        if (!dataDevicesIdFavorite) {
            return;
        }
        localStorage.setItem('countsFavorite', String(dataDevicesIdFavorite?.length))
        dispath(favoriteDeviceCountMinuse(1));
    }, [dataDevicesIdFavorite])

    if (!needDevices || needDevices.length === 0) {
        return <p className="px-4 flex justify-center items-center font-bold h-dvh text-center">Данные товары ещё не появились на площадке. Приносим свои извинения</p>;
    }
    const nameType = dataTypes?.find((type) => type.id === Number(id));
    return (
        <div className="flex gap-4 px-4 max-md:flex-col">
            <div className="w-[20%] max-md:w-full">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h4>Фильтрация</h4>
                        <div className="flex gap-1 flex-col">
                            <p>Бренд:</p>
                            <Select>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Выберите бренд" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="flex gap-1 flex-col">
                            <p>Цена:</p>
                            <div className="flex gap-2 items-center">
                                <Input type="text" placeholder="От"/>
                                <p>-</p>
                                <Input type="text" placeholder="До"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p>Цвет:</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите цвет" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4>Сортировка</h4>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="По умолчанию" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div>
                <Separator orientation="vertical" className="h-full"/>
            </div>
            <div className="w-full flex flex-1 w-full flex-col gap-4">
                <p className="text-[18px] font-bold">{nameType?.name}</p>
                <div className="flex flex-1 w-full flex-wrap gap-4 justify-between">
                    {needDevices.map((device) => 
                        dataBrands?.map((brand) => 
                            brand.id === device.brandId ?
                                dataTypes?.map((type) =>   
                                    type.id === device.typeId ?                     
                                <CardDevice 
                                    dataDevicesIdFavorite={dataDevicesIdFavorite} 
                                    handlerControllerFavorite={handlerControllerFavorite}
                                    handlerAddDevice={handlerAddDevice}
                                    id={device.id}
                                    brand={brand.name} 
                                    image={device.image} 
                                    model={device.model} 
                                    price={device.price} 
                                    type={type.name}
                                    rating={device.rating} 
                                    key={device.id} 
                                    descriptionImage={type.name}/>
                                    : <></>)
                            : <></>) 
                    )}
                </div>  
            </div>
        </div>
    )
}

export default CatalogMouse;