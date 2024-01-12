import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {GraphsTableColumns} from "./columns";
import {useGraphDeleteMutation, useLazyGraphsQuery} from "../../../redux/api/graphs.api";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapGraphs} from "./varsBehaviourMapGraphs";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";

export const GraphsTable: FC = () => {
    const [lazyGraphsQuery, result] = useLazyGraphsQuery()
    const [deleteGraph] = useGraphDeleteMutation()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapGraphs,
    })

    useEffect(() => {
        variables && lazyGraphsQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={GraphsTableColumns}
                       data={result?.currentData?.data}
                       availablePages={result?.currentData?.totalPages}
                       perPageOptions={['1', '2', '4', '8', '16', '32']}
                       availableElements={result?.currentData?.totalElements}
                       columnsSelect simpleFilter footer downloadCSV
                       filterListIds={[

                       ]}
                       serverSideOptions={serverSideOptions}
                       setServerSideOptions={setServerSideOptions}
                       actionsConfig={{
                           view: {
                               columnName: 'id',
                               path: `./../${EPageType.view}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)]
                               ])
                           },
                           edit: {
                               columnName: 'id',
                               path: `./../${EPageType.edit}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)]
                               ])
                           },
                           delete: {
                               columnName: 'id',
                               mutation: deleteGraph,
                               showModal: true
                           }
                       }}/>
    )
}