import {api, constructQueryString} from './api'
import {IEventPostPutPayload, IEventsPayload} from "./types/events";

export const eventsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		events: builder.query<any, IEventsPayload>({
			query: (settings) => ({
				url: '/event' + constructQueryString(settings),
				method: 'GET',
			}),
			providesTags: ['events']
		}),
		event: builder.query<any, { id: string }>({
			query: (settings) => ({
				url: `/event/${settings.id}`,
				method: 'GET',
			}),
			providesTags: ['events']
		}),
		eventDelete: builder.mutation<any, { id: string }>({
			query: (settings) => ({
				url: `/event/${settings.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['events']
		}),
		eventPost: builder.mutation<any, { body: IEventPostPutPayload }>({
			query: (settings) => ({
				url: `/event`,
				method: 'POST',
				body: settings.body
			}),
			invalidatesTags: ['events']
		}),
		eventPatch: builder.mutation<any, { id: string, body: IEventPostPutPayload  }>({
			query: (settings) => ({
				url: `/event/${settings.id}`,
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