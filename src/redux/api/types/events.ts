import {TTagEntity} from "./tags.ts"

export type TEventsPayload = {
	page?: number
	perPage?: number
	simpleFilter?: string
}

export type TEventPost = {
	eventName: string,
	eventDesc?: string,
	eventDate?: Date,
	tags?: string[],
	eventCompletion: boolean
}

export type TEventPatch = {
	eventName?: string,
	eventDesc?: string,
	eventDate?: Date,
	tags?: string[],
	eventCompletion?: boolean
}

export type TEventEntity = {
	eventId: number,
	eventName: string,
	eventDesc?: string,
	eventDate?: Date,
	tags?: TTagEntity[],
	eventCompletion: boolean
}

export type TEventsResponse = {
	list: TEventEntity[]
	totalElements: number,
	totalPages: number,
	currentPage: number,
	elementsPerPage: number
}