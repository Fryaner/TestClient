import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";


interface RedirectProsp {
    children: ReactElement | null;
}

const Redirect:FC<RedirectProsp> = ({children}) => {
    const token = localStorage.getItem('token');
    if(!token) {
        return <Navigate to="/auth"/>
    }
    return children;
}

export default Redirect;