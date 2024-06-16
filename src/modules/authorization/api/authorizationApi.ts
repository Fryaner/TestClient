import mainApi from '../../../store/mainApi';
import { UserModel } from '../../../models/userModel';
import { RegisterModel } from '../../../models/registerModel';

const authorizationApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<RegisterModel, UserModel>({
            query: (body) => ({
                url: 'user/login',
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
        }),
        logout: build.mutation<string, void>({
            query: () => ({
                url: 'user/logout',
                method: 'POST',
            })
        }),
        getBasket: build.mutation<{id: number}, {userId: number | undefined}>({
            query: (body) => ({
                url: 'basket',
                method: 'POST',
                body
            })
        }),
        getFavorite: build.mutation<{id: number}, {userId: number | undefined}>({
            query: (body) => ({
                url: 'favorite',
                method: 'POST',
                body
            })
        }),
    }),
})

export const { 
    useLoginMutation,
    useLogoutMutation,
    useGetBasketMutation,
    useGetFavoriteMutation,
} = authorizationApi;