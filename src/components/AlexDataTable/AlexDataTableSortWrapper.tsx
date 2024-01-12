import React, {FC, ReactNode, useLayoutEffect, useState} from "react";
import {ICustomDataTableColumn} from "./AlexDataTable";
import {TableSortLabel, Tooltip} from "@mui/material";

interface IProps {
    column: ICustomDataTableColumn
    children: ReactNode
    serverSideOptions: Map<string, any>
    setServerSideOptions: React.Dispatch<React.SetStateAction<Map<string, any>>>
}

type TSortParam = 'asc' | 'desc'

export const AlexDataTableSortWrapper: FC<IProps> = ({
                                                         column,
                                                         children,
                                                         serverSideOptions,
                                                         setServerSideOptions
                                                     }) => {

    const [sortState, setSortState] = useState<TSortParam | null>(serverSideOptions.get('sort')?.get(column.id) || null)

    useLayoutEffect(() => {
        if (!sortState) {
            if (!serverSideOptions.get('sort')) return
            setServerSideOptions((prev) => {
                const sortMap: Map<string, TSortParam> = prev.get('sort')
                sortMap.delete(column.id)
                if (Array.from(sortMap.entries()).length) {
                    prev.set('sort', sortMap)
                } else {
                    prev.delete('sort')
                }
                return new Map(prev)
            })
            return
        }
        if (!serverSideOptions.get('sort')) {
            setServerSideOptions((prev) => {
                prev.set('sort', new Map([[column.id, sortState]]))
                console.log('here', new Map(prev))
                return new Map(prev)
            })
        } else {
            setServerSideOptions((prev) => {
                const sortMap: Map<string, TSortParam> = prev.get('sort')
                sortMap.set(column.id, sortState as TSortParam)
                prev.set('sort', sortMap)
                return new Map(prev)
            })
        }
    }, [sortState])


    return (
        <Tooltip title={'Сортировка'}>
            <TableSortLabel direction={sortState || undefined} active={Boolean(sortState)}
                            onClick={() => {
                                setSortState((prev) => {
                                    if (!prev) return 'asc'
                                    return prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
                                })
                            }}>
                {children}
            </TableSortLabel>
        </Tooltip>
    )
}
