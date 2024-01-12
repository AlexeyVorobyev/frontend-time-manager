import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {OverridableComponent} from "@mui/material/OverridableComponent"
import {SvgIconTypeMap} from "@mui/material"
import TagIcon from '@mui/icons-material/Tag';

export enum EIconToNameMap {
	schedule = 'schedule',
	calendar = 'calendar',
	tag = 'tag'
}

type TIconToNameMap = {
	[key in EIconToNameMap]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string};
}

export const IconToNameMap: TIconToNameMap = {
	schedule: ScheduleIcon,
	calendar: CalendarMonthIcon,
	tag: TagIcon
}