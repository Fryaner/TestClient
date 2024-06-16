const RequisitesPage = () => {
    return (
        <div className="flex flex-col gap-4 px-4 pt-4">
            <h3 className="text-[18px] font-bold max-md:text-[14px]">Контакты</h3>
            <p className="text-[14px] max-md:text-[13px]">Вы можете найти нас по адресу: г. Москва, ул. Торговая, дом 123, офис 456</p>
            <p className="text-[14px] max-md:text-[13px]">Как добраться: Сокольническая линия метро, последний вагон из центра, выход в сторону Казанского вокзала.</p>
            
            <p className="text-[14px] max-md:text-[13px]">Телефон отдела продаж: 8-495-123-45-67 (многоканальный)</p>
            <p className="text-[14px] max-md:text-[13px]">Телефон отдела оптовых продаж: 8-495-765-43-21</p>
            <p className="text-[14px] max-md:text-[13px]">Email: sales@myshop.ru</p>
            <p className="text-[14px] max-md:text-[13px] font-bold">График работы офиса и склада:</p>
            <ul className="text-[14px] max-md:text-[13px]">
                <li>Понедельник	с 9:00 до 21:00</li>
                <li>Вторник	с 9:00 до 21:00</li>
                <li>Среда	с 9:00 до 21:00</li>
                <li>Четверг	с 9:00 до 21:00</li>
                <li>Пятница	с 9:00 до 21:00</li>
                <li>Суббота	с 10:00 до 20:00</li>
                <li>Суббота	с 10:00 до 20:00</li>
                <li>Заказы через сайт принимаются круглосуточно!</li>
            </ul>
            <p className="text-[14px] max-md:text-[13px] font-bold">Реквизиты:</p>
            <ul className="flex flex-col gap-4 text-[14px] max-md:text-[13px]">
                <li>ИП Иванов Иван Иванович</li>
                <li>ОГРНИП: 123456789012345</li>
                <li>ИНН: 123456789012</li>
                <li>КПП: 123456789</li>
                <li>Заказы через сайт принимаются круглосуточно!</li>
            </ul>
        </div> 
    )
}

export default RequisitesPage;