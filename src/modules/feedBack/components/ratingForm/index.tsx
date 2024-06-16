import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
   useAddRatingDeviceMutation, 
  useGetRatingDevicesQuery, 
  useGetRatingDeviceQuery } from "../../api/ratingApi"
import { Button } from "../../../../UI/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../UI/Form"
import { Textarea } from "../../../../UI/TextArea"
import {   
  Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "../../../../UI/Select"
import { Link, useParams } from "react-router-dom"
import { UserModel } from "../../../../models/userModel"
import { useEffect } from "react"
import { useToast } from "../../../../UI/UseToast"
import { Check } from "lucide-react"

const FormSchema = z.object({
  feedback: z.string()
  .min(10, 
    {message: 'Миниальное количество символов должно быть 10'})
    .max(255, 
        {message: 'Отзыв не должен быть длинее 255 символов'}),
    rate: z.string()
})

const RatingForm = () => {  
  const {id} = useParams();
  const [addRating, {data: createRating, isLoading, isError}] = useAddRatingDeviceMutation();
  const {refetch: refetchAllRating} = useGetRatingDevicesQuery({deviceId: Number(id)});

const {toast} = useToast();

  const userJson = localStorage.getItem('user');
  const user: UserModel = userJson ? JSON.parse(userJson) : 0;
  
  const {data: dataCurrentDeviceRatin, refetch: refetchRating} = useGetRatingDeviceQuery({userId: user.id, deviceId: Number(id)});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      feedback: "",
      rate: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addRating({
        deviceId: Number(id),
        userId: user.id,
        feedback: data.feedback,
        rate: Number(data.rate)
    })
    toast({
      title: "Вы оставили отзыв о товаре.",
      action: <Check/>
    })
  }

  useEffect(() => {
    refetchAllRating()
    refetchRating();
  }, [createRating])


  if (!userJson) {
    return <p>ЧТобы иметь возвомжность оставлять отзывы вам необходимо <Link className="text-[blue]" to="/auth">атворизоваться</Link>.</p>
}

  return (
    <>
    {!dataCurrentDeviceRatin ?
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отзыв о товаре:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Оставьте отзыв о товаре"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">Оставить отзыв</Button>
      </form>
    </Form>
    : <></>}
    </>
  )
}

export default RatingForm;