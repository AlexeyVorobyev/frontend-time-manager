import {FormControl, IconButton, InputAdornment, TextField} from "@mui/material"
import {Visibility, VisibilityOff} from "@mui/icons-material"
import React, {FC, useState} from "react"
import {EInputType} from "./AlexInputControlled.tsx"

interface IProps {
	label?: string
	error?: boolean,
	errorText?: string
	hidden?: boolean
	multiline?: boolean
	maxRows?: number
	inputType?: EInputType
	value: string,
	onChange: (...event: any[]) => void
	onKeyPress?: (...event: any[]) => void
}

export const AlexInput: FC<IProps> = ({
								   label,
								   error = false,
								   errorText = undefined,
								   hidden = false,
								   multiline = false,
								   maxRows,
								   inputType = undefined,
								   value,
								   onChange,onKeyPress
							   }) => {

	const [showPassword, setShowPassword] = useState<boolean>(!hidden)
	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = () => setShowPassword(!showPassword)

	return (
		<FormControl fullWidth>
			<TextField
				defaultValue={value}
				type={showPassword ? "text" : "password"}
				label={error && errorText ? `${label}, ${errorText}` : label}
				onKeyPress={onKeyPress}
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