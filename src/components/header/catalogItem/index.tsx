import {Link } from "react-router-dom";
import { FC } from "react";

interface CatalogSectionProps {
    id: number;
    title: string;
    image: string;
    handlerCloseDialog: () => void;

}


const CatalogSection:FC<CatalogSectionProps> = ({id, image, title, handlerCloseDialog}) => {
    return (
        <li className="flex flex-col gap-[8px] w-[21%]">
            <Link onClick={handlerCloseDialog} to={`/catalog/${id}`}>
                <img className="hover:opacity-[0.5] p-[10px] w-[100%] h-[150px] object-contains rounded-md border-2 border-[#8761D9]" src={image} alt={title}/>
            </Link>
            <Link onClick={handlerCloseDialog} to={`/catalog/${id}`} className="text-center hover:text-[#8761D9]">{title}</Link>
        </li>
    )
}

export default CatalogSection;