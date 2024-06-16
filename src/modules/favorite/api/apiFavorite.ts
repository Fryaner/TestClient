import mainApi from '../../../store/mainApi';

const apiFavorite = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getFavoriteDevices: build.query<{id: number, deviceId: number}[], {id: number | undefined}>({
             query: (body) =>  `favorite/${body.id}`
        }),
        getBasketDevices: build.query<{id: number, deviceId: number}[], {basketId: number | undefined}>({
            query: (body) =>  `basket/basketDevice/${body.basketId}`
       }),
        getFavorite: build.query<{}, {userid: number}>({
            query: () =>  `favorite`
       }),
        deleteDevice: build.mutation<{}, {favoriteId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/deleteDevice',
                method: 'DELETE',
                body,
            })
        }),
        addDevice: build.mutation<{}, {favoriteId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/addDevice',
                method: 'POST',
                body,
            })
        }),
        addDeviceBasket: build.mutation<{}, {basketId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'basket/addDevice',
                method: 'POST',
                body,
            })
        }),
    }),
})

export const { 
    useDeleteDeviceMutation,
    useGetFavoriteDevicesQuery,
    useGetFavoriteQuery,
    useAddDeviceMutation,
    useAddDeviceBasketMutation,
    useGetBasketDevicesQuery,
    } = apiFavorite;