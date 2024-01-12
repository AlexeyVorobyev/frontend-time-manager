import {FC} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {theme} from "../../Theme/theme";
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper";

export const NotExistPage: FC = () => {

    return (
        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={theme.spacing(2)} height={'100%'}>
            <Typography variant={'h3'}>404 :(</Typography>
            <Typography variant={'h4'}>Такой страницы не существует</Typography>
            <LinkRouterWrapper to={'/'}>
                <Button variant={'contained'}>
                    <Typography variant={'button'}>Вернуться на главную</Typography>
                </Button>
            </LinkRouterWrapper>
        </Stack>
    )
}