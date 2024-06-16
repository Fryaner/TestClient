import mainApi from '../../../store/mainApi';
import { Device } from '../../../models/deviceModel';
import { BrandModel } from '../../../models/brandModel';
import { TypeModel } from '../../../models/typeModel';

const catalogApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getDevices: build.query<Device, void>({
             query: () => 'device'
        }),
        getBasketDeviceId: build.query<{id: number, deviceId: number}[], {basketId: number | undefined}>({
            query: (body) => `basket/basketDevice/${body.basketId}`
        }),
        getFavoriteDeviceId: build.query<{id: number, deviceId: number}[], {favoriteId: number | undefined}>({
            query: (body) => `favorite/${body.favoriteId}`
        }),
        getBrandDevices: build.query<BrandModel[], void>({
            query: () => 'brand'
        }),
        getTypeDevices: build.query<TypeModel[], void>({
        query: () => 'type'
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
    }),
})

export const { 
    useGetDevicesQuery, 
    useGetBrandDevicesQuery,
    useGetTypeDevicesQuery,
    useAddBasketDeviceMutation,
    useGetBasketDeviceIdQuery,
    useAddFavoriteDeviceMutation,
    useGetFavoriteDeviceIdQuery,
    useDeleteFavoriteDeviceMutation,
    } = catalogApi;