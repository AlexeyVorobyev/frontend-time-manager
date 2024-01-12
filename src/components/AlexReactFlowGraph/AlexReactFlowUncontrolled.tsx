import {FC, useCallback, useEffect, useLayoutEffect, useRef} from "react";
import 'reactflow/dist/style.css';
import {
    Background,
    Controls,
    Edge,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    Node,
    addEdge, Connection, MarkerType, NodeTypes, EdgeTypes
} from "reactflow";
import {AlexReactFlowConnectionLine} from "./AlexReactFlowConnectionLine";
import {AlexReactFlowNode} from "./AlexReactFlowNode";
import {AlexReactFlowEdge} from "./AlexReactFlowEdge";
import {AlexReactFlowControls} from "./AlexReactFlowControls";

export interface IGraphData {
    nodes: Node[]
    edges: Edge[]
}

export enum EAlexReactFlowUncontrolledMode {
    edit = 'edit',
    view = 'view'
}

interface IProps {
    onChange?: (value: IGraphData) => void
    value?: IGraphData
    mode?: `${EAlexReactFlowUncontrolledMode}`
}

const connectionLineStyle = {
    strokeWidth: 3,
    stroke: 'black',
}

const defaultEdgeOptions = {
    style: {strokeWidth: 3, stroke: 'black'},
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
}

const nodeTypes: NodeTypes = {
    custom: AlexReactFlowNode,
}

const edgeTypes: EdgeTypes = {
    floating: AlexReactFlowEdge,
}

export const AlexReactFlowUncontrolled: FC<IProps> = ({
                                                          onChange = () => {},
                                                          value,
                                                          mode = EAlexReactFlowUncontrolledMode.edit
                                                      }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    //Воркэрануд для установки дефолтного значения при работе с controlled react-hook-form
    const mountedValue = useRef<boolean>(false)
    useLayoutEffect(() => {
        if ((value?.nodes || value?.edges) && !mountedValue.current) {
            setNodes(value.nodes)
            setEdges(value.edges)
            mountedValue.current = true
        }
    }, [value])

    useEffect(() => {
        onChange({
            nodes: nodes,
            edges: edges
        })
    }, [nodes, edges])

    const onConnect = useCallback(
        (params: Edge | Connection) => {
            setEdges((eds) => addEdge(params, eds))
        },
        [setEdges])

    return (
        <ReactFlowProvider>
            <ReactFlow
                style={{width: '100%', height: '100%'}}
                nodes={nodes} edges={edges} fitView
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodesDraggable={EAlexReactFlowUncontrolledMode.edit === mode}
                edgesUpdatable={EAlexReactFlowUncontrolledMode.edit === mode}
                nodesConnectable={EAlexReactFlowUncontrolledMode.edit === mode}
                elementsSelectable={EAlexReactFlowUncontrolledMode.edit === mode}
                onConnect={mode === EAlexReactFlowUncontrolledMode.edit ? onConnect : undefined}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineComponent={AlexReactFlowConnectionLine}
                connectionLineStyle={connectionLineStyle}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}>
                <Background/>
                <Controls showInteractive={EAlexReactFlowUncontrolledMode.edit === mode}/>
                {mode === EAlexReactFlowUncontrolledMode.edit && <AlexReactFlowControls setNodes={setNodes}/>}
            </ReactFlow>
        </ReactFlowProvider>
    )
}