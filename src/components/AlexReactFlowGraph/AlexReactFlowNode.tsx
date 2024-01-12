import {CSSProperties, FC} from "react";
import {Handle, NodeProps, Position, useStore} from "reactflow";
import {Paper, Typography} from "@mui/material";

interface IProps extends NodeProps {
}

const connectionNodeIdSelector = (state: any) => state.connectionNodeId

const customHandleStyles = {
    width: '100%',
    height: '100%',
    background: 'blue',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 0,
    transform: 'none',
    border: 'none',
    opacity: 0,
} as CSSProperties
export const AlexReactFlowNode: FC<IProps> = ({id}) => {
    const connectionNodeId = useStore(connectionNodeIdSelector)
    const isConnecting = !!connectionNodeId
    const isTarget = connectionNodeId && connectionNodeId !== id

    return (<>
        <Paper sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50px',
            background: isTarget ? '#666666' : '#ffffff',
            outline: '2px solid black',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',

            ':before': {
                content: '""',
                position: 'absolute',
                top: '-10px',
                left: '50%',
                height: '15px',
                width: '30px',
                transform: 'translate(-50%, 0)',
                background: '#d6d5e6',
                zIndex: 1000,
                lineHeight: 1,
                borderRadius: '2px',
                color: '#fff',
                fontSize: '9px',
                border: '2px solid #222138'
            }
        }} elevation={3}>
            {!isConnecting && (
                <Handle style={customHandleStyles} position={Position.Right} type="source"/>
            )}
            <Typography variant={"subtitle1"}>{id}</Typography>
            <Handle
                style={customHandleStyles}
                position={Position.Left}
                type="target"
                isConnectableStart={false}
            />
        </Paper>
    </>)
}