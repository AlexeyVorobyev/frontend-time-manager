import {IRoute} from './routesList'
import {AuthPage} from '../pages/AuthPage/AuthPage'
import {Navigate} from 'react-router-dom'
import {RegistrationPage} from "../pages/RegistrationPage/RegistrationPage.tsx"

export const routesAuthList: IRoute[] = [
    {
        path: '/',
        name: 'Страница авторизации',
        component: <AuthPage/>
    },

    {
        path: '/registration',
        name: 'Страница регистрации',
        component: <RegistrationPage/>
    },

    {
        path: '*',
        name: 'Пересылка',
        component: <Navigate to={'/'}/>
    },
]