import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {TTagEntity} from "../../../redux/api/types/tags.ts"
import {AlexColorDisplay} from "../../formUtils/AlexColorPicker/AlexColorDisplay.tsx"
import {AlexChip} from "../../AlexChip/AlexChip.tsx"

export const TagsTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'tagId',
        label: 'ID',
        format: (value: TTagEntity) => value.tagId.toString(),
        display: false,
        sort: false
    },
    {
        id: 'tagName',
        label: 'Название',
        sort: false
    },
    {
        id: 'tagDesc',
        label: 'Описание',
        sort: false
    },
    {
        id: 'tagColor',
        label: 'Цвет',
        format: (value:TTagEntity) => {
            return (
                <AlexColorDisplay value={value.tagColor}/>
            )
        },
        sort: false
    },
    {
        id:'chipPreview',
        label: 'Предпросмотр тега',
        sort: false,
        format: (value:TTagEntity) => {
            return (
                <AlexChip color={value.tagColor} label={value.tagName}/>
            )
        }
    }
]

