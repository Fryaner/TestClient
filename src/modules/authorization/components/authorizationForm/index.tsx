import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../../../UI/Button";
import { Input } from "../../../../UI/Input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginScheme } from "../scheme/index";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../../../UI/Form/index";
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginMutation, useGetBasketMutation, useGetFavoriteMutation } from "../../api/authorizationApi";
import { Spinner } from "@radix-ui/themes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isSetAuth } from "../../../../store/authSlice";
import { UserModel } from "../../../../models/userModel";

export const AuthorizationForm = () => {
    const [getBasket] = useGetBasketMutation();
    const [getFavorite] = useGetFavoriteMutation();
    const [loginUser, {data, isLoading, isError, }] = useLoginMutation();
    
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        dispatch(isSetAuth(false));
        localStorage.setItem('isAuth','false');
        if (data?.accessToken) {
            const user: UserModel = {
                id: data.user.id,
                lastName: data.user.lastName,
                firstName: data.user.firstName,
                patronymic: data.user.patronymic,
                login: data.user.login,
                password: data.user.password,
                email: data.user.email,
                phone: data.user.phone,
                isActivated: data.user.isActivated,
                createdAt: data.user.createdAt,
            }
            dispatch(isSetAuth(true));
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', data.accessToken);
            navigate('/lc'); 
        }
    }, [data, navigate]);


    const form = useForm<z.infer<typeof loginScheme>>({
        resolver: zodResolver(loginScheme),
        defaultValues: {
          loginAndEmailandPhone: "",
          password: "",
        },
      })

    async function onSubmit(values: z.infer<typeof loginScheme>) {
        try {
            const loginResult = await loginUser({
                email: values.loginAndEmailandPhone,
                phone: values.loginAndEmailandPhone,
                login: values.loginAndEmailandPhone,
                password: values.password,
            }).unwrap();
            console.log("1")
            if (loginResult?.user?.id) {
                const basketResult = await getBasket({
                    userId: loginResult.user.id
                }).unwrap();
                const favoriteResult = await getFavorite({
                    userId: loginResult.user.id
                }).unwrap();
                console.log(loginResult.user.id)
                if (basketResult && favoriteResult) {
                    console.log("3")
                    localStorage.setItem('basketId', basketResult.id.toString());
                    localStorage.setItem('favoriteId', favoriteResult.id.toString());
                }
            }
        } catch (error) {
            console.error('Ошибка при выполнении запросов:', error);
        }
    }
    return (
        <div className="flex flex-col items-center gap-2 py-[16px] max-md:px-[16px]">
            <h1 className="font-bold" >Вход в кабинет покупателя</h1>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[50%] gap-4 max-md:w-full">
                <div className="flex flex-col gap-4">
                    <div>
                    <FormField
                        control={form.control}
                        name="loginAndEmailandPhone"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Логин или Номер телефона или Email<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Логин или Номер телефона или Email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </div>
                    <div>
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Пароль<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />  
                    </div>
                </div>
                <Button className="bg-[#5129A5]">Войти</Button>
            </form>
            </Form>
            <div className="flex gap-4">
                <NavLink to="../register" className="underline text-[#8761D9]">Нет аккаунта?</NavLink>
                <NavLink to="../resetPassword" className="underline text-[#8761D9]">Забыли пароль?</NavLink>
            </div>
            <div>
                {isLoading ? <Spinner/> : isError ? <p>Ошибка</p> : data?.message}
            </div>
        </div>
    )
}