import React, {FC} from 'react';
import {ConnectionLineComponentProps, getStraightPath} from 'reactflow';

interface IProps extends ConnectionLineComponentProps {
}

export const AlexReactFlowConnectionLine: FC<IProps> = ({
                                                            fromX,
                                                            fromY,
                                                            toX,
                                                            toY,
                                                            connectionLineStyle
                                                        }) => {
    const [edgePath] = getStraightPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
    });

    return (
        <g>
            <path style={connectionLineStyle} fill="none" d={edgePath}/>
            <circle cx={toX} cy={toY} fill="black" r={3} stroke="black" strokeWidth={1.5}/>
        </g>
    );
}

