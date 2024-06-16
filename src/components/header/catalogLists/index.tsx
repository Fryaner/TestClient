import { FC } from "react";
import { ScrollArea } from "../../../UI/Scroll";
import CatalogSection from "../catalogItem";
import {    
    Corpus,
    Keybourd,
    Monitor,
    Ram,
    Videocarta,
    Mouse,
    Block
} from '../../../assets/images/index';
import { useGetTypeQuery } from "./api/apiHeader";

const images = [
    {id: 1, image: Mouse},
    {id: 4, image: Monitor},
    {id: 2, image: Keybourd},
    {id: 3, image: Block},
    {id: 5, image: Corpus},
    {id: 6, image: Ram},
    {id: 7, image: Videocarta},
]

interface CataloglistsProps {
    handlerCloseDialog: () => void;
}

const CatalogLists:FC<CataloglistsProps> = ({handlerCloseDialog}) => {
    const {data} = useGetTypeQuery();
    console.log('ffddffd')
    if (!data) {
        return <></>;
    }
    return (
            <ScrollArea className="h-[300px]">
                <ul className="flex flex-wrap gap-[32px]"> 
                                      
                    {data.map((item) =>  
                        images.map((image) =>
                            item.id === image.id ?
                            <CatalogSection handlerCloseDialog={handlerCloseDialog} id={item.id} title={item.name} key={item.id} image={image.image}/>
                            : <></>
 
                        )
                    )}
                </ul>
            </ScrollArea>
    )
}

export default CatalogLists;