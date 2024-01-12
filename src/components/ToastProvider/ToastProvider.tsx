import {FC, ReactNode} from "react"
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

interface IProps {
    children: ReactNode
}

export const ToastProvider: FC<IProps> = ({children}) => {

    return (<>
        <ToastContainer/>
        {children}
    </>)
}

interface IToastPayload {
    message: string,
    properties: {
        [key: string]: any
    }
}

interface IToastSettings {
    connectionLost: IToastPayload
    mutationSuccess: IToastPayload
}

export const toastSettings: IToastSettings = {
    connectionLost: {
        message: 'Соединение с сервером утеряно ',
        properties: {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
        }
    },
    mutationSuccess: {
        message: 'Операция выполнена успешно ',
        properties: {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
        }
    }
}