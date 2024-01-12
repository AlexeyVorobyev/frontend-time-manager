import {CSSProperties, FC, useState} from "react";
import {Paper, Skeleton, Tooltip, Typography} from "@mui/material";
import {theme} from "../../Theme/theme";
import {AlexDialog} from "../../AlexDialog/AlexDialog";

interface IProps {
    src: string,
    beforeLoadedSize?: CSSProperties,
    freeAfterLoaded?: boolean,
    modal?: boolean
}

export const AlexImageView: FC<IProps> = ({
                                              src,
                                              beforeLoadedSize,
                                              freeAfterLoaded = false,
                                              modal = false
                                          }) => {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    return (<>
        <Tooltip title={modal ? 'Раскрыть' : ''}>
            <Paper elevation={1}
                   onClick={modal ? () => setOpen(true) : undefined}
                   sx={{
                       overflow: 'hidden',
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       cursor: modal ? 'pointer' : undefined,
                       ...((!loaded || !freeAfterLoaded) && beforeLoadedSize)
                   }}>
                {!loaded && !error && <Skeleton variant="rounded" sx={{width: 'inherit', height: '100%'}}/>}
                {error && <Typography variant={'h6'} color={theme.palette.error.main}>Произошла ошибка :(</Typography>}
                <img src={src ? src : ''} alt={'Фотография'}
                     onLoad={() => setLoaded(true)}
                     onError={() => setError(true)}
                     style={{
                         objectFit: 'cover',
                         width: '100%',
                         height:'100%',
                         maxWidth: loaded && !error ? '100vw' : 0,
                         maxHeight: loaded && !error ? '100vh' : 0
                     }}/>
            </Paper>
        </Tooltip>
        <AlexDialog title={'Просмотр фотографии'} open={open} setOpen={setOpen}>
            <img src={src ? src : ''} alt={'Фотография'}
                 style={{
                     objectFit: 'cover',
                 }}/>
        </AlexDialog>
    </>)
}