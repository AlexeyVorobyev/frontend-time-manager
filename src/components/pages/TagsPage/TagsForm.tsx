import React, {FC, useLayoutEffect} from "react"
import {Box, Button, CircularProgress, Grid, Stack, Typography} from "@mui/material"
import {useFormContext} from "react-hook-form"
import {theme} from "../../Theme/theme"
import {AlexInputControlled} from "../../formUtils/AlexInput/AlexInputControlled.tsx"
import {useNavigate, useSearchParams} from "react-router-dom"
import {extractIds} from "../../functions/extractIds"
import {
	useLazyTagQuery,
	useLazyTagsQuery,
	useTagPatchMutation,
	useTagPostMutation
} from "../../../redux/api/tags.api.ts"
import {TTagEntity, TTagPatch, TTagPost} from "../../../redux/api/types/tags.ts"
import {AlexServerAutoComplete} from "../../formUtils/AlexServerAutocomplete/AlexServerAutoComplete.tsx"
import {AlexDatePickerControlled} from "../../formUtils/AlexDatePicker/AlexDatePickerControlled.tsx"
import {ColorPicker} from "react-mui-color"
import {AlexColorPickerControlled} from "../../formUtils/AlexColorPicker/AlexColorPickerControlled.tsx"
import {AlexDialogButton} from "../../AlexDialog/AlexDialogButton.tsx"
import {AlexColorDisplay} from "../../formUtils/AlexColorPicker/AlexColorDisplay.tsx"
import {DEFAULT_COLOR} from "../../formUtils/AlexColorPicker/AlexColorPicker.tsx"

interface IProps {
	setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
	edit: boolean
}

const DEBUG = true

export const TagsForm: FC<IProps> = ({
										 setOnSubmitFunc,
										 edit,
									 }) => {


	const {
		formState: {errors},
		reset,
		resetField,
		watch
	} = useFormContext()
	const [searchParams] = useSearchParams()
	const [addTag] = useTagPostMutation()
	const [updateTag] = useTagPatchMutation()
	const [lazyTagQuery, result] = useLazyTagQuery()
	const navigate = useNavigate()
	const watchTagColor = watch('tagColor')

	useLayoutEffect(() => {
		if (edit) {
			lazyTagQuery({id: searchParams.get('id')!})
				.then((response) => {
					console.log('query response', response)
					const data = {
						...response.data,
					}
					console.log('query after processing', data)
					reset(data)
				})
		}
		else {
			reset({
				tagColor: DEFAULT_COLOR
			})
		}
	}, [])

	const update = (data: TTagPatch) => {
		DEBUG && console.log('data UPDATE', data)
		updateTag({
			id: searchParams.get('id')!, body: {
				...(data.tagDesc && {tagDesc: data.tagDesc}),
				...(data.tagName && {tagName: data.tagName}),
				...(data.tagColor && {tagColor: data.tagColor}),
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

	const add = (data: TTagPost) => {
		DEBUG && console.log('data ADD', data)
		addTag({
			body: {
				...data,
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
						<AlexInputControlled name={'tagName'} label={'Название'}
											 error={Boolean(errors.title)} required
											 errorText={errors.title?.message as string | undefined}/>
					</Grid>
					<Grid item xs={6}>
						<Stack alignItems={'center'} spacing={theme.spacing(2)} direction={'row'} height={'100%'}>
							<Typography variant={'h5'}>Выбранный цвет:</Typography>
							<AlexColorDisplay value={watchTagColor}/>
							<AlexDialogButton
								button={
									<Button variant={'contained'}>
										<Typography
											variant={'button'}>Выбрать цвет тега</Typography>
									</Button>
								}
								dialog={{
									title: 'Выберите цвет для тега',
									body: (
										<Stack direction={'column'} spacing={theme.spacing(2)}
											   padding={theme.spacing(2)} alignItems={'center'}>
											<AlexColorPickerControlled name={'tagColor'} defaultValue={DEFAULT_COLOR}/>
											<Stack direction={'row'} spacing={theme.spacing(2)}
												   padding={theme.spacing(2)}>
												<Button
													id={'confirmButton'}
													sx={{width: '140px'}}
													variant={'contained'}>
													<Typography variant={'button'}
																color={theme.palette.error.contrastText}>Подтвердить</Typography>
												</Button>
												<Button
													id={'cancelButton'}
													sx={{width: '140px'}}
													color={'neutral'}
													variant={'outlined'}>
													<Typography variant={'button'}
																color={theme.palette.neutral.notContrastText}>Отмена</Typography>
												</Button>
												<Button
													id={'resetButton'}
													sx={{width: '140px'}}
													color={'error'}
													variant={'contained'}>
													<Typography variant={'button'}
																color={theme.palette.error.contrastText}>Сбросить</Typography>
												</Button>
											</Stack>
										</Stack>
									),
									functionsAssign: {
										'resetButton': {
											close: false,
											function: () => {
												resetField('tagColor')
											}
										},
										'cancelButton': {
											close: true,
										},
										'confirmButton': {
											close: true,
										}
									}
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<AlexInputControlled name={'tagDesc'} label={'Описание'} multiline maxRows={12}
											 error={Boolean(errors.title)}
											 errorText={errors.title?.message as string | undefined}/>
					</Grid>
				</Grid>
			</Stack>
		</Box>)}
	</Box>)
}