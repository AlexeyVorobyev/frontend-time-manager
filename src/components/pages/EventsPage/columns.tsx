import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {TEventEntity} from "../../../redux/api/types/events.ts"

export const EventsTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'eventId',
        label: 'ID',
        format: (value: TEventEntity) => value.eventId.toString(),
        display: false,
        sort: false
    },
    {
        id: 'eventName',
        label: 'Название',
        sort: false
    },
    {
        id: 'eventDesc',
        label: 'Описание',
        sort: false
    },
    {
        id: 'eventDate',
        label: 'Дата',
        sort: false
    },
    {
        id: 'tags',
        label: 'Тэги',
        sort: false,
        format: (value:TEventEntity) => {
            return value.tags.map((tagId) => {
                return tagId
            })
        }
    }
]

