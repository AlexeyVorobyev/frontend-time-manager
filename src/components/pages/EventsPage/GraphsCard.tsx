import React, {FC, useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import {useGraphQuery} from "../../../redux/api/graphs.api";
import {Box, CircularProgress, Grid, Paper, Stack} from "@mui/material";
import {theme} from "../../Theme/theme";
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView";
import {IGraphEntity} from "../../../redux/api/types/graphs";
import {AlexReactFlowControlled} from "../../AlexReactFlowGraph/AlexReactFlowControlled";
import {AlexReactFlowUncontrolled, IGraphData} from "../../AlexReactFlowGraph/AlexReactFlowUncontrolled";

export const GraphsCard: FC = () => {
    const [searchParams] = useSearchParams()

    const {
        data,
        isFetching,
        isLoading,
        isSuccess
    } = useGraphQuery({id: searchParams.get('id')!})
    const graphData = useMemo(() => data as IGraphEntity, [data])

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flex: 1,
            overflowY: 'scroll',
        }}>
            {(isLoading || isFetching || !isSuccess) && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress/>
            </Box>)}
            {(!isLoading && !isFetching && isSuccess) && (<Box sx={{
                width: '100%',
                padding: theme.spacing(2),
                boxSizing: 'border-box'
            }}>
                <Stack direction={'column'} height={'100%'} rowGap={theme.spacing(2)}>
                    <Grid container spacing={theme.spacing(2)}>
                        <Grid item xs={6}>
                            <AlexDataView label={'ID'}>
                                {graphData.id}
                            </AlexDataView>
                        </Grid>
                        <Grid item xs={6}>
                            <AlexDataView label={'Название'}>
                                {graphData.name}
                            </AlexDataView>
                        </Grid>
                        <Grid item xs={6}>
                            <AlexDataView label={'Дата создания'}>
                                {graphData.creationDate}
                            </AlexDataView>
                        </Grid>
                        <Grid item xs={6}>
                            <AlexDataView label={'Дата изменения'}>
                                {graphData.updateDate}
                            </AlexDataView>
                        </Grid>
                    </Grid>
                    <Paper elevation={3} sx={{
                        width: '100%',
                        height: 0,
                        display: 'flex',
                        flex: 1,
                    }}>
                        <AlexReactFlowUncontrolled value={graphData.graphData}/>
                    </Paper>
                </Stack>
            </Box>)}
        </Box>
    )
}