import {Node, Panel, useStoreApi} from "reactflow";
import React, {FC, ReactElement, useCallback, useEffect, useRef} from "react";
import {IconButton, Paper, Stack, Tooltip} from "@mui/material";
import {theme} from "../Theme/theme";
import AddIcon from '@mui/icons-material/Add';
import {getUniqueMinStringNumericalId} from "./utils";

interface IProps {
    setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>
}

export const AlexReactFlowControls: FC<IProps> = ({
                                                      setNodes,
                                                  }) => {

    const store = useStoreApi();
    const overlapOffset = useRef<number>(0)

    const handleAdd = useCallback(() => {
        const {
            height,
            width,
            transform: [transformX, transformY, zoomLevel]
        } = store.getState()
        const zoomMultiplier = 1 / zoomLevel
        const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2
        const centerY = -transformY * zoomMultiplier + (height * zoomMultiplier) / 2

        setNodes((prev) => {
            overlapOffset.current += 10
            return [
                ...prev,
                {
                    id: getUniqueMinStringNumericalId(prev.map((node) => node.id)),
                    data: null,
                    type: 'custom',
                    position: {
                        x: centerX - overlapOffset.current,
                        y: centerY - overlapOffset.current,
                    }
                } as Node
            ]
        })
    }, [])

    return (
        <Panel position={"top-right"}>
            <Paper elevation={3} sx={{padding: theme.spacing(0)}}>
                <Stack direction={'row'} alignItems={'center'}>
                    <Tooltip title={'Добавить вершину'}>
                        <IconButton size={'small'} onClick={handleAdd}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Paper>
        </Panel>
    )
}