import React, {FC, useLayoutEffect} from "react";
import {Box, CircularProgress, Grid, Paper, Stack} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {theme} from "../../Theme/theme";
import {AlexInputControlled} from "../../formUtils/AlexInput/AlexInputControlled.tsx";
import {useGraphPatchMutation, useGraphPostMutation, useLazyGraphQuery} from "../../../redux/api/graphs.api";
import {IGraphPostPutPayload} from "../../../redux/api/types/graphs";
import {useNavigate, useSearchParams} from "react-router-dom";
import {extractIds} from "../../functions/extractIds";
import {AlexReactFlowControlled} from "../../AlexReactFlowGraph/AlexReactFlowControlled";

interface IProps {
    setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
    edit: boolean
}

const DEBUG = true

export const GraphsForm: FC<IProps> = ({
                                           setOnSubmitFunc,
                                           edit
                                       }) => {


    const {formState: {errors}, reset} = useFormContext()
    const [searchParams] = useSearchParams()
    const [addGraph] = useGraphPostMutation()
    const [updateGraph] = useGraphPatchMutation()
    const [lazyGraphQuery, result] = useLazyGraphQuery()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (edit) {
            lazyGraphQuery({id: searchParams.get('id')!})
                .then((response) => {
                    console.log('query response', response)
                    const data = {
                        ...response.data,
                    }
                    console.log('query after processing', data)
                    reset(data)
                })
        }
    }, [])

    const update = (data: IGraphPostPutPayload) => {
        DEBUG && console.log('data UPDATE', data)
        updateGraph({id: searchParams.get('id')!, body: data})
            .then((response) => {
                console.log('promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const add = (data: IGraphPostPutPayload) => {
        DEBUG && console.log('data ADD', data)
        addGraph({body: data})
            .then((response) => {
                console.log('promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const onSubmit = (data: IGraphPostPutPayload) => {
        DEBUG && console.log('data BEFORE processing', data)
        data = extractIds(data)

        if (edit) {
            DEBUG && console.log('data AFTER processing', data)
            update(data)
        } else {
            DEBUG && console.log('data AFTER processing', data)
            add(data)
        }
    }

    useLayoutEffect(() => {
        setOnSubmitFunc({callback: onSubmit})
    }, [])

    return (<Box sx={{
        width: '100%',
        display: 'flex',
        flex: 1,
        overflowY: 'scroll',
    }}>
        {(edit && !result.data) && (<Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress/>
        </Box>)}
        {(!edit || result.data) && (<Box sx={{
            width: '100%',
            padding: theme.spacing(2),
            boxSizing: 'border-box',
            height:'100%'
        }}>
            <Stack direction={'column'} height={'100%'} rowGap={theme.spacing(2)}>
                <Grid container spacing={theme.spacing(2)}>
                    <Grid item xs={6} lg={4}>
                        <AlexInputControlled name={'name'} label={'Название'}
											 error={Boolean(errors.title)} required
											 errorText={errors.title?.message as string | undefined}/>
                    </Grid>
                </Grid>
                <Paper elevation={3} sx={{
                    width:'100%',
                    height:0,
                    display:'flex',
                    flex:1,
                }}>
                    <AlexReactFlowControlled name={'graphData'}/>
                </Paper>
            </Stack>
        </Box>)}
    </Box>)
}