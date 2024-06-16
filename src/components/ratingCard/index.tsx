import { Clock, Pencil, Star, Trash, User } from "lucide-react";
import { FC } from "react";
import { Separator } from "../../UI/Separator";
import { UserImage } from "../../assets/images";
import { Button } from "../../UI/Button";
import { useGetUserCurrentQuery } from "../../modules/feedBack/api/ratingApi"; 

interface RatingCardProps {
    rate: number;
    createdAt: string;
    feedback: string;
    id: number;
    userId: number;
}

const RatingCard:FC<RatingCardProps> = ({rate,createdAt,feedback, userId}) => {
    const {data: dataCurrentUser} = useGetUserCurrentQuery({id: userId});
    const newDate = new Date(createdAt);
    
    const starElements = Array.from({ length: 5 }, (_, index) => index < rate);

    const day = String(newDate.getDate()).padStart(2, '0'); 
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear(); 
    const hours = String(newDate.getHours()).padStart(2, '0'); 
    const minutes = String(newDate.getMinutes()).padStart(2, '0'); 
    
    const formattedDate = `${day} ${month} ${year} ${hours} ${minutes}`;

    return (
        <div className="flex items-center gap-6 border p-4 rounded">
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

                </div>
                <Separator/>
                <div className="flex justify-between items-end">
                    <p>{feedback}</p>
                </div>
            </div>
        </div>
    )
}

export default RatingCard;