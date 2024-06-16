import { RatingModel } from '../../../models/ratingModel';
import { UserModel } from '../../../models/userModel';
import mainApi from '../../../store/mainApi';

const ratingApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getRatingDevices: build.query<RatingModel[], {deviceId: number | undefined}>({
             query: (body) =>  `rating/${body.deviceId}`
        }),
        getRatingDevice: build.query<RatingModel, {userId: number | undefined, deviceId: number | undefined}>({
            query: (body) =>  `rating/currentRate/${body.userId}/${body.deviceId}`
       }),
        getUserCurrent: build.query<UserModel, {id: number | undefined}>({
            query: (body) =>  `user/${body.id}`
       }),
        addRatingDevice: build.mutation<{}, {userId: number | undefined, deviceId: number | undefined, rate: number, feedback: string}>({
            query: (body) => ({
                url: 'rating/create',
                method: 'POST',
                body,
            })
        }),
        deleteRatingDevice: build.mutation<{}, {userId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'rating/delete',
                method: 'DELETE',
                body,
            })
        }),
        updateRatingDevice: build.mutation<{}, {userId: number | undefined, deviceId: number | undefined, rate: number, feedback: string}>({
            query: (body) => ({
                url: 'rating/update',
                method: 'PATCH',
                body,
            })
        }),
    }),
})

export const { 
    useAddRatingDeviceMutation,
    useDeleteRatingDeviceMutation,
    useGetRatingDevicesQuery,
    useGetUserCurrentQuery,
    useGetRatingDeviceQuery,
    useUpdateRatingDeviceMutation
    } = ratingApi;