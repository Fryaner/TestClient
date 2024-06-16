import { Button } from "../../../../../UI/Button";
import { Input } from "../../../../../UI/Input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editEmailScheme } from "./scheme";
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
import { useDispatch } from "react-redux";
import { isSetActivatedEmail } from "../../../../../store/authSlice";
import { useToast } from "../../../../../UI/UseToast";
import { ToastAction } from "../../../../../UI/Toast";


const EditEmailForm = () => {
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const [showCheck, setShowCheck] = useState(false);
    const [editUser, {data, isLoading, isError, isSuccess}] = useEditUserMutation();
    const dispatch = useDispatch();
    const {toast} = useToast();

    useEffect(() => {
        if (isSuccess) {
            data?.message ?
            toast({
               title: "Ошибка при изменении почты",
               description: data?.message,
               action: <X color="red"/>,
         }) :             toast({
            title: "Вы успешно сменили почту",
            action: <Check color="lime"/>,
        })
            setShowCheck(true);
            setTimeout(() => {
                setShowCheck(false);
            }, 2000);
        }
    }, [isSuccess])

    useEffect(() => {
        if (data && !data.message) {
            const updateUser: UserModel = {
                ...user,
                lastName: data.lastName,
            }
            localStorage.setItem('user', JSON.stringify(updateUser));
        }
    }, [data])

    const form = useForm<z.infer<typeof editEmailScheme>>({
        resolver: zodResolver(editEmailScheme),
        defaultValues: {
            email: user.email
        },
      })

    function onSubmit(values: z.infer<typeof editEmailScheme>) {
        editUser({
            id: user.id,
            email: values.email,
            isActivated: false,
        })
    }
    useEffect(() => {
        dispatch(isSetActivatedEmail(false));
        if (data && !data.message) {
            const updateUser: UserModel = {
                ...user,
                email: data.email,
                isActivated: data.isActivated,
            }
            dispatch(isSetActivatedEmail(true));
            localStorage.setItem('user', JSON.stringify(updateUser));
        }
    }, [data])
    return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center gap-2">
                                <p className="font-bold">Электронная почта</p>
                                {user.isActivated ? <Check color="green"/> : <X color="red"/>}
                            </FormLabel>
                        <FormControl>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-1">
                                        <Input placeholder="Например: example.example@mail.ru" {...field} defaultValue="email"/>
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

export default EditEmailForm;