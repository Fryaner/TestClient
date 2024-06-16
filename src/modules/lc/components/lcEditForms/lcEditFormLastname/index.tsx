import { Button } from "../../../../../UI/Button";
import { Input } from "../../../../../UI/Input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editLastNameScheme } from "./scheme";
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
import { ToastAction } from "../../../../../UI/Toast";
import { useToast } from "../../../../../UI/UseToast";
import { isSetEditLogin } from "../../../../../store/authSlice";

const EditLastNameForm = () => {
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const [showCheck, setShowCheck] = useState(false);
    const [editUser, {data, isLoading, isError, isSuccess}] = useEditUserMutation();
    const { toast } = useToast();
    useEffect(() => {
        if (isSuccess) {
            data?.message ?
            toast({
                title: "Ошибка при изменении фамилии",
                description: data?.message,
                action: <X color="red"/>,
          }) :             toast({
             title: "Вы успешно сменили фамилию",
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

    const form = useForm<z.infer<typeof editLastNameScheme>>({
        resolver: zodResolver(editLastNameScheme),
        defaultValues: {
          lastName: user.lastName,
        },
      })

    function onSubmit(values: z.infer<typeof editLastNameScheme>) {
        editUser({
            id: user.id,
            lastName: values.lastName,
        })
    }

    return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex flex-start font-bold">Фамилия</FormLabel>
                        <FormControl>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-1">
                                        <Input placeholder="Фамилия" {...field} defaultValue="lastname"/>
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

export default EditLastNameForm;