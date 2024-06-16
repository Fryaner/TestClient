import { NavLink } from "react-router-dom";
import { Button } from "../../UI/Button";
import {CircleUserRound} from "lucide-react";
import MediaQuery from "react-responsive";
import { UserModel } from "../../models/userModel";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const User = () => {
    const isAuth = useSelector((state:RootState) => state.auth.isAuth);
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const loginLength = user?.login ? user?.login.length : 0;
    const isEditLogin = useSelector((state: RootState) => state.auth.isEditLogin);
    useEffect(() => {

    }, [isAuth, isEditLogin]);

    console.log(isAuth)
    return (
        <>
            <MediaQuery minWidth={768}>
                    <NavLink className="h-[24px]" to="lc">
                        {localStorage.getItem('isAuth') === 'true' ? `${loginLength > 10 ? `${user?.login?.slice(0, 6)}...` : user?.login}` : <CircleUserRound/>}
                    </NavLink>
            </MediaQuery>
            <MediaQuery maxWidth={768}>
                <NavLink to="lc">
                    {localStorage.getItem('isAuth') === 'true' ? user?.login : <CircleUserRound/>}
                </NavLink>
            </MediaQuery>
        </>
    )
}

export default User;