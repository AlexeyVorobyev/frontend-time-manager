import React, {FC, ReactNode, useCallback, useMemo, useState} from "react";
import {Collapse, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useLocation} from "react-router-dom";
import {theme} from "../../Theme/theme";
import {checkLocation} from "../../functions/checkLocation";
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper";


interface IProps {
    name: string,
    path: string | null,
    icon?: ReactNode
    isContracted: boolean
    setIsContracted: React.Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
}

export const SideNavigationItem: FC<IProps> = ({
                                                   name,
                                                   path,
                                                   icon,
                                                   isContracted,
                                                   setIsContracted,
                                                   children
                                               }) => {

    const [open, setOpen] = useState<boolean>(false)
    const location = useLocation()

    const isCurrentLocation = path ? useMemo(() => checkLocation(location.pathname, path), [location, path]) : null

    const handleClick = path ? useCallback(() => {
        setIsContracted(!isContracted)
    }, [isContracted]) : useCallback(() => {
        setIsContracted(false)
        isContracted && setOpen(true)
        !isContracted && setOpen(!open)
    }, [open,isContracted])

    return (
        <>
            <LinkRouterWrapper to={path} disable={'/' + path === location.pathname}>
                <Tooltip title={isContracted ? name : null} placement={'right'}>
                    <ListItemButton onClick={handleClick}
                                    sx={{padding: theme.spacing(1), paddingLeft: theme.spacing(2), height: '48px'}}>
                        {icon &&
                            <ListItemIcon
                                sx={{color: !(isContracted && isCurrentLocation) ? undefined : theme.palette.secondary.main}}>
                                {icon}
                            </ListItemIcon>}
                        {name &&
                            <ListItemText
                                disableTypography
                                sx={{
                                    transform: isCurrentLocation ? `translate(-${theme.spacing(1)})` : undefined,
                                    transition: 'all 1s',
                                    opacity: isContracted ? '0' : '1',
                                }}>
                                <Typography
                                    color={isCurrentLocation ? theme.palette.secondary.main : theme.palette.text.primary}
                                    sx={{width: 'max-content'}}
                                >{name}</Typography>
                            </ListItemText>}
                        {children && !isContracted ? (open ? <ExpandLess sx={{color: theme.palette.text.primary}}/> :
                            <ExpandMore sx={{color: theme.palette.text.primary}}/>) : null}
                    </ListItemButton>
                </Tooltip>
            </LinkRouterWrapper>
            {children && <Collapse in={open && !isContracted}>
                {children}
            </Collapse>}
        </>
    )
}
