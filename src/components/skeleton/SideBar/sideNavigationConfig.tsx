import {ReactNode} from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';
import {EPageType} from "../../pages/СustomizationPage/СustomizationPage";

export interface ISideNavigationConfig {
    path: string | null,
    name: string
    icon?: ReactNode
    routes?: ISideNavigationConfig[]
}


export const sideNavigationConfig: ISideNavigationConfig[] = [
    {path: '/', name: 'Статистика', icon: <QueryStatsIcon/>},

    {
        path: `customization/graphs/${EPageType.table}`,
        name: 'Графы',
        icon: <TimelineIcon/>
    },
]