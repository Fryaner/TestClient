import { Separator, Spinner } from "@radix-ui/themes";

const StartPage = () => {
    return ( 
        <div className="flex flex-col gap-[16px] justify-center items-center bg-gradient-to-r from-[#000AFF]/[20%] to-[#FF00C7]/[20%] h-lvh">
            <div className="flex items-center gap-[67px]">
                <Separator color="blue" orientation="horizontal" size="1" />
                <h1 className="text-[32px] font-extrabold">Fryaner</h1>
                <Separator color="blue" orientation="horizontal" size="1" />
            </div>

            <h2 className="text-[#94A3B8]">Лидер среди магазинов по продаже игровой техники</h2>
            <Spinner size="3" />
        </div>
    )
}

export default StartPage;