import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, CircularProgress, Divider, Stack, Typography} from "@mui/material";
import {AlexDataTableFooter} from "./AlexDataTableFooter";
import {useNavigate} from "react-router-dom";
import {AlexDataTableActions} from "./AlexDataTableActions";
import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {AlexDataTableHeader} from "./AlexDataTableHeader";
import {AlexDataTableSortWrapper} from "./AlexDataTableSortWrapper";

//TODO CUSTOM FILTERS COMPONENT ?

export interface ICustomDataTableColumn {
    id: string,
    label: string,
    align?: "center" | "left" | "right" | "inherit" | "justify",
    minWidth?: number,
    format?: (value: any) => ReactNode,
    formatText?: (value: any) => string,
    display?: boolean
    sort?: boolean
    link?: boolean
}

export type ICustomDataTableRow = Map<string, ReactNode>

export interface IActionConfig {
    columnName: string // номер столбца для использования в роли id
    path: string // путь к странице
    params: URLSearchParams
}

export interface IActionsConfig {
    view?: IActionConfig,
    edit?: IActionConfig
    delete?: {
        columnName: string // номер столбца для использования в роли id
        mutation: MutationTrigger<any>// useMutation из RTK
        showModal?: boolean // показывать ли модальное окно для удаления, по дефолту есть
    }
}

interface IProps {
    columns: ICustomDataTableColumn[],
    data: Object[]
    actionsConfig?: IActionsConfig
    availablePages: number,
    availableElements?: number
    perPageOptions?: string[]
    simpleFilter?: boolean
    columnsSelect?: boolean
    footer?: boolean
    filterListIds?: string[],
    serverSideOptions: Map<string, any>
    setServerSideOptions: React.Dispatch<React.SetStateAction<Map<string, any>>>
    downloadCSV?: boolean
}

const DEBUG = true
const DEBUG_PREFIX = 'ALEX_DATA_TABLE'

export enum EFormatFlatDataMode {
    jsx = 'jsx',
    text = 'text'
}

export const formatFlatData = (
    columns: ICustomDataTableColumn[],
    data: Object[],
    mode: `${EFormatFlatDataMode}`
): ICustomDataTableRow[] | null => {
    if (!data) return null
    const resultArr = []
    for (const item of data) {
        const resultFlatRow = new Map()
        for (const column of columns) {
            if (!item.hasOwnProperty(column.id)) continue
            if (mode === EFormatFlatDataMode.jsx) {
                if (typeof item[column.id as keyof Object] !== 'string' || column.format) {
                    if (!column.format) continue
                    resultFlatRow.set(column.id, column.format(item))
                } else {
                    resultFlatRow.set(column.id, item[column.id as keyof Object])
                }
            } else if (mode === EFormatFlatDataMode.text) {
                if (typeof item[column.id as keyof Object] !== 'string' || column.formatText) {
                    if (!column.formatText) continue
                    resultFlatRow.set(column.id, column.formatText(item))
                } else {
                    resultFlatRow.set(column.id, item[column.id as keyof Object])
                }
            }
        }
        resultArr.push(resultFlatRow)
    }
    return resultArr
}

export const AlexDataTable: FC<IProps> = ({
                                              columns,
                                              data,
                                              actionsConfig,
                                              availablePages,
                                              perPageOptions = ['1', '2', '4', '8', '16', '32'],
                                              simpleFilter = false,
                                              columnsSelect = false,
                                              availableElements,
                                              footer = false,
                                              filterListIds,
                                              setServerSideOptions,
                                              serverSideOptions,
                                              downloadCSV = false
                                          }) => {

    DEBUG && console.log(DEBUG_PREFIX, 'DATA', data)

    const [columnsState, setColumnsState] = useState<ICustomDataTableColumn[]>(
        sessionStorage.getItem(`columnsDataBase${location.pathname}`)
            ? JSON.parse(sessionStorage.getItem(`columnsDataBase${location.pathname}`)!) as ICustomDataTableColumn[]
            : columns
    )

    useEffect(() => {
        sessionStorage.setItem(`columnsDataBase${location.pathname}`, JSON.stringify(columnsState))
    }, [columnsState])

    const rows = useMemo(() => formatFlatData(columns, data, EFormatFlatDataMode.jsx), [columns, data])
    const navigate = useNavigate()

    return (
        <Stack sx={{height: '100%', width: '100%'}} direction={'column'} useFlexGap>
            {(simpleFilter || columnsSelect) &&
                <AlexDataTableHeader simpleFilter={simpleFilter} columnsSelect={columnsSelect}
                                     columnsState={columnsState} setColumnsState={setColumnsState}
                                     filterListIds={filterListIds} setServerSideOptions={setServerSideOptions}
                                     serverSideOptions={serverSideOptions} downloadCSV={downloadCSV} data={data}
                                     columns={columns}/>}
            {!rows && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress/>
            </Box>)}
            {rows && !rows.length && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant={'h5'}>Данных по заданным параметрам нет</Typography>
            </Box>)}
            {(rows && rows.length) ? (<TableContainer sx={{
                    width: '100%',
                    height: '100%',
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {[
                                    ...columnsState.map((column) => {
                                        if (column.display === false) return
                                        return (
                                            <TableCell key={column.id} align={column.align}
                                                       style={{minWidth: column.minWidth}}>
                                                {column.sort === false ?
                                                    column.label
                                                    : (<AlexDataTableSortWrapper column={column}
                                                                                 setServerSideOptions={setServerSideOptions}
                                                                                 serverSideOptions={serverSideOptions}>
                                                        {column.label}
                                                    </AlexDataTableSortWrapper>)}
                                            </TableCell>
                                        )
                                    }),
                                    actionsConfig ?
                                        <TableCell key={'actions'} align={'left'}>
                                            Действия
                                        </TableCell>
                                        : undefined
                                ]}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow hover={Boolean(actionsConfig?.view)}
                                              sx={{cursor: actionsConfig?.view ? 'pointer' : undefined}} role="checkbox"
                                              tabIndex={-1} key={index}
                                              onDoubleClick={actionsConfig?.view ? () => {
                                                  navigate(`${actionsConfig?.view?.path!}?id=${row.get(actionsConfig!.view!.columnName)}${actionsConfig!.view!.params ? '&' + actionsConfig!.view!.params.toString() : ''}`)
                                              } : undefined}>
                                        {[
                                            ...columnsState.map((column) => {
                                                if (column.display === false) return
                                                const value = row.get(column.id)
                                                return (
                                                    <TableCell key={column.id} align={column.align || 'left'}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            }),
                                            actionsConfig ?
                                                (<TableCell key={'actions'} align={'left'}>
                                                    <AlexDataTableActions actionsConfig={actionsConfig} row={row}/>
                                                </TableCell>)
                                                : undefined
                                        ]}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>) :
                undefined
            }
            {footer && (<Box marginTop={'auto'} width={'100%'}>
                <Divider/>
                <AlexDataTableFooter availablePages={availablePages} perPageOptions={perPageOptions}
                                     availableElements={availableElements} setServerSideOptions={setServerSideOptions}
                                     serverSideOptions={serverSideOptions}/>
            </Box>)}
        </Stack>
    )
}