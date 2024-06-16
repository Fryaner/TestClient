import { Input } from "../Input";
import { Button } from "../Button";
import {Search} from "lucide-react";

const InputSearch = () => {
    return (
        <div className="flex flex-auto">
            <Input type="search" placeholder="Найти" className="rounded-r-none"/>
            <Button className="bg-[#8761D9] rounded-l-none" type="submit"><Search/></Button>
        </div>
    )
}

export default InputSearch;