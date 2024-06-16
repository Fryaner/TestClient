import { Link, useParams } from "react-router-dom";
import RatingCard from "../../../../components/ratingCard";
import { 
    useGetRatingDevicesQuery,
     useDeleteRatingDeviceMutation, 
     useGetRatingDeviceQuery, 
     useGetUserCurrentQuery,
     } from "../../api/ratingApi"; 
import { UserModel } from "../../../../models/userModel";
import { Skeleton } from "../../../../UI/Skeleton";
import { Separator } from "../../../../UI/Separator";
import { useEffect } from "react";
import CardRatingCurrentUser from "../cardRatingCurrentUser";
import { Check } from "lucide-react";
import { useToast } from "../../../../UI/UseToast";

const FeedBackDevices = () => {
    const {id} = useParams();
    const {data: dataDevices, isLoading: isLoadingDevices, isError: isErrorDevices, refetch: refetchAllRating} = useGetRatingDevicesQuery({deviceId: Number(id)});
    const [deleteRating, {data: deleteDataRating, isLoading: isLoadingDeleetRating, isError: isErrorDeleteRating}] = useDeleteRatingDeviceMutation();
   
    const {toast} = useToast();

    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : 0;

    const {data: dataCurrentUser} = useGetUserCurrentQuery({id: user.id});
    const {data: dataCurrentDeviceRatin, refetch: refetchRating} = useGetRatingDeviceQuery({userId: user.id, deviceId: Number(id)});

    const handlerDeleteRating = () => {
        deleteRating({
            deviceId: Number(id),
            userId: user.id
        })
        toast({
            title: "Вы удалили отзыв о товаре.",
            action: <Check/>
          })
    }


    useEffect(() => {
        refetchAllRating();
        refetchRating();
    }, [deleteDataRating])

    if (isLoadingDevices) {
        return (
            <div className="flex items-center gap-6 border p-4 rounded">
            <div className="w-[10%]">
                <Skeleton className="w-[150px] h-[150px] rounded-full"/>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-[100px]"/>
                        <Skeleton className="h-4 w-[100px]"/>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-[100px]"/>
                    </div>
                </div>
                <Separator/>
                <Skeleton className="h-4 w-[250px]"/>
            </div>
        </div>
        )
    }

    if (isErrorDevices) {
        return <p>При загрузке данных произошла ошибка. Попробуйте перезагрузить страницу нажав F5. Приносим извинения за неудобства.</p>
    }
    
    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
                <p className="font-bold">Мой отзыв на товар:</p>
                <CardRatingCurrentUser 
                handlerDeleteRating={handlerDeleteRating} />
            </div>
            <Separator/>
            <div className="flex flex-col gap-4">
            {dataDevices?.map((ratingDevice) => 
                <div>
                <RatingCard 
                createdAt={ratingDevice.createdAt} 
                feedback={ratingDevice.feedback} 
                id={ratingDevice.id} 
                rate={ratingDevice.rate}
                key={ratingDevice.id}
                userId={ratingDevice.userId}
                />
                </div>
            )}
             </div>
        </div>
    )
}

export default FeedBackDevices;