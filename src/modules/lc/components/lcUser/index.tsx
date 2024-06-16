import { UserModel } from "../../../../models/userModel";
import EditLastNameForm from "../lcEditForms/lcEditFormLastname";
import EditFirstNameForm from "../lcEditForms/lcEditFormFirstname";
import EditLoginForm from "../lcEditForms/lcEditFormLogin";
import EditPhoneForm from "../lcEditForms/lcEditFormPhone";
import EditPatronymicForm from "../lcEditForms/lcEditFormPatronymic";
import EditEmailForm from "../lcEditForms/lcEditFormEmail";
import EditFormPassword from "../lcEditForms/lcEditFormPassword";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const LcUser = () => {
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const isActivatesEmail = useSelector((state: RootState) => state.auth.isActivatedEmail)
    
    useEffect(() => {
    }, [isActivatesEmail])

    const dateUser = user.createdAt ? new Date(user.createdAt) : null;
    const dateCreateAccount = dateUser ? 
    `${dateUser.getDate().toString().padStart(2, '0')}.${(dateUser.getMonth() + 1).toString().padStart(2, '0')}.${dateUser.getFullYear()} ${dateUser.getHours().toString().padStart(2, '0')}:${dateUser.getMinutes().toString().padStart(2, '0')}` : null;
    return (
        <div className="flex flex-1 flex-col gap-4 ">
            {
            !user.isActivated ? 
            <p className="w-full border p-8 bg-[red]/[70%] rounded">Вы не подтвердили электронную почту: {user.email}</p> : 
            <></>
            }
            <h3 className="font-bold text-[24px]">Контактная информация</h3>
            <div className="flex flex-col gap-1">
                <p>Дата регистрации аккаунта: <span>{dateCreateAccount ? dateCreateAccount : <></>}</span></p>
            </div>
                <EditLastNameForm/>
                <EditFirstNameForm/>
                <EditPatronymicForm/>
                <EditLoginForm/>
                <EditPhoneForm/>
                <EditEmailForm/>
                <EditFormPassword/>
        </div>
    )
}
export default LcUser;