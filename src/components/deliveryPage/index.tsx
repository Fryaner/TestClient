const DeliveryPage = () => {
    return (
        <div className="flex flex-col gap-4 px-4 pt-4">
            <h3 className="text-[18px] font-bold max-md:text-[14px]">Доставка</h3>
            <p className="text-[14px] max-md:text-[14px]">Наш интернет-магазин осуществляет доставку по Москве и регионам России:</p>
            <ul className="text-[14px] list-decimal pl-8 max-md:text-[13px]">
                <li>Курьерская доставка по Москве — 200 руб.</li>
                <li>Самовывоз из нашего пункта выдачи или розничного магазина – бесплатно!</li>
                <li>Почтовая доставка по России — от 150 руб. в зависимости от адреса доставки.</li>
            </ul>
            <p className="text-[14px] max-md:text-[13px]">Сроки доставки:</p>
            <ul className="text-[14px] list-decimal pl-8 max-md:text-[13px]">
                <li>Курьерская доставка по Москве – на следующий день</li>
                <li>Самовывоз – на следующий день</li>
                <li>Почтовая доставка по России – от 3 до 14 дней в зависимости от региона</li>
            </ul>
            <p className="text-[14px] font-bold max-md:text-[13px]">Доставка осуществляется бесплатно при сумме заказа более 7000 рублей.</p>
        </div>
    )
}

export default DeliveryPage;