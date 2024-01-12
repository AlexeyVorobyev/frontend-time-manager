import React, {FC, useState} from "react";
import {IconButton, Popover, Tooltip} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import {AlexFiltersFormContext} from "./AlexFiltersFormContext";
import {AlexFilter} from "./AlexFilter";
import {alexFiltersMap} from "./alexFiltersMap";

interface IProps {
    filterListIds: string[]
    serverSideOptions: Map<string, any>
    setServerSideOptions: React.Dispatch<React.SetStateAction<Map<string, any>>>
}

const DEBUG = true
const DEBUG_PREFIX = 'ALEX_FILTERS'

export const AlexFilters: FC<IProps> = ({
                                            filterListIds,
                                            serverSideOptions,
                                            setServerSideOptions
                                        }) => {
    DEBUG && console.log(DEBUG_PREFIX, 'filterListIds', filterListIds)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    return (<>
        <Tooltip title={'Фильтры'}>
            <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget)
            }}>
                <TuneIcon color={'secondary'}/>
            </IconButton>
        </Tooltip>
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <AlexFiltersFormContext setAnchorEl={setAnchorEl} setServerSideOptions={setServerSideOptions}
                                    serverSideOptions={serverSideOptions} filterListIds={filterListIds}>
                {filterListIds.map((id) => {
                    const config = alexFiltersMap.get(id)
                    if (config) {
                        return <AlexFilter config={config}/>
                    } else {
                        return `Некорректный id фильтра ${id}`
                    }
                })}
            </AlexFiltersFormContext>
        </Popover>
    </>)
}