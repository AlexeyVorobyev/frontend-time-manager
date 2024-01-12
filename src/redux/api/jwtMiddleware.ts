import type {Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import {isRejectedWithValue} from '@reduxjs/toolkit'
import {api} from '../../../../Vega/vega_admin_frontend/src/redux/api/api'
import {getTokens} from '../../../../Vega/vega_admin_frontend/src/components/functions/getAuthToken'
import {TRefreshResponse} from "./types/auth.ts"
import {getTokensAndExpiry, setTokenAndExpiry} from "../../components/functions/authTokenAndExpiry.ts"
import {Dispatch} from "react"
const triggerRefresh = (state: MiddlewareAPI<any, any>) => {
    state.dispatch(
        // @ts-ignore
        api.endpoints.refresh.initiate({refreshToken: getTokens().refreshToken} as IRefreshPayload)
    ).then((response: any) => {
        if (response.hasOwnProperty('error')) {
            localStorage.clear()
        } else if (response.data) {
            setTokenAndExpiry(response.data as TRefreshResponse)
            location.reload()
        }
    })
}
export const jwtMiddleware: Middleware =
    (state) => (next: any) => (action: any) => {
        if (new Date(getTokensAndExpiry().accessExpiry as string).getTime() < new Date().getTime()) {
            triggerRefresh(state)
        }
        if (action && isRejectedWithValue(action)) {
            console.warn('We got a rejected action!', action.payload.status)
            if (action.payload.status === 401 || action.payload.status === 403) {
                if (new Date(getTokensAndExpiry().refreshExpiry as string).getTime() < new Date().getTime()) {
                    localStorage.clear()
                    location.reload()
                }
                triggerRefresh(state)
            }
        }
        // @ts-ignore
        return next(action)
    }