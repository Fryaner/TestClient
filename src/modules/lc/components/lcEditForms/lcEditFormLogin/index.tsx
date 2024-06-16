import { Button } from "../../../../../UI/Button";
import { Input } from "../../../../../UI/Input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editLoginScheme } from "./scheme";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../../../../UI/Form/index";
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { UserModel } from "../../../../../models/userModel";
import { useEditUserMutation } from "../../../api";
import { Check, Pencil, X } from "lucide-react";
import { useToast } from "../../../../../UI/UseToast";
import { ToastAction } from "../../../../../UI/Toast";
import { useDispatch } from "react-redux";
import { isSetEditLogin } from "../../../../../store/authSlice";


const EditLoginForm = () => {
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const [showCheck, setShowCheck] = useState(false);
    const [editUser, {data, isLoading, isError, isSuccess}] = useEditUserMutation();
    const {toast} = useToast();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            data?.message ?
            toast({
                title: "Ошибка при изменении логина",
                description: data?.message,
                action: <X color="red"/>,
          }) :             toast({
             title: "Вы успешно сменили логин",
             action: <Check color="lime"/>,
         })
            setShowCheck(true);
            setTimeout(() => {
                setShowCheck(false);
            }, 2000);
        }
    }, [isSuccess])

    useEffect(() => {
        dispatch(isSetEditLogin(false))
        if (data && !data.message) {
            const updateUser: UserModel = {
                ...user,
                lastName: data.lastName,
            }
            dispatch(isSetEditLogin(true))
            localStorage.setItem('user', JSON.stringify(updateUser));
        }
    }, [data])

    useEffect(() => {
        if (data && !data.message) {
            const updateUser: UserModel = {
                ...user,
                login: data.login,
            }
            localStorage.setItem('user', JSON.stringify(updateUser));
        }
    }, [data])

    const form = useForm<z.infer<typeof editLoginScheme>>({
        resolver: zodResolver(editLoginScheme),
        defaultValues: {
            login: user.login,
        },
      })

    function onSubmit(values: z.infer<typeof editLoginScheme>) {
        editUser({
            id: user.id,
            login: values.login,
        })
    }

    return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex flex-start font-bold">Логин</FormLabel>
                        <FormControl>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-1">
                                        <Input placeholder="Логин" {...field} defaultValue="login"/>
                                        <Button type="submit" className="rounded-none rounded-r-lg">
                                        {isLoading ? <p><Spinner/></p> : 
                                                isError ? <p>Err</p> : 
                                                    showCheck ? data?.message ? <X color="red"/> : <Check color="lime"/> : <Pencil/>}
                                        </Button>
                                    </div>
                                </div>
                             </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
            </form>
            </Form>
    )
}

export default EditLoginForm;