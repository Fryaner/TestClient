import { Device } from '../../../models/deviceModel';
import mainApi from '../../../store/mainApi';

const basketApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getBasketDeviceId: build.query<{id: number, deviceId: number}[], {basketId: number | undefined}>({
            query: (body) => `basket/basketDevice/${body.basketId}`
        }),
        getFavoriteDeviceId: build.query<{id: number, deviceId: number}[], {favoriteId: number | undefined}>({
            query: (body) => `favorite/${body.favoriteId}`
        }),
        deleteBasketDevice: build.mutation<{}, {basketId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'basket/deleteDevice',
                method: 'DELETE',
                body,
            })
        }),
        reduceBasketDevice: build.mutation<{}, {id: number | undefined, basketId: number | undefined}>({
            query: (body) => ({
                url: 'basket/reduceDevice',
                method: 'DELETE',
                body,
            })
        }),
        addBasketDevice: build.mutation<{}, {basketId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'basket/addDevice',
                method: 'POST',
                body,
            })
        }),
        addFavoriteDevice: build.mutation<{}, {favoriteId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/addDevice',
                method: 'POST',
                body,
            })
        }),
        deleteFavoriteDevice: build.mutation<{}, {favoriteId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/deleteDevice',
                method: 'DELETE',
                body,
            })
        }),
        getBasketDevice: build.query<Device, void>({
            query: () => `device`,
        }),
    }),
})

export const { 
    useGetBasketDeviceIdQuery,
    useGetBasketDeviceQuery,
    useDeleteBasketDeviceMutation,
    useAddBasketDeviceMutation,
    useReduceBasketDeviceMutation,
    useAddFavoriteDeviceMutation,
    useDeleteFavoriteDeviceMutation,
    useGetFavoriteDeviceIdQuery,
} = basketApi;