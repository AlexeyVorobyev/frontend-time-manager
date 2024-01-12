import {FC, useEffect} from "react"
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable"
import {EventsTableColumns} from "./columns"
import {usePageState} from "../../functions/usePageState"
import {varsBehaviourMapEvents} from "./varsBehaviourMapEvents.ts"
import {EPageType} from "../СustomizationPage/СustomizationPage"
import {useLocation} from "react-router-dom"
import {useEventDeleteMutation, useLazyEventsQuery} from "../../../redux/api/events.api.ts"
import {PER_PAGE_OPTIONS} from "../../../globalConstants.ts"

export const EventsTable: FC = () => {
	const [lazyEventsQuery, result] = useLazyEventsQuery()
	const [deleteEvent] = useEventDeleteMutation()

	const {
		variables,
		serverSideOptions,
		setServerSideOptions
	} = usePageState({
		varsBehaviorMap: varsBehaviourMapEvents,
		defaultValue: new Map([
			['perPage', 10]
		] as [string, any][])
	})

	useEffect(() => {
		variables && lazyEventsQuery(variables)
	}, [variables])

	const location = useLocation()

	return (
		<AlexDataTable columns={EventsTableColumns}
					   data={result?.currentData?.list}
					   availablePages={result?.currentData?.totalPages}
					   perPageOptions={PER_PAGE_OPTIONS}
					   availableElements={result?.currentData?.totalElements}
					   columnsSelect simpleFilter footer downloadCSV
					   filterListIds={[
						   'tagFilter'
					   ]}
					   serverSideOptions={serverSideOptions}
					   setServerSideOptions={setServerSideOptions}
					   actionsConfig={{
						   view: {
							   columnName: 'eventId',
							   path: `./../${EPageType.view}`,
							   params: new URLSearchParams([
								   ['from', JSON.stringify(location.pathname + location.search)]
							   ])
						   },
						   edit: {
							   columnName: 'eventId',
							   path: `./../${EPageType.edit}`,
							   params: new URLSearchParams([
								   ['from', JSON.stringify(location.pathname + location.search)]
							   ])
						   },
						   delete: {
							   columnName: 'eventId',
							   mutation: deleteEvent,
							   showModal: true
						   }
					   }}/>
	)
}