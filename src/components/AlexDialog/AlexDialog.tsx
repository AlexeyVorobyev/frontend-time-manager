import React, {FC, ReactNode, useCallback, useEffect} from "react";
import {Dialog, DialogTitle} from "@mui/material";

interface IProps {
    title: string | ReactNode
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}

export const AlexDialog: FC<IProps> = ({
                                             title,
                                             children,
                                             open,
                                             setOpen
                                         }) => {

    const handleKeyUp = useCallback((event:KeyboardEvent) => {
        event.stopPropagation()
        if (event.key === 'Escape' || event.key === 'Backspace') {
            setOpen(false)
        }
    },[])

    useEffect(() => {
        window.addEventListener('keyup',handleKeyUp)
        return () => {
            window.removeEventListener('keyup',handleKeyUp)
        }
    },[])

    return (
        <Dialog open={open}
                onClick={(event: any) => {
                    event.stopPropagation()
                    if (event.nativeEvent.target.classList.contains("MuiDialog-container")) {
                        setOpen(false)
                    }
                }}>
            {typeof title === 'string' ?
                <DialogTitle sx={{textAlign:'center'}}>{title}</DialogTitle>
                : title}
            {children}
        </Dialog>
    )
}