import React, {FC, useMemo} from "react"
import {useSearchParams} from "react-router-dom"
import {Box, CircularProgress, Grid, Stack} from "@mui/material"
import {theme} from "../../Theme/theme"
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView"
import {TTagEntity} from "../../../redux/api/types/tags.ts"
import {useTagQuery} from "../../../redux/api/tags.api.ts"

export const TagsCard: FC = () => {
	const [searchParams] = useSearchParams()

	const {
		data,
		isFetching,
		isLoading,
		isSuccess
	} = useTagQuery({id: searchParams.get('id')!})
	const tagData = useMemo(() => data as TTagEntity, [data])

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
								{tagData.tagId}
							</AlexDataView>
						</Grid>
						<Grid item xs={6}>
							<AlexDataView label={'Название'}>
								{tagData.tagName}
							</AlexDataView>
						</Grid>
						<Grid item xs={6}>
							<AlexDataView label={'Цвет'}>
								{tagData.tagColor.toString()}
							</AlexDataView>
						</Grid>
						<Grid item xs={6}/>
						<Grid item xs={12}>
							<AlexDataView label={'Описание'}>
								{tagData.tagDesc}
							</AlexDataView>
						</Grid>
					</Grid>
				</Stack>
			</Box>)}
		</Box>
	)
}