import {api, constructQueryString} from './api'
import {IGraphPostPutPayload, IGraphsPayload} from "./types/graphs";

export const graphsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        graphs: builder.query<any, IGraphsPayload>({
            query: (settings) => ({
                url: '/graph' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['graphs']
        }),
        graph: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/graph/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['graphs']
        }),
        graphDelete: builder.mutation<any, { id: string }>({
            query: (settings) => ({
                url: `/graph/${settings.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['graphs']
        }),
        graphPost: builder.mutation<any, { body: IGraphPostPutPayload }>({
            query: (settings) => ({
                url: `/graph`,
                method: 'POST',
                body: settings.body
            }),
            invalidatesTags: ['graphs']
        }),
        graphPatch: builder.mutation<any, { id: string, body: IGraphPostPutPayload  }>({
            query: (settings) => ({
                url: `/graph/${settings.id}`,
                method: 'PATCH',
                body: settings.body
            }),
            invalidatesTags: ['graphs']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyGraphsQuery,
    useGraphDeleteMutation,
    useGraphQuery,
    useLazyGraphQuery,
    useGraphPostMutation,
    useGraphPatchMutation
} = graphsApi