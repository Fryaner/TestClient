import mainApi from '../../../store/mainApi';
import { UserModel } from '../../../models/userModel';
import { RegisterModel } from '../../../models/registerModel';

const registerApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<UserModel[], void>({
            query: () => 'user'
        }),
        addUser: build.mutation<RegisterModel, UserModel>({
            query: (body) => ({
                url: 'user/registration',
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
        }),
        createBasket: build.mutation<{id: number}, {userId: number | undefined}>({
            query: (body) => ({
                url: 'basket/create',
                method: 'POST',
                body: body,
            })
        }),
        createFavorite: build.mutation<{id: number}, {userId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/create',
                method: 'POST',
                body: body,
            })
        })
    }),
})

export const { 
    useGetAllUsersQuery, 
    useAddUserMutation,
    useCreateBasketMutation,
    useCreateFavoriteMutation,
} = registerApi;