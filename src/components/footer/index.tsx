import { Link } from "react-router-dom";
import {Ok, Vk, Tg} from '../../assets/icons/index';
import MediaQuery from "react-responsive";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Separator } from "@radix-ui/themes";
import { Button } from "../../UI/Button";
import Logo from "../../UI/Logo";

const Footer = () => { 
    const [isActiveCompany, isSetActiveCompany] = useState(false);
    const [isActiveService, isSetActiveService] = useState(false);
    return (
        <footer className="bg-[#8761D9]/[50%] mt-6">
            <div className="flex flex-col gap-[16px] max-w-[1440px] m-auto max-md:pb-[90px] p-[16px]">
                <Logo/>
                <div className="flex justify-between max-md:flex-col-reverse gap-[32px]">
                    <div className="flex gap-[32px] max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col gap-[16px] max-md:gap-0">
                            <MediaQuery minWidth={768}>
                                <h3 className="font-bold">Компания</h3>
                            </MediaQuery>
                            <MediaQuery maxWidth={768}>
                                <div>
                                    <Separator size="4"/>
                                    <div className="flex w-full justify-between py-[16px]">
                                        <h3 className="font-bold">Компания</h3>
                                        <Button 
                                            onClick={() => isActiveCompany ? isSetActiveCompany(false) : isSetActiveCompany(true)} 
                                            variant="link" 
                                            size="icon"
                                            className="p-0 h-full">
                                            {isActiveCompany ? <ChevronUp/> : <ChevronDown/>}                                    
                                        </Button>
                                    </div>
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={768}>
                            <ul className="flex flex-col gap-[8px] text-[13px]">
                            <li><Link to="about">О нас</Link></li>
                            <li><Link to="requisites">Реквизиты</Link></li>
                            </ul>
                            </MediaQuery>
                            <MediaQuery maxWidth={768}>
                            {isActiveCompany ?
                            <ul className="flex flex-col gap-[8px] text-[13px] max-md:text-[16px] max-md:pb-[16px]">
                                <li><Link to="about">О нас</Link></li>
                                <li><Link to="requisites">Реквизиты</Link></li>
                            </ul>
                            : <></>}
                            <Separator size="4"/>                 
                            </MediaQuery>
                        </div>
                        <div className="flex flex-col gap-[16px] max-md:gap-0">
                        <MediaQuery minWidth={768}>
                                <h3 className="font-bold">Сервисы</h3>
                            </MediaQuery>
                            <MediaQuery maxWidth={768}>
                            <div>
                                    <div className="flex w-full justify-between py-[16px]">
                                        <h3 className="font-bold">Сервисы</h3>
                                        <Button 
                                            onClick={() => isActiveService ? isSetActiveService(false) : isSetActiveService(true)} 
                                            variant="link" 
                                            size="icon"
                                            className="p-0 h-full">
                                            {isActiveService ? <ChevronUp/> : <ChevronDown/>}                           
                                        </Button>
                                    </div>
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={768}>
                            <ul className="flex flex-col gap-[8px] text-[13px]">
                            <li><Link to="pay">Оплата</Link></li>
                                <li><Link to="delivery">Доставка</Link></li>
                                <li><Link to="trade">Обмен и возврат</Link></li>
                            </ul>
                            </MediaQuery>
                            <MediaQuery maxWidth={768}>
                            {isActiveService ?
                            <ul className="flex flex-col gap-[8px] text-[13px] max-md:text-[16px] max-md:pb-[16px]">
                                <li><Link to="pay">Оплата</Link></li>
                                <li><Link to="delivery">Доставка</Link></li>
                                <li><Link to="trade">Обмен и возврат</Link></li>
                            </ul>
                            : <></>
                            }
                            <Separator size="4"/> 
                            </MediaQuery>
                        </div>            
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        <h3 className="font-bold">Контакты</h3>
                        <div className="flex flex-col gap-[32px]">
                            <ul className="flex flex-col gap-[16px] max-md:gap-[32px]">                               
                                    <div className="flex gap-[16px] max-md:flex-col max-md:gap-[3px]">                                
                                        <li>+ 7 (924) 218 33 76</li>
                                        <MediaQuery minWidth={768}><li>|</li></MediaQuery>
                                        <li>+ 7 (924) 218 33 76</li>
                                    </div>
                                    <li>г.Хабаровск ул.Пушкина д.777</li>  
                            </ul>
                            <div className="flex gap-[32px] justify-start">
                                <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md"><img alt="Vk" src={Vk}/></a>
                                <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md"><img alt="Pk" src={Ok}/></a>
                                <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md"><img alt="Tg" src={Tg}/></a>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;