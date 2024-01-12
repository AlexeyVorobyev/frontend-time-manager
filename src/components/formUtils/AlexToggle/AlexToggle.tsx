import React from "react";
import {InputLabel, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonOwnProps} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

interface Value {
    id: string,
    name: string | number
}

interface IProps extends ToggleButtonGroupProps {
    name: string
    label?: string
    options: Array<Value>
    required?: boolean
    error?: boolean,
    errorText?: string,
    exclusive?: boolean
    enforceSelect?: boolean
}

const DEBUG = false
const DEBUG_PREFIX = 'ALEX_TOGGLE'

export const AlexToggle: React.FC<IProps> = ({
                                                 name,
                                                 defaultValue,
                                                 options,
                                                 required = false,
                                                 label,
                                                 error,
                                                 errorText,
                                                 exclusive = true,
                                                 enforceSelect = false,
                                                 ...props
                                             }) => {
    const {control} = useFormContext()

    return (
        <Controller
            name={name}
            defaultValue={defaultValue || ''}
            control={control}
            rules={{
                validate: {
                    required: required ? (value: string) => value || 'обязательное поле' : () => true,
                }
            }}
            render={({field: {onChange, value}}) => {
                DEBUG && console.log(DEBUG_PREFIX, 'value', value)
                return (<>
                    <InputLabel>{error && errorText ? `${label}, ${errorText}` : label}</InputLabel>
                    <ToggleButtonGroup
                        value={value}
                        exclusive={exclusive}
                        onChange={(event, value) => {
                            if (enforceSelect && !value) return
                            onChange(value)
                        }}
                        {...props}
                    >
                        {options.map((option) => <ToggleButton key={option.id}
                                                               value={option.id}>{option.name}</ToggleButton>)}
                    </ToggleButtonGroup>
                </>)
            }
            }
        />
    )
}