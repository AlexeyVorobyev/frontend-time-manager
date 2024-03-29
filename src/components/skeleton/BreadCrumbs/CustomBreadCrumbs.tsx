import {FC, useCallback, useMemo} from "react";
import {useLocation} from "react-router-dom";
import {Breadcrumbs, Typography} from "@mui/material";
import {constructPathLink} from "../../functions/constructPathLink";
import {theme} from "../../Theme/theme";
import {checkLocation} from "../../functions/checkLocation";
import {customBreadCrumbsNameMap} from "./customBreadCrumbsNameMap";
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper";
import {autoGeneratedAllowedLinks} from "../../Router/routesList";
import {APP_NAME} from "../../../globalConstants.ts"

interface IBreadCrumbConfig {
    linkTo: string,
    name: string
}

export const CustomBreadCrumbs: FC = () => {

    const location = useLocation()
    const pathArr = useMemo(() => location.pathname.split('/').filter((item) => item !== ''), [location])

    const forbiddenLinks:string[] = useMemo(() => [],[])

    const constructBreadCrumbs = useCallback(() => {
        const breadCrumbsConfig: IBreadCrumbConfig[] = []

        for (let i = 1; i <= pathArr.length; i++) {
            const slicedArr = pathArr.slice(0, i)
            const name = slicedArr[slicedArr.length - 1]
            breadCrumbsConfig.push({
                name: customBreadCrumbsNameMap.get(constructPathLink(slicedArr)) || name,
                linkTo: constructPathLink(slicedArr)
            })
        }

        return breadCrumbsConfig.map((item) => {
            const allowLink = !forbiddenLinks.includes(item.linkTo) && autoGeneratedAllowedLinks.includes(item.linkTo)
            return (
                <LinkRouterWrapper
                    tooltipTitle={'Перейти'}
                    key={item.linkTo}
                    to={allowLink ? item.linkTo : null}>
                    <Typography variant={'subtitle2'}
                                color={checkLocation(location.pathname, item.linkTo) ? theme.palette.secondary.main : allowLink ? '#000000' : '#777777'}
                                height={'24px'}>{item.name}</Typography>
                </LinkRouterWrapper>
            )
        })
    }, [pathArr])

    return (
        <Breadcrumbs>
            <LinkRouterWrapper
                to={'/'}
                tooltipTitle={'Перейти'}
                key={'/'}>
                <Typography variant={'subtitle2'}
                            color={checkLocation(location.pathname, '/') ? theme.palette.secondary.main : '#000000'}
                            height={'24px'}>{APP_NAME.toUpperCase()}</Typography>
            </LinkRouterWrapper>
            {constructBreadCrumbs()}
        </Breadcrumbs>
    )
}