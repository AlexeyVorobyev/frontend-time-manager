import {ReactNode} from "react"
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import {EPageType} from "../../pages/СustomizationPage/СustomizationPage"
import {AlexIcon} from "../../AlexIcon/AlexIcon.tsx"
import {EIconToNameMap} from "../../AlexIcon/AlexIconIconToNameMap.ts"

export interface ISideNavigationConfig {
	path: string | null,
	name: string
	icon?: ReactNode
	routes?: ISideNavigationConfig[]
}


export const sideNavigationConfig: ISideNavigationConfig[] = [
	{
		path: '/',
		name: 'Календарь',
		icon: <AlexIcon iconName={EIconToNameMap.calendar}/>
	},

	{
		path: `customization/events/${EPageType.table}`,
		name: 'Настройка событий',
		icon: <AlexIcon iconName={EIconToNameMap.schedule}/>
	},

	{
		path: `customization/tags/${EPageType.table}`,
		name: 'Настройка тегов',
		icon: <AlexIcon iconName={EIconToNameMap.tag}/>
	},
]