import {isRejectedWithValue} from '@reduxjs/toolkit'
import type {Middleware} from '@reduxjs/toolkit'
import {toast} from "react-toastify";
import {toastSettings} from "../../components/ToastProvider/ToastProvider";

export const errorMiddleware: Middleware =
    () => (next) => (action) => {
        if (!isRejectedWithValue(action)) {
            console.log('APPROVED', action)
            if (action.type === 'api/executeMutation/fulfilled') {
                const toastPayload = toastSettings.mutationSuccess
                toast.success(toastPayload.message,toastPayload.properties)
            }
        }
        if (isRejectedWithValue(action)) {
            console.log('REJECTED', action)
            if (action.type === 'api/executeMutation/rejected') {
                const toastPayload = toastSettings.connectionLost
                toast.error(action.payload.data.message, toastPayload.properties)
            } else {
                const toastPayload = toastSettings.connectionLost
                toast.error(toastPayload.message, toastPayload.properties)
            }
        }
        return next(action)
    }