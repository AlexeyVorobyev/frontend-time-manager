import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {getTokensAndExpiry} from "../../components/functions/authTokenAndExpiry.ts"

const disabledAuthTokenEndpoints = [
	'signIn', 'signUp', 'refresh'
]
export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['graphs', 'events', 'tags'],
	baseQuery: fetchBaseQuery({
		prepareHeaders: (headers, api) => {
			if (disabledAuthTokenEndpoints.includes(api.endpoint)) {
				return headers
			}
			headers.set('Authorization', `Bearer ${getTokensAndExpiry().accessToken}`)
			return headers
		}
	}),
	endpoints: () => ({})
})


export const constructQueryString = (config: any): string => {
	let resString = '?'

	for (const key of Object.keys(config)) {
		resString += `${key}=${config[key as keyof any]}&`
	}

	console.log('DEBUG QUERYPARAMS', resString)

	return resString === '?' ? '' : resString
}