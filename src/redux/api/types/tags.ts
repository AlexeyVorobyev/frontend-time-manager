export type TTagsPayload = {
	page?: number
	perPage?: number
	simpleFilter?: string
}

export type TTagPost = {
	tagName: string,
	tagDesc: string,
	tagColor: string
}
export type TTagPatch = {
	tagName?: string,
	tagDesc?: string,
	tagColor?: string
}

export type TTagEntity = {
	tagId: number,
	tagName: string,
	tagDesc: string,
	tagColor: string
}

export type TTagsResponse = {
	list: TTagEntity[]
	totalElements: number,
	totalPages: number,
	currentPage: number,
	elementsPerPage: number
}