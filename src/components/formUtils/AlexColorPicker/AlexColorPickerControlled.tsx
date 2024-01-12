import {FC} from "react"
import {Controller, useFormContext} from "react-hook-form"
import {AlexColorPicker, DEFAULT_COLOR} from "./AlexColorPicker.tsx"

export enum EColorPaletteType {
	full = 'full',
	reduced = 'reduced'
}

interface Props {
	name: string
	required?: boolean
	palette?: EColorPaletteType | `${EColorPaletteType}`
	defaultValue?: string
}

export const AlexColorPickerControlled: FC<Props> = ({
														 name,
														 required = false,
														 palette = EColorPaletteType.full,
														 defaultValue = DEFAULT_COLOR
													 }) => {
	const {control} = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				validate: {
					required: required ? (value: string) => value?.length > 0 || 'обязательное поле' : () => true,
				}
			}}
			defaultValue={defaultValue}
			render={({field: {onChange, value}}) => {
				return (<AlexColorPicker defaultColor={value}
										 onChange={onChange}
										 palette={palette}
				/>)
			}}
		/>
	)
}