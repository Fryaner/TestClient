import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import { RegisterForm } from "../modules/register";
import { AuthorizationForm } from "../modules/authorization";
import LkLayout from "../modules/lc/components/lcLayout";
import Redirect from "../modules/redirect";
import LcUser from "../modules/lc/components/lcUser";
import LcResetPassword from "../modules/lc/components/lcResetPassword";
import CatalogMouse from "../modules/catalog/components/catalogPage";
import Basket from "../modules/basket/components";
import AboutPage from "../components/aboutPage";
import PayPage from "../components/payPage";
import DeliveryPage from "../components/deliveryPage";
import TradePage from "../components/tradePage";
import RequisitesPage from "../components/requisitesPage";
import ErrorPage from "../components/errorPage";
import DeviceInfo from "../components/CardDeviceInfo/components/DeviceInfo";
import FavoritePage from "../modules/favorite/components/favoritePage";
import SylsLc from "../modules/lc/components/sylsLc/idnex";


export const router = createBrowserRouter([
    {
        path: '',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'pay',
                element: <PayPage/>, 
            },
            {
                path: 'delivery',
                element: <DeliveryPage/>, 
            },
            {
                path: 'requisites',
                element: <RequisitesPage/>, 
            },
            {
                path: 'trade',
                element: <TradePage/>, 
            },
            {
                path: 'about',
                element: <AboutPage/>, 
            },
            {
                path: 'register',
                element: <RegisterForm/>
            },
            {
                path: 'auth',
                element: <AuthorizationForm/>
            },
            {
                path: 'basket',
                element: <Basket/>
            },
            {
                path: 'favorite',
                element: <FavoritePage/>
            },
            {
                path: 'lc',
                element: <Redirect><LkLayout/></Redirect>,
                children: [
                    {
                        path: '',
                        element: <LcUser/>
                    },
                    {
                        path: 'syls',
                        element: <SylsLc/>
                    }
                ]
            }, 
            {
                path: 'resetPassword',
                element: <LcResetPassword/>
            },
            {
                path: 'catalog/:id',
                element: <CatalogMouse/>,
            },
            {
                path: 'device/:id',
                element: <DeviceInfo/>
            },
        ]
    },
])