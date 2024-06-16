import { Button } from "../../../../../UI/Button";
import { Input } from "../../../../../UI/Input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editPasswordScheme } from "./scheme";
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
import { Checkbox } from "../../../../../UI/Checkbox";
import { Label } from "../../../../../UI/Label";
import { useToast } from "../../../../../UI/UseToast"
import { Check, X } from "lucide-react";


const EditFormPassword = () => {
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const [showCheck, setShowCheck] = useState(false);
    const [editUser, {data, isLoading, isError, isSuccess}] = useEditUserMutation();
    const [isActiveChangePassword, isSetActiveChangePassword] = useState(false);
    const { toast } = useToast()
    useEffect(() => {
        if (isSuccess) {
            data?.message ?
            toast({
                title: "Ошибка при изменении пароля",
                description: data?.message,
                action: <X color="red"/>,
          }) :             toast({
             title: "Вы успешно сменили пароль",
             action: <Check color="lime"/>,
         })
            setShowCheck(true);
            let timer = setTimeout(() => {
                setShowCheck(false);
            }, 2000);
            console.log('Clearing timeout');
            return () => clearTimeout(timer);
        }
    }, [isSuccess])

    const form = useForm<z.infer<typeof editPasswordScheme>>({
        resolver: zodResolver(editPasswordScheme),
        defaultValues: {
            password: "",
            newPasword: "",
            confirmPassword: "",
        },
      })

    function onSubmit(values: z.infer<typeof editPasswordScheme>) {
        editUser({
            id: user.id,
            password: values.password,
            newPassword: values.newPasword,
        })
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <Label htmlFor="changePassword">Изменить пароль</Label>
                <Checkbox onClick={() => isActiveChangePassword ? isSetActiveChangePassword(false) : isSetActiveChangePassword(true)} id="changePassword"/>
            </div>
            {
            isActiveChangePassword ?
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex flex-start font-bold">Старый пароль</FormLabel>
                        <FormControl>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col flex-1">
                                                        <div className="flex">
                                                            <Input type="password" placeholder="Старый пароль" {...field} defaultValue="password"/>
                                                        </div>
                                    </div>
                                </div>
                             </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="newPasword"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex flex-start font-bold">Новый пароль</FormLabel>
                        <FormControl>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col flex-1">
                                                        <div className="flex">
                                                            <Input type="password" placeholder="Новый пароль" {...field} defaultValue="password"/>
                                                        </div>
                                    </div>
                                </div>
                             </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                                            <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex flex-start font-bold">Повторите пароль</FormLabel>
                        <FormControl>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col flex-1">
                                                        <div className="flex">
                                                            <Input type="password" placeholder="Подтвердите пароль" {...field} defaultValue="password"/>
                                                        </div>
                                    </div>
                                </div>
                             </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                        </div>
                    </div>
                        <Button>{isLoading ? <Spinner/> : isError ? <p>Error</p> : <p>Изменить пароль</p>}
                        </Button>
            </form>
            </Form>
            : <></>
            }
        </>
    )
}

export default EditFormPassword;