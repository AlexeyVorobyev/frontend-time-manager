import React, {FC, useCallback, useState} from "react";
import {IActionsConfig, ICustomDataTableRow} from "./AlexDataTable";
import {Button, IconButton, Popover, Stack, Typography} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {theme} from "../Theme/theme";
import {useNavigate} from "react-router-dom";
import {AlexDialog} from "../AlexDialog/AlexDialog";

interface IProps {
    actionsConfig: IActionsConfig
    row: ICustomDataTableRow
}

export const AlexDataTableActions: FC<IProps> = ({
                                                     actionsConfig,
                                                     row,
                                                 }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleDelete = useCallback(() => {
        actionsConfig.delete?.mutation!({id: row.get(actionsConfig.delete?.columnName)})
            .then(() => {
                setOpenDialog(false)
            })
            .catch(() => {
                setOpenDialog(false)
            })
    }, [actionsConfig])

    return (
        <>
            <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation()
                setAnchorEl(event.currentTarget)
            }}>
                <OpenInNewIcon color={'secondary'}/>
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation()
                    setAnchorEl(null)
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Stack direction={'column'} spacing={theme.spacing(1)} padding={theme.spacing(2)}>
                    {actionsConfig.view &&
                        (<Button
                            variant={'text'}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.stopPropagation()
                                navigate(`${actionsConfig?.view?.path!}?id=${row.get(actionsConfig!.view!.columnName)}${actionsConfig!.view!.params ? '&' + actionsConfig!.view!.params.toString() : ''}`)
                            }}>
                            <Typography variant={'button'} color={theme.palette.text.primary}>Просмотр</Typography>
                        </Button>)}
                    {actionsConfig.edit &&
                        (<Button
                            variant={'text'}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.stopPropagation()
                                navigate(`${actionsConfig?.edit?.path!}?id=${row.get(actionsConfig!.view!.columnName)}${actionsConfig!.view!.params ? '&' + actionsConfig!.edit!.params.toString() : ''}`)
                            }}>
                            <Typography variant={'button'} color={theme.palette.text.primary}>Редактировать</Typography>
                        </Button>)}
                    {actionsConfig.delete &&
                        (<Button
                            variant={'contained'}
                            color={'error'}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.stopPropagation()
                                if (actionsConfig.delete?.showModal) {
                                    setAnchorEl(null)
                                    setOpenDialog(true)
                                } else {
                                    handleDelete()
                                    setAnchorEl(null)
                                }
                            }}>
                            <Typography variant={'button'} color={theme.palette.error.contrastText}>Удалить</Typography>
                        </Button>)}
                </Stack>
            </Popover>
            {actionsConfig.delete?.showModal &&
                (<AlexDialog title={'Подтвердите удаление'} open={openDialog} setOpen={setOpenDialog}>
                    <Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}>
                        <Button
                            sx={{width: '140px'}}
                            color={'error'}
                            variant={'contained'}
                            onClick={handleDelete}>
                            <Typography variant={'button'} color={theme.palette.error.contrastText}>Удалить</Typography>
                        </Button>
                        <Button
                            sx={{width: '140px'}}
                            color={'neutral'}
                            variant={'outlined'}
                            onClick={() => {
                                setOpenDialog(false)
                            }}>
                            <Typography variant={'button'}
                                        color={theme.palette.neutral.notContrastText}>Отмена</Typography>
                        </Button>
                    </Stack>
                </AlexDialog>)}
        </>)
}