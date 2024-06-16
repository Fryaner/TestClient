const PayPage = () => {
    return (
        <div className="flex flex-col gap-4 px-4 pt-4">
            <h3 className="text-[18px] font-bold max-md:text-[14px]">Оплата</h3>
            <p className="text-[14px]  max-md:text-[13px]">Вы можете оплатить заказ:</p>
            <ul className="text-[14px]  list-decimal pl-8 max-md:text-[13px]">
                <li>Наличными курьеру или в пункте выдачи при получении заказа</li>
                <li>Банковской картой Visa, Mastercard или МИР через сайт при оформлении заказа</li>
                <li>Наложенным платежом при заказе с доставкой Почтой России</li>
            </ul>
        </div>
    )
}
export default PayPage;