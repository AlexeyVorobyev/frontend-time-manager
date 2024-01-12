import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable"
import {TEventEntity} from "../../../redux/api/types/events.ts"
import {TTagEntity} from "../../../redux/api/types/tags.ts"
import {AlexChip} from "../../AlexChip/AlexChip.tsx"
import {Stack} from "@mui/material"
import {theme} from "../../Theme/theme.ts"
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper.tsx"
import {AlexCheckBox} from "../../formUtils/AlexCheckBox/AlexCheckBox.tsx"

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
		format: (value: TEventEntity) => {
			return (
				<Stack direction={"row"} spacing={theme.spacing(2)} alignItems={'center'}>
					{value.tags?.map((tagEntity: TTagEntity) => {
						return (<LinkRouterWrapper to={`../customization/tags/view?id=${tagEntity.tagId}`}
												   tooltipTitle={'Перейти к тегу'}>
							<AlexChip label={tagEntity.tagName} color={tagEntity.tagColor}/>
						</LinkRouterWrapper>)
					})}
				</Stack>
			)
		}
	},
	{
		id: 'eventCompletion',
		label: 'Выполнено',
		sort: false,
		format: (value:TEventEntity) => {
			return (
				<AlexCheckBox value={value.eventCompletion} size={30} disabled color={{
					outline:theme.palette.primary.dark,
					checked:theme.palette.primary.main
				}}/>
			)
		}
	},
]

