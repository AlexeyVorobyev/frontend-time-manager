import type {Middleware} from '@reduxjs/toolkit'
import {isRejectedWithValue} from '@reduxjs/toolkit'
import {getTokensAndExpiry, setTokenAndExpiry} from "../../components/functions/authTokenAndExpiry.ts"
import {GLOBAL_CONFIG} from "../../globalConfig.ts"
import {TRefreshResponse} from "./types/auth.ts"

const triggerRefresh = () => {
	fetch(`${GLOBAL_CONFIG.apiAuthServiceAddress}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refreshToken: getTokensAndExpiry().refreshToken
		})
	}).then(async (response) => {
		if (response.hasOwnProperty('error')) {
			localStorage.clear()
		} else {
			const res = await response.json()
			console.log("here", res)
			if (response.status === 400) {
				localStorage.clear()
			}
			else {
				// @ts-ignore
				setTokenAndExpiry(response as TRefreshResponse)
			}
			// location.reload()
		}
	})
}
export const jwtMiddleware: Middleware =
	(state) => (next: any) => (action: any) => {
		if (new Date(getTokensAndExpiry().accessExpiry as string).getTime() < new Date().getTime() && getTokensAndExpiry().accessExpiry) {
			triggerRefresh()
		}
		if (action && isRejectedWithValue(action)) {
			console.warn('We got a rejected action!', action.payload.status)
			if (action.payload.status === 401 || action.payload.status === 403) {
				if (new Date(getTokensAndExpiry().refreshExpiry as string).getTime() < new Date().getTime()) {
					localStorage.clear()
					location.reload()
				}
				triggerRefresh()
			}
		}
		// @ts-ignore
		return next(action)
	}