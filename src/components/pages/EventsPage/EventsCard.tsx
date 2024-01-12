import React, {FC, useMemo} from "react"
import {useSearchParams} from "react-router-dom"
import {Box, CircularProgress, Grid, Stack} from "@mui/material"
import {theme} from "../../Theme/theme"
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView"
import {TEventEntity} from "../../../redux/api/types/events.ts"
import {useEventQuery} from "../../../redux/api/events.api.ts"
import {TTagEntity} from "../../../redux/api/types/tags.ts"
import {AlexChip} from "../../AlexChip/AlexChip.tsx"
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper.tsx"
import {AlexCheckBox} from "../../formUtils/AlexCheckBox/AlexCheckBox.tsx"

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
						<Grid item xs={6}>
							<AlexDataView label={'Теги'}>
								<Stack direction={"row"} spacing={theme.spacing(2)} alignItems={'center'}>
									{eventData.tags.map((tagEntity: TTagEntity) => {
										return (
											<LinkRouterWrapper to={`../customization/tags/view?id=${tagEntity.tagId}`} tooltipTitle={'Перейти к тегу'}>
												<AlexChip label={tagEntity.tagName} color={tagEntity.tagColor}/>
											</LinkRouterWrapper>
										)
									})}
								</Stack>
							</AlexDataView>
						</Grid>
						<Grid item xs={12}>
							<AlexDataView label={'Описание'}>
								{eventData.eventDesc}
							</AlexDataView>
						</Grid>
						<Grid item xs={6}>
							<AlexDataView label={'Выполнено'}>
								<Box maxWidth={'48px'}>
									<AlexCheckBox value={eventData.eventCompletion} size={30} disabled color={{
										outline:theme.palette.primary.dark,
										checked:theme.palette.primary.main
									}}/>
								</Box>
							</AlexDataView>
						</Grid>
					</Grid>
				</Stack>
			</Box>)}
		</Box>
	)
}