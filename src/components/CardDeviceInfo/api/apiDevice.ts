import { BrandModel } from '../../../models/brandModel';
import { DeviceModel } from '../../../models/deviceModel';
import { TypeModel } from '../../../models/typeModel';
import mainApi from '../../../store/mainApi';

const apiDevice = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getDeviceOne: build.query<DeviceModel, {id: number | undefined}>({
            query: (body) => `device/${body.id}`
        }),
        getBrand: build.query<BrandModel[], void>({
            query: () => `brand`
        }),
        getType: build.query<TypeModel[], void>({
            query: () => `type`
        }),
        getBasketDeviceId: build.query<{id: number, deviceId: number}[], {basketId: number | undefined}>({
            query: (body) => `basket/basketDevice/${body.basketId}`
        }),
        getFavoriteDeviceId: build.query<{id: number, deviceId: number}[], {favoriteId: number | undefined}>({
            query: (body) => `basket/basketDevice/${body.favoriteId}`
        }),
        addDeviceToBasket: build.mutation<{}, {basketId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'basket/addDevice',
                method: 'POST',
                body
            })
        }),
        addDeviceToFavorite: build.mutation<{}, {favoriteId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/addDevice',
                method: 'POST',
                body
            })
        }),
        deleteDeviceToFavorite: build.mutation<{}, {favoriteId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/deleteDevice',
                method: 'DELETE',
                body
            })
        }),
    }),
})

export const { 
    useGetDeviceOneQuery,
    useGetBrandQuery,
    useGetTypeQuery,
    useAddDeviceToBasketMutation,
    useGetBasketDeviceIdQuery,
    useAddDeviceToFavoriteMutation,
    useGetFavoriteDeviceIdQuery,
    useDeleteDeviceToFavoriteMutation,
} = apiDevice;