import { UserModel } from "../../../models/userModel";
import mainApi from "../../../store/mainApi";

const apiEditUser = mainApi.injectEndpoints({
    endpoints: (build) => ({
        editUser: build.mutation<UserModel, UserModel>({
            query: (body) => ({
                url: 'user/edit',
                method: 'PATCH',
                body: body,
            })
        }),
        deleteUser: build.mutation<UserModel, UserModel>({
            query: (body) => ({
                url: 'user/delete',
                method: 'POST',
                body: body,
            })
        }),
        deleteBasket: build.mutation<UserModel, {userId: number | undefined}>({
            query: (body) => ({
                url: 'basket/delete',
                method: 'DELETE',
                body: body,
            })
        }),
        deleteFavorite: build.mutation<UserModel, {userId: number | undefined}>({
            query: (body) => ({
                url: 'favorite/delete',
                method: 'DELETE',
                body: body,
            })
        }),
    })
})

export const { 
    useEditUserMutation, 
    useDeleteUserMutation, 
    useDeleteBasketMutation,
     useDeleteFavoriteMutation
     } = apiEditUser; 