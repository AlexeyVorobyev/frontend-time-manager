import React, {FC, useCallback, useEffect, useLayoutEffect, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {debounce} from "../functions/debounce";

interface IProps {
    serverSideOptions: Map<string, any>
    setServerSideOptions: React.Dispatch<React.SetStateAction<Map<string, any>>>
}

export const AlexDataTableSimpleFilter: FC<IProps> = ({
                                                          serverSideOptions,
                                                          setServerSideOptions
                                                      }) => {

    const [simpleFilterState, setSimpleFilterState] = useState<string | null>(null)
    const [middleWareFilterState, setMiddleWareFilterState] = useState<string | null>(null)
    const debouncedSetMiddleWareFilterState = useCallback(debounce(setMiddleWareFilterState, 800), [])

    useLayoutEffect(() => {
        const simpleFilterSearchParam = serverSideOptions.get('simpleFilter')
        simpleFilterSearchParam && setMiddleWareFilterState(simpleFilterSearchParam)
        simpleFilterSearchParam && setSimpleFilterState(simpleFilterSearchParam)
    }, [])

    useLayoutEffect(() => {
        debouncedSetMiddleWareFilterState(simpleFilterState)
    }, [simpleFilterState])

    useEffect(() => {
        setServerSideOptions((prev) => {
            if (middleWareFilterState) {
                prev.set('simpleFilter', middleWareFilterState)
            } else {
                prev.delete('simpleFilter')
            }
            return new Map(prev)
        })
    }, [middleWareFilterState])

    return (
        <TextField
            value={simpleFilterState || ''}
            onChange={(event) => {
                const value = event.currentTarget.value
                setSimpleFilterState(value.length ? value : null)
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon color={simpleFilterState ? 'secondary' : undefined}/>
                    </InputAdornment>
                ),
            }}
            id={'simpleFilter'}
            color={'secondary'}
            label={'Поиск'}
            size={'small'}
            variant={'outlined'}/>
    )
}