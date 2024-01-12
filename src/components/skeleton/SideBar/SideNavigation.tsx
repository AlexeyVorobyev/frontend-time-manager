import {FC, useCallback, useState} from "react";
import {List, Stack, Switch, Tooltip} from "@mui/material";
import {SideNavigationItem} from "./SideNavigationItem";
import {sideNavigationConfig, ISideNavigationConfig} from "./sideNavigationConfig";
import {theme} from "../../Theme/theme";

export const SideNavigation: FC = () => {
    const [isContracted, setIsContracted] = useState<boolean>(true)

    const constructSideNavigation = useCallback((sideNavigationConfig: ISideNavigationConfig[]) => {
        return sideNavigationConfig.map((item) => {
            if (item.routes) {
                return (<SideNavigationItem key={item.name} name={item.name} path={item.path}
                                            icon={item.icon} isContracted={isContracted} setIsContracted={setIsContracted}>
                    {constructSideNavigation(item.routes)}
                </SideNavigationItem>)
            } else {
                return <SideNavigationItem key={item.name} name={item.name} path={item.path}
                                           icon={item.icon} isContracted={isContracted} setIsContracted={setIsContracted}/>
            }
        })
    }, [sideNavigationConfig, isContracted])

    return (
        <Stack
            direction={'column'}
            justifyContent={'space-between'}
            sx={{
                width: isContracted ? '58px' : '400px',
                boxShadow: 2,
                transition: 'all 1s',
            }}
        >
            <List sx={{padding: '0', overflow: 'hidden'}}>
                {constructSideNavigation(sideNavigationConfig)}
            </List>
            <Tooltip title={isContracted ? 'Раскрыть меню' : 'Свернуть меню'}>
                <Stack direction={'row'} spacing={theme.spacing(2)}>
                    <Switch checked={!isContracted} onChange={() => {
                        setIsContracted(!isContracted)
                    }} color={'secondary'}/>
                </Stack>
            </Tooltip>
        </Stack>
    )
}