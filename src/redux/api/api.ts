import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGraphsPayload} from "./types/graphs";
import {getTokensAndExpiry} from "../../components/functions/authTokenAndExpiry.ts"

const disabledAuthTokenEndpoints = [
    'signIn','signUp','refresh'
]
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['graphs','events'],
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

type TConstructQueryStringConfig = IGraphsPayload

export const constructQueryString = (config: TConstructQueryStringConfig): string => {
    let resString = '?'

    for (const key of Object.keys(config)) {
        resString += `${key}=${config[key as keyof TConstructQueryStringConfig]}&`
    }

    console.log('DEBUG QUERYPARAMS', resString)

    return resString === '?' ? '' : resString
}