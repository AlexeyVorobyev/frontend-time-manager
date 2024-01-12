import {api, constructQueryString} from './api'
import {TTagEntity, TTagPatch, TTagPost, TTagsPayload, TTagsResponse} from "./types/tags.ts"
import {TEntityWithId} from "./types/types.ts"
import {GLOBAL_CONFIG} from "../../globalConfig.ts"

export const tagsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		tags: builder.query<TTagsResponse, TTagsPayload>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/tag` + constructQueryString(settings),
				method: 'GET',
			}),
			providesTags: ['tags']
		}),
		tag: builder.query<TTagEntity, TEntityWithId>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/tag/${settings.id}`,
				method: 'GET',
			}),
			providesTags: ['tags']
		}),
		tagDelete: builder.mutation<undefined, TEntityWithId>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/tag/${settings.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['tags']
		}),
		tagPost: builder.mutation<undefined, { body: TTagPost }>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/tag`,
				method: 'POST',
				body: settings.body
			}),
			invalidatesTags: ['tags']
		}),
		tagPatch: builder.mutation<undefined, TEntityWithId & {body: TTagPatch }>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/tag/${settings.id}`,
				method: 'PATCH',
				body: settings.body
			}),
			invalidatesTags: ['tags']
		}),
	}),
	overrideExisting: false
})

export const {
	useLazyTagsQuery,
	useTagDeleteMutation,
	useTagQuery,
	useLazyTagQuery,
	useTagPostMutation,
	useTagPatchMutation
} = tagsApi