import React, {useState} from "react"
import {FormControl, IconButton, TextField, InputAdornment} from "@mui/material"
import {Controller, useFormContext} from "react-hook-form"
import {Visibility, VisibilityOff} from "@mui/icons-material"

export enum EInputType {
	email = 'email',
	password = 'password'
}

interface IProps {
	name: string
	defaultValue?: string
	label?: string
	required?: boolean
	validateFunctions?: {
		[key: string
			]:
			(valueToCheck: string) => boolean | string
	}
	error?: boolean,
	errorText?: string
	hidden?: boolean
	multiline?: boolean
	maxRows?: number
	inputType?: EInputType
}

const DEBUG = false
const DEBUG_PREFIX = 'ALEX_INPUT'

const AlexInput: React.FC<IProps> = ({
										 name,
										 defaultValue,
										 label,
										 required = false,
										 validateFunctions = undefined,
										 error = false,
										 errorText = undefined,
										 hidden = false,
										 multiline = false,
										 maxRows,
										 inputType = undefined
									 }) => {

	const {control} = useFormContext()

	const [showPassword, setShowPassword] = useState<boolean>(!hidden)
	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = () => setShowPassword(!showPassword)

	return (
		<Controller
			name={name}
			defaultValue={defaultValue || ''}
			control={control}
			rules={{
				validate: {
					required: required ? (value: string) => value?.length > 0 || 'обязательное поле' : () => true,
					...validateFunctions,
				}
			}}
			render={({field: {onChange, value}}) => {
				DEBUG && console.log(DEBUG_PREFIX, 'value', value)
				return (
					<FormControl fullWidth>
						<TextField
							defaultValue={value}
							type={showPassword ? "text" : "password"}
							label={error && errorText ? `${label}, ${errorText}` : label}
							value={value}
							onChange={onChange}
							error={error}
							multiline={multiline}
							maxRows={maxRows}
							InputProps={{
								type: inputType,
								endAdornment: hidden ? (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>
								) : null,
							}}
						/>
					</FormControl>
				)
			}
			}
		/>
	)
}

export {AlexInput}