import { useForm } from "react-hook-form";
import { Button } from "../../../../UI/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../UI/Form"
import { Input } from "../../../../UI/Input"
import { Label } from "../../../../UI/Label"
import { resetPasswordScheme } from "./scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LcResetPassword = () => {

    const form = useForm<z.infer<typeof resetPasswordScheme>>({
        resolver: zodResolver(resetPasswordScheme),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
      })

    function onSubmit(values: z.infer<typeof resetPasswordScheme>) {

    }

    return (
        <>
        <div className="flex items-center gap-2">
            <Label htmlFor="changePassword">Изменить пароль</Label>
        </div>
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
                    name="password"
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
                    <Button><p>Изменить пароль</p></Button>
        </form>
        </Form>
    </>
    )
}

export default LcResetPassword;