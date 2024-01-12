import React from "react";
import {FormControl, MenuItem, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

interface IValue {
    id: string,
    name: string | number
}

interface IProps {
    name: string
    defaultValue?: IValue
    label?: string
    options: Array<IValue>
    required?: boolean
    error?: boolean,
    errorText?: string
}

const DEBUG = false
const DEBUG_PREFIX = 'ALEX_SELECT'

export const AlexSelect: React.FC<IProps> = ({
                                                name,
                                                defaultValue,
                                                label,
                                                options,
                                                required = false,
                                                error,
                                                errorText
                                            }) => {
    const {control} = useFormContext()

    return (
        <Controller
            name={name}
            defaultValue={defaultValue || ''}
            control={control}
            rules={{
                validate: {
                    required: required ? (value: string) => value?.length > 0 || 'обязательное поле' : () => true,
                }
            }}
            render={({field: {onChange, value}}) => {
                DEBUG && console.log(DEBUG_PREFIX, 'value', value)
                return (
                    <FormControl fullWidth>
                        <TextField
                            value={value}
                            label={error && errorText ? `${label}, ${errorText}` : label}
                            error={error}
                            onChange={onChange}
                            select
                        >
                            {options.map((option) => <MenuItem key={option.id}
                                                               value={option.id}>{option.name}</MenuItem>)}
                        </TextField>
                    </FormControl>
                )
            }
            }
        />
    )
}