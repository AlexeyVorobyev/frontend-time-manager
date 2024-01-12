import React, {FC, ReactElement, ReactNode, useCallback, useState} from "react";
import {AlexDialog} from "./AlexDialog";

interface IFunctionsAssign {
    [key: string]: {
        close: boolean,
        function?: Function
    }
}

interface IProps {
    button: ReactElement
    dialog?: {
        title: ReactNode,
        body: ReactElement,
        functionsAssign?: IFunctionsAssign
    }
}

export const AlexDialogButton: FC<IProps> = ({button, dialog}) => {

    const setFunctions = useCallback((reactElement: ReactElement): ReactElement => {
        const functionsAssign = dialog!.functionsAssign!
        const dfs = (reactElement: ReactElement): ReactElement => {
            if (Object.keys(functionsAssign).includes(reactElement.props.id)) {
                const id = reactElement.props.id
                reactElement = React.cloneElement(reactElement, {
                    onClick: () => {
                        if (functionsAssign[id].close) {
                            setOpen(false)
                        }
                        if (functionsAssign[id].function) {
                            functionsAssign[id].function?.()
                        }
                    },
                })
            }

            if (!reactElement.props.children) {
                return React.cloneElement(reactElement)
            }
            if (reactElement.props.children.length && typeof reactElement.props.children !== 'string') {
                reactElement = React.cloneElement(reactElement, {
                    children: reactElement.props.children.map((child: ReactElement) => dfs(child))
                })
            } else if (typeof reactElement.props.children === 'object') {
                reactElement = React.cloneElement(reactElement, {
                    children: React.cloneElement(dfs(reactElement.props.children))
                })
            }

            return React.cloneElement(reactElement)
        }

        return dfs(reactElement)
    }, [button, dialog])


    const [open, setOpen] = useState<boolean>(false)
    const dialogElement = dialog?.functionsAssign
        ? setFunctions(React.cloneElement(dialog!.body))
        : React.cloneElement(dialog!.body)

    return (<>
        {React.cloneElement(button, {
            onClick: () => {
                setOpen(true)
            },
        })}
        {dialog && <AlexDialog title={dialog.title} open={open} setOpen={setOpen}>
            {dialogElement}
        </AlexDialog>}
    </>)
}