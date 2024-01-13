import {FC, useEffect} from "react"
import {useLazyEventsQuery} from "../../../redux/api/events.api.ts"
import {usePageState} from "../../functions/usePageState.tsx"
import {varsBehaviourMapCalendar} from "./varsBehaviourMapCalendar.ts"
import {AlexBigCalendar, TAlexBigCalendarData} from "../../AlexBigCalendar/AlexBigCalendar.tsx"
import {TEventEntity} from "../../../redux/api/types/events.ts"

const mapTEventEntityToTAlexBigCalendarData = (eventEntity: TEventEntity): TAlexBigCalendarData => {
	return {
		id: eventEntity.eventId.toString(),
		date: eventEntity.eventDate && new Date(eventEntity.eventDate),
		name: eventEntity.eventName,
		tags: eventEntity.tags
	}
}
export const CalendarPage: FC = () => {
	const [lazyEventsQuery, result] = useLazyEventsQuery()

	const {
		variables,
		serverSideOptions,
		setServerSideOptions
	} = usePageState({
		varsBehaviorMap: varsBehaviourMapCalendar,
		defaultValue: new Map([
			['date', new Date()]
		] as [string, any][])
	})

	useEffect(() => {
		variables && lazyEventsQuery({
			...variables,
			perPage: 1000,
			page: 0,
		})
	}, [variables])

	return (<>
		<AlexBigCalendar
			serverSideOptions={serverSideOptions}
			setServerSideOptions={setServerSideOptions}
			data={result.currentData?.list
				.map((eventEntity: TEventEntity) => {
					return mapTEventEntityToTAlexBigCalendarData(eventEntity)
				})}/>
	</>)
}