import React, {FC, useMemo} from "react"
import {Box, Grid, Stack, Typography} from "@mui/material"
import {theme} from "../Theme/theme.ts"
import {TAlexBigCalendarData, TServerSideOptions} from "./AlexBigCalendar.tsx"
import {LinkRouterWrapper} from "../LinkRouterWrapper/LinkRouterWrapper.tsx"
import {AlexChip} from "../AlexChip/AlexChip.tsx"

interface ICellProps {
	day: number,
	date: Date,
	deprecated?: boolean,
	data?: TAlexBigCalendarData[],
	serverSideOptions?: TServerSideOptions,
}

const Cell: FC<ICellProps> = ({
								  day,
								  date,
								  deprecated = false,
								  data = [],
								  serverSideOptions
							  }) => {

	const cellDate = useMemo(() => new Date(date.getFullYear(), date.getMonth(), day), [date, day])

	const cellTasks: TAlexBigCalendarData[] = useMemo(() => {
		return data.filter((item: TAlexBigCalendarData) => {
			return (cellDate.getDate() === item.date?.getDate() && cellDate.getMonth() === item.date?.getMonth())
		})
	}, [data, cellDate])

	console.log(cellTasks, 'CELL')

	return (
		<Grid item xs={12 / 7}>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'center'} padding={theme.spacing(2)}
				   bgcolor={deprecated ? '#EEEEEE' : 'white'} sx={{height: 'calc(100% - 32px)'}}>
				<Grid container height={'100%'}>
					<Grid item xs={12}>
						<Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(2)} useFlexGap>
							{cellTasks.length && cellTasks[0].tags?.length ? (
								<LinkRouterWrapper to={`../customization/tags/view?id=${cellTasks[0].tags[0].tagId}`}
												   tooltipTitle={'Перейти к Тегу'}>
									<AlexChip color={cellTasks[0].tags[0].tagColor} label={cellTasks[0].tags[0].tagName}/>
								</LinkRouterWrapper>
							) : undefined}
							<Typography marginLeft={'auto'}>{day}</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						{cellTasks.length ? (
							<Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(2)} height={0}
								   position={'relative'} top={'10px'}>
								<LinkRouterWrapper to={`../customization/events/view?id=${cellTasks[0].id}`}
												   tooltipTitle={'Перейти к событию'}>
									<Typography>
										<span style={{color:'black'}}>{cellTasks.length > 1 ? 'События' : 'Событие'} : </span>
										{cellTasks[0].name}
										{cellTasks.length > 1 && ` + ${cellTasks.length - 1}`}
									</Typography>
								</LinkRouterWrapper>
							</Stack>
						) : undefined}
					</Grid>
				</Grid>
			</Stack>
		</Grid>
	)
}

function* generate(firstDay: number, lastDay: number) {
	for (let i = firstDay; i <= lastDay; i++) {
		yield i
	}
}

interface IProps {
	data?: TAlexBigCalendarData[]
	serverSideOptions?: TServerSideOptions,
	setServerSideOptions?: React.Dispatch<React.SetStateAction<TServerSideOptions>>
}

export const AlexBigCalendarFiller: FC<IProps> = ({
													  data,
													  serverSideOptions,
													  setServerSideOptions
												  }) => {

	const LOCAL_DATE = useMemo(() => new Date(serverSideOptions?.get('date')), [serverSideOptions])
	const firstDayDate = new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth(), 1)
	const lastDayDate = new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth() + 1, 0)
	const currentMonthDaysArray: number[] = [...generate(firstDayDate.getDate(), lastDayDate.getDate())]

	let lastMonthDaysArray: number[] = []
	const firstDayDayWeek = firstDayDate.getDay()
	console.log(firstDayDayWeek)
	if (firstDayDayWeek === 0) {
		const lastDayLastMonth = new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth(), 0).getDate()
		console.log(new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth(), 0), 'CALENDAR_2')
		for (let i = lastDayLastMonth; i > lastDayLastMonth - 6; i--) {
			lastMonthDaysArray = [i, ...lastMonthDaysArray]
		}
	} else if (firstDayDayWeek !== 1) {
		const lastDayLastMonth = new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth(), 0).getDate()
		console.log(new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth(), 0), 'CALENDAR_2')
		for (let i = lastDayLastMonth; i > lastDayLastMonth - firstDayDayWeek + 1; i--) {
			lastMonthDaysArray = [i, ...lastMonthDaysArray]
		}
	}
	let nextMonthDaysArray: number[] = []
	const lastDayDayWeek = lastDayDate.getDay()
	if (lastDayDayWeek !== 0) {
		const firstDayNextMonth = new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth() + 1, 1).getDate()
		let factor = 35
		if ([...lastMonthDaysArray, ...currentMonthDaysArray].length > factor) {
			factor = 42
		}
		for (let i = firstDayNextMonth; [...lastMonthDaysArray, ...currentMonthDaysArray, ...nextMonthDaysArray].length < factor; i++) {
			nextMonthDaysArray = [...nextMonthDaysArray, i]
		}
	}

	console.log(firstDayDate.getDay(), 'CALENDAR')


	return (<>
		{lastMonthDaysArray.map((day) => {
			return <Cell day={day} deprecated data={data} serverSideOptions={serverSideOptions}
						 date={new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth() - 1, LOCAL_DATE.getDate())}/>
		})}
		{currentMonthDaysArray.map((day) => {
			return <Cell day={day} data={data} serverSideOptions={serverSideOptions} date={LOCAL_DATE}/>
		})}
		{nextMonthDaysArray.map((day) => {
			return <Cell day={day} deprecated data={data} serverSideOptions={serverSideOptions}
						 date={new Date(LOCAL_DATE.getFullYear(), LOCAL_DATE.getMonth() + 1, LOCAL_DATE.getDate())}/>
		})}
	</>)
}
