import React, {FC, useLayoutEffect} from "react"
import {Box, CircularProgress, Grid, Stack, Typography} from "@mui/material"
import {useFormContext} from "react-hook-form"
import {theme} from "../../Theme/theme"
import {AlexInputControlled} from "../../formUtils/AlexInput/AlexInputControlled.tsx"
import {useNavigate, useSearchParams} from "react-router-dom"
import {extractIds} from "../../functions/extractIds"
import {useEventPatchMutation, useEventPostMutation, useLazyEventQuery} from "../../../redux/api/events.api.ts"
import {TEventPatch, TEventPost} from "../../../redux/api/types/events.ts"
import {AlexServerAutoComplete} from "../../formUtils/AlexServerAutocomplete/AlexServerAutoComplete.tsx"
import {useLazyTagsQuery} from "../../../redux/api/tags.api.ts"
import {TTagEntity} from "../../../redux/api/types/tags.ts"
import {AlexDatePickerControlled} from "../../formUtils/AlexDatePicker/AlexDatePickerControlled.tsx"
import {formatTag} from "../../functions/formatFunctions.ts"
import {AlexCheckBoxControlled} from "../../formUtils/AlexCheckBox/AlexCheckBoxControlled.tsx"
import {EDatePickerType} from "../../formUtils/AlexDatePicker/AlexDatePicker.tsx"

interface IProps {
	setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
	edit: boolean
}

const DEBUG = true

export const EventsForm: FC<IProps> = ({
										   setOnSubmitFunc,
										   edit
									   }) => {


	const {formState: {errors}, reset} = useFormContext()
	const [searchParams] = useSearchParams()
	const [addEvent] = useEventPostMutation()
	const [updateEvent] = useEventPatchMutation()
	const [lazyEventQuery, result] = useLazyEventQuery()
	const navigate = useNavigate()

	useLayoutEffect(() => {
		if (edit) {
			lazyEventQuery({id: searchParams.get('id')!})
				.then((response) => {
					console.log('query response', response)
					const data = {
						...response.data,
						tags: response.data?.tags?.map((tagEntity: TTagEntity) => formatTag(tagEntity)) || []
					}
					console.log('query after processing', data)
					reset(data)
				})
		}
	}, [])

	const update = (data: TEventPatch) => {
		DEBUG && console.log('data UPDATE', data)
		updateEvent({
			id: searchParams.get('id')!,
			body: {
				...(data.eventDate && {eventDate: data.eventDate}),
				...(data.eventDesc && {eventDesc: data.eventDesc}),
				...(data.eventName && {eventName: data.eventName}),
				...((data.eventCompletion == false || data.eventCompletion) && {eventCompletion: data.eventCompletion}),
				...(data.tags && {tags: data.tags.map((item: any) => item.id)})
			}
		})
			.then((response) => {
				console.log('promise response', response)
				if (searchParams.get('from')) {
					navigate(JSON.parse(searchParams.get('from')!))
				} else {
					navigate('./../table')
				}
			})
	}

	const add = (data: TEventPost) => {
		DEBUG && console.log('data ADD', data)
		addEvent({
			body: {
				...data,
				tags: Array.isArray(data.tags) ? data.tags.map((item: any) => item.id) : []
			}
		})
			.then((response) => {
				console.log('promise response', response)
				if (searchParams.get('from')) {
					navigate(JSON.parse(searchParams.get('from')!))
				} else {
					navigate('./../table')
				}
			})
	}

	const onSubmit = (data: any) => {
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
			height: '100%'
		}}>
			<Stack direction={'column'} height={'100%'} rowGap={theme.spacing(2)}>
				<Grid container spacing={theme.spacing(2)}>
					<Grid item xs={6}>
						<AlexInputControlled name={'eventName'} label={'Название'}
											 error={Boolean(errors.eventName)} required
											 errorText={errors.eventName?.message as string | undefined}/>
					</Grid>
					<Grid item xs={6}>
						<AlexServerAutoComplete name={'tags'} label={'Тэги'}
												useLazyGetQuery={useLazyTagsQuery} multiple perPage={1000}
												optionsConfig={{
													optionsReadFunction: formatTag,
													optionsPath: ['list']
												}}/>
					</Grid>
					<Grid item xs={6}>
						<AlexDatePickerControlled name={'eventDate'} label={'Выбор даты'} type={EDatePickerType.dateTime}/>
					</Grid>
					<Grid item xs={6}>
						<Stack alignItems={'center'} spacing={theme.spacing(2)} direction={'row'} height={"100%"}>
							<Typography variant={'h6'}>Выполнение: </Typography>
							<AlexCheckBoxControlled name={'eventCompletion'} size={30} color={{
								outline: theme.palette.primary.dark,
								checked: theme.palette.primary.main
							}}/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<AlexInputControlled name={'eventDesc'} label={'Описание'} multiline maxRows={12}
											 error={Boolean(errors.title)}
											 errorText={errors.title?.message as string | undefined}/>
					</Grid>
				</Grid>
			</Stack>
		</Box>)}
	</Box>)
}