import {IGraphData} from "../../../components/AlexReactFlowGraph/AlexReactFlowUncontrolled";

export enum ESort {
    ascending = 'ASC',
    descending = 'DESC'
}

export interface IGraphsPayload {
    titleFilter?: string
    page?: number
    perPage?: number
    sort?: {
        [key: string]: `${ESort}`
    }
}

export interface IGraphEntity {
    id: string
    name: string
    creationDate:string
    updateDate:string
    graphData: IGraphData
}

export interface IGraphPostPutPayload {
    name?: string
    graphData?: IGraphData
}
