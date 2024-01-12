import React, {FC, useLayoutEffect, useRef, useState} from "react";
import {FormControl, MenuItem, Pagination, Stack, TextField, Typography} from "@mui/material";
import {theme} from "../Theme/theme";
import {booleanNumber} from "../functions/booleanNumber";

interface IProps {
    availablePages?: number
    perPageOptions: string[]
    availableElements?: number
    serverSideOptions: Map<string, any>
    setServerSideOptions: React.Dispatch<React.SetStateAction<Map<string, any>>>
}

export const AlexDataTableFooter: FC<IProps> = ({
                                                    availablePages,
                                                    perPageOptions,
                                                    availableElements,
                                                    serverSideOptions,
                                                    setServerSideOptions
                                                }) => {
    const [page, setPage] = useState<string | null>(serverSideOptions.get('page') || '0');
    const [perPage, setPerPage] = useState<string | null>(serverSideOptions.get('perPage') || '8')
    const savedAvailablePages = useRef<string | null>(booleanNumber(availablePages) ? availablePages!.toString() : null)
    const savedAvailableElements = useRef<string | null>(booleanNumber(availableElements) ? availableElements!.toString() : null)

    useLayoutEffect(() => {
        if (!booleanNumber(availablePages)) return
        if (availablePages !== Number(savedAvailablePages.current) && savedAvailablePages.current) {
            setPage('0')
        }
        savedAvailablePages.current = availablePages!.toString()
    }, [availablePages])

    useLayoutEffect(() => {
        if (availableElements) {
            savedAvailableElements.current = availableElements!.toString()
        }
    }, [availableElements])

    useLayoutEffect(() => {
        if (!page) return
        setServerSideOptions((prev) => {
            prev.set('page', page)
            return new Map(prev)
        })
    }, [page])

    useLayoutEffect(() => {
        if (!perPage) return
        setServerSideOptions((prev) => {
            prev.set('perPage', perPage)
            return new Map(prev)
        })
    }, [perPage])

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
               sx={{padding: theme.spacing(2)}}>
            <Typography variant={'subtitle2'} color={theme.palette.text.primary} noWrap>
                Всего элементов: {
                booleanNumber(availableElements)
                    ? availableElements
                    : savedAvailableElements.current ||
                    Number(savedAvailablePages.current) * Number(perPage) || ' '}
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(2)}>
                <Typography variant={'subtitle2'} color={theme.palette.text.primary} noWrap>На странице:</Typography>
                <FormControl>
                    <TextField
                        value={perPage}
                        onChange={(event) => setPerPage(event.target.value)}
                        select
                        size={'small'}
                    >
                        {perPageOptions.map((option) => <MenuItem key={option.toString()}
                                                                  value={option.toString()}>{option.toString()}</MenuItem>)}
                    </TextField>
                </FormControl>
            </Stack>
            <Pagination
                count={(booleanNumber(availablePages) ? availablePages : Number(savedAvailablePages.current) || 10) || 1}
                page={Number(page) + 1}
                color={'secondary'}
                onChange={(event: any, value) => setPage((value - 1).toString())}/>
        </Stack>
    )
}