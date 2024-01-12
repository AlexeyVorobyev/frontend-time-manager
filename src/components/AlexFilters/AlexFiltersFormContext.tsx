import React, {FC, ReactNode, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {theme} from "../Theme/theme";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";

interface IProps {
    children: ReactNode
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
    serverSideOptions: Map<string, any>
    setServerSideOptions: React.Dispatch<React.SetStateAction<Map<string, any>>>
    filterListIds: string[]
}

const DEBUG = true
const DEBUG_PREFIX = 'ALEX_FILTERS'

export const AlexFiltersFormContext: FC<IProps> = ({
                                                       children,
                                                       setAnchorEl,
                                                       serverSideOptions,
                                                       setServerSideOptions,
                                                       filterListIds
                                                   }) => {

    const methods = useForm()
    const {handleSubmit, reset, formState: {errors}} = methods

    //синхронизация фильтров в форме с текущими serverSideOptions
    useEffect(() => {
        const data = Object.fromEntries(Array.from(serverSideOptions)
            .filter((param) => filterListIds.includes(param[0])))
        DEBUG && console.log(DEBUG_PREFIX, 'data onMount', data)
        reset(data)
    }, [])

    const onSubmit = (data: any) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data onSubmit', data)
        setServerSideOptions((prev) => {
            return new Map([
                ...Array.from(prev)
                    .filter((param) => !filterListIds.includes(param[0])),
                ...(new Map(Object.entries(data)
                    .filter((param) => param[1]))),
            ])
        })
        setAnchorEl(null)
    }

    const handleClear = () => {
        setServerSideOptions((prev) => {
            return new Map(
                Array.from(prev)
                    .filter((param) => !filterListIds.includes(param[0]))
            )
        })
        reset()
        setAnchorEl(null)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{
                    padding: theme.spacing(2),
                    minWidth: '500px'
                }}>
                    <Stack direction={'column'} spacing={theme.spacing(2)}>
                        {children}
                    </Stack>
                    <Divider sx={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>
                    <Stack direction={'row'} spacing={theme.spacing(2)} justifyContent={'flex-end'}>
                        <Button variant={'outlined'} color={'neutral'}
                                onClick={handleClear}>
                            <Typography variant={'button'}
                                        color={theme.palette.neutral.notContrastText}>Очистить всё</Typography>
                        </Button>
                        <Button variant={'contained'} type={'submit'}>
                            <Typography variant={'button'}>Применить</Typography>
                        </Button>
                    </Stack>
                </Box>
            </form>
        </FormProvider>
    )
}