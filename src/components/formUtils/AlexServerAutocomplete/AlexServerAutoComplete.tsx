import React, {CSSProperties, useCallback, useEffect, useState} from "react"
import {Controller, useFormContext} from "react-hook-form"
import {UseLazyQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks"
import {debounce} from "../../functions/debounce"
import {Autocomplete, Box, FormControl, TextField} from "@mui/material"

interface IOption {
	id: any,
	name: any
}

interface IProps {
	name: string
	defaultValue?: IOption
	label?: string
	useLazyGetQuery: UseLazyQuery<any>
	perPage?: number
	required?: boolean
	optionsConfig?: {
		optionsReadFunction: (option: any) => IOption
		optionsPath: string[]
	}
	multiple?: boolean
	style?: CSSProperties
	error?: boolean
	errorText?: string
	validateFunctions?: {
		[key: string]: (valueToCheck: string) => boolean | string
	}
	debounceTime?: number
}

const DEBUG = false
const DEBUG_PREFIX = 'ALEX_SERVER_AUTOCOMPLETE'

export const AlexServerAutoComplete: React.FC<IProps> = ({
															 name,
															 defaultValue,
															 label,
															 useLazyGetQuery,
															 perPage = 10,
															 required = false,
															 optionsConfig,
															 multiple = false,
															 style,
															 error = false,
															 errorText = undefined,
															 validateFunctions,
															 debounceTime = 800
														 }) => {

	const {control} = useFormContext()
	const [inputValue, setInputValue] = React.useState('')
	const [options, setOptions] = useState<null | Array<IOption>>(null)
	const [lazyGetQuery, result] = useLazyGetQuery()
	const debouncedLazyGetQuery = useCallback(debounce(lazyGetQuery, debounceTime), [])

	useEffect(() => {
		debouncedLazyGetQuery({page: 0, size: perPage, titleFilter: inputValue})
	}, [inputValue])

	useEffect(() => {
		if (result.status !== 'fulfilled' || !result.currentData) return
		DEBUG && console.log(DEBUG_PREFIX, 'QUERY RESPONSE', result.currentData)
		if (optionsConfig) {
			let options = result.currentData as any
			optionsConfig.optionsPath.map((path) => options = options[path])
			options = options.map((option: any) => optionsConfig.optionsReadFunction(option))
			setOptions(options as Array<IOption>)
		} else {
			setOptions(result.currentData as Array<IOption>)
		}
	}, [result])


	return (
		<Controller
			name={name}
			defaultValue={defaultValue || ""}
			control={control}
			rules={{
				validate: {
					required: required ? (value: string) => value || 'обязательное поле' : () => true,
					...validateFunctions,
				}
			}}
			render={({field: {onChange, value}}) => {
				DEBUG && console.log(DEBUG_PREFIX, 'VALUE', value)
				return (
					<FormControl fullWidth>
						<Autocomplete
							isOptionEqualToValue={(option, value) => option.id === value.id}
							style={style}
							multiple={multiple}
							options={options || []}
							autoHighlight
							filterOptions={(x) => x}
							value={multiple
								? (value || [])
								: (value || null)
							}
							// @ts-ignore
							onChange={(event, newValue) => {
								onChange(newValue)
							}}
							inputValue={inputValue}
							getOptionLabel={(value: IOption) => {
								return value.name
							}}
							// @ts-ignore
							onInputChange={(event, value) => {
								setInputValue(value)
							}}
							renderOption={(props, option) => {
								return (
									<Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}
										 key={option.id}>
										{option.name}
									</Box>)
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label={error && errorText ? `${label}, ${errorText}` : label}
									inputProps={{
										...params.inputProps,
									}}
									error={error}
								/>
							)}
						/>
					</FormControl>
				)
			}
			}
		/>
	)
}