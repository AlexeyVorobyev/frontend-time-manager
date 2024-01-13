import ScheduleIcon from '@mui/icons-material/Schedule'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import {OverridableComponent} from "@mui/material/OverridableComponent"
import {SvgIconTypeMap} from "@mui/material"
import TagIcon from '@mui/icons-material/Tag'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export enum EIconToNameMap {
	schedule = 'schedule',
	calendar = 'calendar',
	tag = 'tag',
	keyBoardArrowLeft = 'keyBoardArrowLeft',
	keyBoardArrowRight = 'keyBoardArrowRight'
}

type TIconToNameMap = {
	[key in EIconToNameMap]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
}

export const IconToNameMap: TIconToNameMap = {
	schedule: ScheduleIcon,
	calendar: CalendarMonthIcon,
	tag: TagIcon,
	keyBoardArrowLeft: KeyboardArrowLeftIcon,
	keyBoardArrowRight: KeyboardArrowRightIcon
}