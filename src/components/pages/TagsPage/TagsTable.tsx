import {FC, useEffect} from "react"
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable"
import {TagsTableColumns} from "./columns"
import {usePageState} from "../../functions/usePageState"
import {varsBehaviourMapTags} from "./varsBehaviourMapTags.ts"
import {EPageType} from "../СustomizationPage/СustomizationPage"
import {useLocation} from "react-router-dom"
import {useLazyTagsQuery, useTagDeleteMutation} from "../../../redux/api/tags.api.ts"
import {PER_PAGE_OPTIONS} from "../../../globalConstants.ts"

export const TagsTable: FC = () => {
	const [lazyTagsQuery, result] = useLazyTagsQuery()
	const [deleteTag] = useTagDeleteMutation()

	const {
		variables,
		serverSideOptions,
		setServerSideOptions
	} = usePageState({
		varsBehaviorMap: varsBehaviourMapTags,
		defaultValue: new Map([
			['perPage', 10]
		] as [string, any][])
	})

	useEffect(() => {
		variables && lazyTagsQuery(variables)
	}, [variables])

	const location = useLocation()

	return (
		<AlexDataTable columns={TagsTableColumns}
					   data={result?.currentData?.list}
					   availablePages={result?.currentData?.totalPages}
					   perPageOptions={PER_PAGE_OPTIONS}
					   availableElements={result?.currentData?.totalElements}
					   columnsSelect simpleFilter footer downloadCSV
			// filterListIds={[
			//
			// ]}
					   serverSideOptions={serverSideOptions}
					   setServerSideOptions={setServerSideOptions}
					   actionsConfig={{
						   view: {
							   columnName: 'tagId',
							   path: `./../${EPageType.view}`,
							   params: new URLSearchParams([
								   ['from', JSON.stringify(location.pathname + location.search)]
							   ])
						   },
						   edit: {
							   columnName: 'tagId',
							   path: `./../${EPageType.edit}`,
							   params: new URLSearchParams([
								   ['from', JSON.stringify(location.pathname + location.search)]
							   ])
						   },
						   delete: {
							   columnName: 'tagId',
							   mutation: deleteTag,
							   showModal: true
						   }
					   }}/>
	)
}