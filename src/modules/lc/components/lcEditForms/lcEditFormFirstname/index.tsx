import { Button } from "../../../../../UI/Button";
import { Input } from "../../../../../UI/Input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editFirstNameScheme } from "./scheme";
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


const EditFirstNameForm = () => {
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const [showCheck, setShowCheck] = useState(false);
    const [editUser, {data, isLoading, isError, isSuccess}] = useEditUserMutation();
    const {toast} = useToast();

    useEffect(() => {
        if (isSuccess) {
            data?.message ?
            toast({
                title: "Ошибка при изменении имени",
                description: data?.message,
                action: <X color="red"/>,
          }) :             toast({
             title: "Вы успешно сменили имя",
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

    useEffect(() => {
        if (data && !data.message) {
            const updateUser: UserModel = {
                ...user,
                firstName: data.firstName,
            }
            localStorage.setItem('user', JSON.stringify(updateUser));
        }
    }, [data])
    
    const form = useForm<z.infer<typeof editFirstNameScheme>>({
        resolver: zodResolver(editFirstNameScheme),
        defaultValues: {
          firstName: user.firstName,
        },
      })

    function onSubmit(values: z.infer<typeof editFirstNameScheme>) {
        editUser({
            id: user.id,
            firstName: values.firstName,
        })
    }

    return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex flex-start font-bold">Имя</FormLabel>
                        <FormControl>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-1">
                                        <Input placeholder="Имя" {...field} defaultValue="firstName"/>
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

export default EditFirstNameForm;