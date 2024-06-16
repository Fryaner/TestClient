import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetRatingDevicesQuery } from "../../api/ratingApi";
import { FC } from "react";

interface RatingStarsProps {
    id: number;
}

const RatingStars:FC<RatingStarsProps> = ({id}) =>{
    const {data} = useGetRatingDevicesQuery({deviceId: Number(id)});

    if (!data) {
        return <></>;
    }

    const totalAmount = data?.reduce((acc, deviceRating) => acc + deviceRating.rate, 0)
    const starElements = Array.from({ length: 5 }, (_, index) => index < totalAmount/data?.length);
    return (
        <div className="flex gap-2">
            <div className="flex">
                {starElements.map((isFilled, index) => (
                        <Star key={index} className={`w-4 ${isFilled ? "fill-[orange]" : "fill-[white]"}`} />
                ))}
            </div>
            <p>-</p>
            <p>{data?.length}</p>
        </div>
    )
}

export default RatingStars;