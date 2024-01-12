import React, {FC, useCallback, useMemo} from "react";
import {IconButton, Tooltip} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {EFormatFlatDataMode, formatFlatData, ICustomDataTableColumn, ICustomDataTableRow} from "./AlexDataTable";

interface IProps {
    columnsState: ICustomDataTableColumn[]
    columns: ICustomDataTableColumn[]
    data?: Object[]
}

const constructCsv = (
    columnsState: ICustomDataTableColumn[],
    data: ICustomDataTableRow[],
    separator: string = ';') => {

    const transparentMatrix = <T, >(matrix: T[][]) => {
        console.log(matrix)
        const newMatrix: any = []
        for (let i = 0; i < matrix[0].length * 2; i++) {
            if (matrix[0][i] === undefined) continue
            newMatrix.push([])
            for (let j = 0; j < matrix.length * 2; j++) {
                if (matrix[j] === undefined || matrix[j][i] === undefined) continue
                newMatrix[i].push(matrix[j][i])
            }
        }
        return newMatrix as T[][]
    }

    const columnNames = columnsState.length ? columnsState
        .filter((column) => column.display !== false)
        .map((column) => column.label || column.id)
        .join(separator) : 'No data provided'
    const matrix = columnsState.length ? transparentMatrix(columnsState
        .filter((column) => column.display !== false)
        .map((column) => {
            return data.map((row) => {
                const tmp = row.get(column.id)
                return tmp ? tmp : null
            })
        })) : null

    return [
        columnNames,
        matrix && matrix.map((row) => row.join(separator)).join('\n')
    ].join('\n')
}

const DEBUG = true
export const AlexDataTableDownloadCSV: FC<IProps> = ({
                                                         data,
                                                         columnsState,
                                                         columns
                                                     }) => {

    const rows = useMemo(() => formatFlatData(columns,EFormatFlatDataMode.text, data), [data, columnsState])

    const handleClick = useCallback(() => {
        DEBUG && console.debug('rows', rows)
        if (!rows) return
        const dataCsv = new Blob(["\ufeff", constructCsv(columnsState, rows, ';')], {type: 'text/csv'})
        const contentType = 'csv';
        const a = document.createElement('a');
        a.download = 'dataTable.csv';
        a.href = window.URL.createObjectURL(new File([dataCsv], 'dataTable',));
        a.textContent = 'Download CSV';
        a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
        document.body.appendChild(a);
        a.click()
        a.remove()
    }, [rows, data, columnsState])

    return (
        <Tooltip title={'Скачать CSV'}>
            <IconButton onClick={handleClick}>
                <FileDownloadIcon color={'secondary'}/>
            </IconButton>
        </Tooltip>
    )
}