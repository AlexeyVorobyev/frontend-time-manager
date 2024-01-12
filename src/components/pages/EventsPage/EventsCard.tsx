import React, {FC, useMemo} from "react"
import {useSearchParams} from "react-router-dom"
import {Box, CircularProgress, Grid, Stack} from "@mui/material"
import {theme} from "../../Theme/theme"
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView"
import {TEventEntity} from "../../../redux/api/types/events.ts"
import {useEventQuery} from "../../../redux/api/events.api.ts"

export const EventsCard: FC = () => {
	const [searchParams] = useSearchParams()

	const {
		data,
		isFetching,
		isLoading,
		isSuccess
	} = useEventQuery({id: searchParams.get('id')!})
	const eventData = useMemo(() => data as TEventEntity, [data])

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
								{eventData.eventId}
							</AlexDataView>
						</Grid>
						<Grid item xs={6}>
							<AlexDataView label={'Название'}>
								{eventData.eventName}
							</AlexDataView>
						</Grid>
						<Grid item xs={6}>
							<AlexDataView label={'Дата создания'}>
								{eventData.eventDate.toString()}
							</AlexDataView>
						</Grid>
						<Grid item xs={6}/>
						<Grid item xs={12}>
							<AlexDataView label={'Описание'}>
								{eventData.eventDesc}
							</AlexDataView>
						</Grid>
					</Grid>
				</Stack>
			</Box>)}
		</Box>
	)
}