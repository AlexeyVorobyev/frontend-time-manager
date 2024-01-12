export type TEventsPayload = {
	page?: number
	perPage?: number
	simpleFilter?: string
}

export type TEventPost = {
	eventName: string,
	eventDesc: string,
	eventDate: Date,
	tags: string[]
}

export type TEventPatch = {
	eventName?: string,
	eventDesc?: string,
	eventDate?: Date,
	tags?: string[]
}

export type TEventEntity = {
	eventId: number,
	eventName: string,
	eventDesc: string,
	eventDate: Date,
	tags: string[]
}

export type TEventsResponse = {
	list: TEventEntity[]
	totalElements: number,
	totalPages: number,
	currentPage: number,
	elementsPerPage: number
}