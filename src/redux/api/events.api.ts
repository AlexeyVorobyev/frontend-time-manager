import {api, constructQueryString} from './api'
import {TEventEntity, TEventPatch, TEventPost, TEventsPayload, TEventsResponse} from "./types/events.ts"
import {TEntityWithId} from "./types/types.ts"
import {GLOBAL_CONFIG} from "../../globalConfig.ts"

export const eventsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		events: builder.query<TEventsResponse, TEventsPayload>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event` + constructQueryString(settings),
				method: 'GET',
			}),
			providesTags: ['events']
		}),
		event: builder.query<TEventEntity, TEntityWithId>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event/${settings.id}`,
				method: 'GET',
			}),
			providesTags: ['events']
		}),
		eventDelete: builder.mutation<undefined, TEntityWithId>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event/${settings.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['events']
		}),
		eventPost: builder.mutation<undefined, { body: TEventPost }>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event`,
				method: 'POST',
				body: settings.body
			}),
			invalidatesTags: ['events']
		}),
		eventPatch: builder.mutation<undefined, TEntityWithId & {body: TEventPatch }>({
			query: (settings) => ({
				url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event/${settings.id}`,
				method: 'PATCH',
				body: settings.body
			}),
			invalidatesTags: ['events']
		}),
	}),
	overrideExisting: false
})

export const {
	useLazyEventsQuery,
	useEventDeleteMutation,
	useEventQuery,
	useLazyEventQuery,
	useEventPostMutation,
	useEventPatchMutation
} = eventsApi