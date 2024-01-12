import {FC, useCallback, useMemo, useState} from "react"
import {useLocation, useNavigate, useSearchParams} from "react-router-dom"
import {Box, Button, Divider, Stack, Typography} from "@mui/material"
import {theme} from "../../Theme/theme"
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import {AlexDialogButton} from "../../AlexDialog/AlexDialogButton"
import {FormProvider, useForm} from "react-hook-form"
import {EventsTable} from "../EventsPage/EventsTable.tsx"
import {useEventDeleteMutation} from "../../../redux/api/events.api.ts"
import {EventsCard} from "../EventsPage/EventsCard.tsx"
import {EventsForm} from "../EventsPage/EventsForm.tsx"
import {TagsTable} from "../TagsPage/TagsTable.tsx"
import {TagsCard} from "../TagsPage/TagsCard.tsx"
import {TagsForm} from "../TagsPage/TagsForm.tsx"
import {useTagDeleteMutation} from "../../../redux/api/tags.api.ts"

export enum EPageType {
	edit = 'edit',
	add = 'add',
	view = 'view',
	table = 'table'
}

type TPageState = EPageType.edit | EPageType.add | EPageType.view | EPageType.table

export const CustomizationPage: FC = () => {
	const location = useLocation()
	const pageState = useMemo(() => location.pathname.split('/')[location.pathname.split('/').length - 1] as TPageState, [location])
	const namespace = useMemo(() => location.pathname.split('/')[location.pathname.split('/').length - 2], [location])
	const [searchParams] = useSearchParams()

	const navigate = useNavigate()
	const [deleteEvent] = useEventDeleteMutation()
	const [deleteTag] = useTagDeleteMutation()
	const customizationWrapperPageNameMap = useMemo(() => new Map([
		['events',
			{
				deleteQuery: (id: string) => {
					deleteEvent({id: id})
						.then(() => {
							if (searchParams.get('from')) {
								navigate(JSON.parse(searchParams.get('from')!))
							} else {
								navigate('./../table')
							}
						})
				},
				[EPageType.table]: {
					component: <EventsTable/>,
					title: 'событий',
					button: 'новое событие'
				},
				[EPageType.view]: {
					component: <EventsCard/>,
					button: 'событие'
				},
				[EPageType.add]: {
					component: EventsForm,
					title: 'события'
				},
				[EPageType.edit]: {
					component: EventsForm,
					title: 'события'
				},
			}
		],
		['tags',
			{
				deleteQuery: (id: string) => {
					deleteTag({id: id})
						.then(() => {
							if (searchParams.get('from')) {
								navigate(JSON.parse(searchParams.get('from')!))
							} else {
								navigate('./../table')
							}
						})
				},
				[EPageType.table]: {
					component: <TagsTable/>,
					title: 'тегов',
					button: 'новый тег'
				},
				[EPageType.view]: {
					component: <TagsCard/>,
					button: 'тег'
				},
				[EPageType.add]: {
					component: TagsForm,
					title: 'тега'
				},
				[EPageType.edit]: {
					component: TagsForm,
					title: 'тега'
				},
			}
		],
	]), [searchParams])

	const SwitchRender = useCallback(() => {
		switch (pageState) {
			case EPageType.view:
				return (<>
					<Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}
						   justifyContent={'flex-end'} useFlexGap>
						<LinkRouterWrapper to={-1} useNavigateProp sx={{marginRight: 'auto'}}>
							<Button variant={'contained'} startIcon={<KeyboardReturnIcon/>}>
								<Typography
									variant={'button'}>Назад</Typography>
							</Button>
						</LinkRouterWrapper>
						{customizationWrapperPageNameMap.get(namespace)!.deleteQuery && (<AlexDialogButton
							button={
								<Button variant={'contained'} color={'error'}>
									<Typography
										variant={'button'}>Удалить {(customizationWrapperPageNameMap.get(namespace)!)[pageState].button}</Typography>
								</Button>
							}
							dialog={{
								title: 'Подтвердите удаление',
								body: (
									<Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}>
										<Button
											id={'confirmButton'}
											sx={{width: '140px'}}
											color={'error'}
											variant={'contained'}>
											<Typography variant={'button'}
														color={theme.palette.error.contrastText}>Удалить</Typography>
										</Button>
										<Button
											id={'cancelButton'}
											sx={{width: '140px'}}
											color={'neutral'}
											variant={'outlined'}>
											<Typography variant={'button'}
														color={theme.palette.neutral.notContrastText}>Отмена</Typography>
										</Button>
									</Stack>
								),
								functionsAssign: {
									'cancelButton': {
										close: true
									},
									'confirmButton': {
										close: true,
										function: () => customizationWrapperPageNameMap.get(namespace)!.deleteQuery!(searchParams.get('id')!)
									}
								}
							}}/>)}
						{customizationWrapperPageNameMap.get(namespace)![EPageType.edit] && (
							<LinkRouterWrapper to={`./../edit?id=${searchParams.get('id')}`}>
								<Button variant={'contained'}>
									<Typography
										variant={'button'}>Редактировать {(customizationWrapperPageNameMap.get(namespace)!)[pageState].button}</Typography>
								</Button>
							</LinkRouterWrapper>)}
					</Stack>
				</>)
			case EPageType.add:
			case EPageType.edit:
				const [onSubmitFunc, setOnSubmitFunc] = useState<{
					callback: ((data: any) => void) | null
				}>({callback: null})
				const methods = useForm()
				const Form = (customizationWrapperPageNameMap.get(namespace)!)[pageState]!.component
				return (<>
					<FormProvider {...methods}>
						<Stack height={'100%'} width={'100%'} direction={'column'}>
							<Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}
								   justifyContent={'space-between'}>
								<Typography
									variant={'h6'}>{pageState === EPageType.edit ? 'Настройка' : 'Добавление'} {(customizationWrapperPageNameMap.get(namespace)!)[pageState]!.title}</Typography>
								<Stack direction={'row'} spacing={theme.spacing(2)} alignItems={'center'}>
									<LinkRouterWrapper to={-1} useNavigateProp>
										<Button variant={'outlined'} color={'neutral'}>
											<Typography
												color={theme.palette.neutral.notContrastText}
												variant={'button'}>Отмена</Typography>
										</Button>
									</LinkRouterWrapper>
									{onSubmitFunc.callback && <Button variant={'contained'} type={'submit'}
                                                                      onClick={methods.handleSubmit(onSubmitFunc.callback)}>
                                        <Typography
                                            variant={'button'}>Сохранить</Typography>
                                    </Button>}
								</Stack>
							</Stack>
							<Divider/>
							<Box sx={{display: 'flex', flex: 1, height: 0}}>
								<Form setOnSubmitFunc={setOnSubmitFunc} edit={pageState === EPageType.edit}/>
							</Box>
						</Stack>
					</FormProvider>
				</>)
			case EPageType.table:
				return (<>
					<Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}
						   justifyContent={'space-between'}>
						<Typography
							variant={'h6'}>Настройка {(customizationWrapperPageNameMap.get(namespace)!)[pageState].title}</Typography>
						{customizationWrapperPageNameMap.get(namespace)![EPageType.add] && (<LinkRouterWrapper
							to={`./../add?${(new URLSearchParams([['from', JSON.stringify(location.pathname + location.search)]])).toString()}`}>
							<Button variant={'contained'}>
								<Typography
									variant={'button'}>Добавить {(customizationWrapperPageNameMap.get(namespace)!)[pageState].button}</Typography>
							</Button>
						</LinkRouterWrapper>)}
					</Stack>
				</>)
		}
	}, [pageState, location, namespace, searchParams])

	return (<>
		{pageState === EPageType.add || pageState === EPageType.edit
			? <SwitchRender/>
			: (
				<Stack height={'100%'} width={'100%'} direction={'column'}>
					<SwitchRender/>
					<Divider/>
					<Box sx={{display: 'flex', flex: 1, height: 0}}>
						{(customizationWrapperPageNameMap.get(namespace)!)[pageState].component}
					</Box>
				</Stack>
			)}
	</>)
}