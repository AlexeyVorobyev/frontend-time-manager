import {api} from './api'
import {GLOBAL_CONFIG} from "../../globalConfig.ts"
import {TMeResponse, TRefreshResponse, TSignInPayload, TSignInResponse, TSignUpPayload} from "./types/auth.ts"
import {getTokensAndExpiry} from "../../components/functions/authTokenAndExpiry.ts"

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		signIn: builder.mutation<TSignInResponse, TSignInPayload>({
			query: (body) => ({
				url: `${GLOBAL_CONFIG.apiAuthServiceAddress}/auth/sign-in`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body
			}),
		}),
        signUp: builder.mutation<undefined, TSignUpPayload>({
            query: (body) => ({
                url: `${GLOBAL_CONFIG.apiAuthServiceAddress}/auth/sign-up`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            }),
        }),
        refresh: builder.mutation<TRefreshResponse, undefined>({
            query: (body) => ({
                url: `${GLOBAL_CONFIG.apiAuthServiceAddress}/auth/refresh`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getTokensAndExpiry().refreshToken}`
                },
                body
            }),
        }),
		me: builder.query<TMeResponse, undefined>({
			query: () => ({
				url: `${GLOBAL_CONFIG.apiAuthServiceAddress}/user/me`,
				method: 'GET',
			}),
		})
	}),
	overrideExisting: false
})

export const {
	useSignInMutation,
    useSignUpMutation,
    useRefreshMutation,
	useMeQuery
} = authApi