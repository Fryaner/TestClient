import { Check, Clock, Pencil, Star, Trash, User, X } from "lucide-react";
import { FC, useEffect } from "react";
import { Separator } from "../../../../UI/Separator";
import { UserImage } from "../../../../assets/images";
import { Button } from "../../../../UI/Button";
import { UserModel } from "../../../../models/userModel";
import {   
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "../../../../UI/Select";
import { useUpdateRatingDeviceMutation, useGetRatingDevicesQuery, useGetRatingDeviceQuery, useGetUserCurrentQuery } from "../../api/ratingApi";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../UI/Form"
import { Textarea } from "../../../../UI/TextArea"
import { Link, useParams } from "react-router-dom";
import { useToast } from "../../../../UI/UseToast";


interface CardRatingCurrentUserProps {
    handlerDeleteRating: () => void;

}
const FormSchema = z.object({
    feedback: z.string()
    .min(10, 
      {message: 'Миниальное количество символов должно быть 10'})
      .max(255, 
          {message: 'Отзыв не должен быть длинее 255 символов'}),
      rate: z.string()
  })
  

const CardRatingCurrentUser:FC<CardRatingCurrentUserProps> = ({handlerDeleteRating}) => {
    const {id} = useParams();
    const [updateRating, {data: updateDataRating, isLoading: isLoadingUpdateRating, isError: isErrorUpdateRating}] = useUpdateRatingDeviceMutation();

    const {toast} = useToast();

    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : 0;

    const {data: dataCurrentUser} = useGetUserCurrentQuery({id: user.id});
    const {data: dataCurrentDeviceRatin, refetch: refetchRating} = useGetRatingDeviceQuery({userId: user.id, deviceId: Number(id)});
    const {data: dataDevices, isLoading: isLoadingDevices, isError: isErrorDevices, refetch: refetchAllRating} = useGetRatingDevicesQuery({deviceId: Number(id)});
    
    
    useEffect(() => {
        refetchRating();
        refetchAllRating();
    }, [updateDataRating])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            feedback: "",
            rate: "1",
        },
    });

    useEffect(() => {
        if (dataCurrentDeviceRatin) {
            form.reset({
                feedback: dataCurrentDeviceRatin.feedback,
                rate: String(dataCurrentDeviceRatin.rate),
            });
        }
    }, [dataCurrentDeviceRatin]);

    if (!dataCurrentDeviceRatin) {
        return <>Вы не оставляли отзыв</>;
    }

    const newDate = new Date(dataCurrentDeviceRatin?.createdAt);
    
    const starElements = Array.from({ length: 5 }, (_, index) => index < dataCurrentDeviceRatin?.rate);

    const day = String(newDate.getDate()).padStart(2, '0'); 
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear(); 
    const hours = String(newDate.getHours()).padStart(2, '0'); 
    const minutes = String(newDate.getMinutes()).padStart(2, '0'); 
    
    const formattedDate = `${day} ${month} ${year} ${hours} ${minutes}`;


    
      function onSubmit(data: z.infer<typeof FormSchema>) {
        if (dataCurrentDeviceRatin?.feedback === data.feedback && dataCurrentDeviceRatin.rate === Number(data.rate)) {
            toast({
                title: 'Данный отзыв соотвествует предыдущему отзыву.',
                action: <X/>
            })
            return;
        }
        updateRating({
            deviceId: Number(id),
            userId: user.id,
            feedback: data.feedback,
            rate: Number(data.rate)
        })
        toast({
            title: "Вы изменили отзыв о товаре.",
            action: <Check/>
          })
      }
      if (!userJson) {
        return <p>ЧТобы иметь возвомжность оставлять отзывы вам необходимо <Link className="text-[blue]" to="/auth">атворизоваться</Link>.</p>
    }

    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-6 border border-[black] p-4 rounded">
            <div className="w-[10%]">
                <img src={UserImage} alt=""/>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="flex gap-1">
                            <User/>
                            {dataCurrentUser?.login}
                            </p>
                        <p className="flex gap-1">
                            <Clock/>
                            {formattedDate}
                        </p> 
                    </div>
                    <div className="flex">
                    {starElements.map((isFilled, index) => (
                                <Star key={index} className={`w-4 ${isFilled ? "fill-[orange]" : "fill-[white]"}`} />
                            ))}
                    </div>
                        <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Оценка товара от 1 до 5:</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Оцените качество товара" />
                                    </SelectTrigger>
                                </FormControl>
                            <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                </div>
                <Separator/>
                <div className="flex flex-col gap-2">
                    <div>
                    <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                        <div className="flex gap-1 ">
                            <Button type="submit" variant="ghost" className="flex flex-1 gap-2 items-center">
                                Редактировать отзыв
                                <Pencil className="w-5" color="green"/>
                            </Button>
                            <Button type="button" onClick={() => handlerDeleteRating()} variant="ghost" className="flex flex-1 gap-2 items-center" >
                                Удалить отзыв
                                <Trash className="w-5" color="red"/>
                            </Button>
                        </div>
                </div>
            </div>
        </div>
        </form>
    </Form>
                        )
}

export default CardRatingCurrentUser;