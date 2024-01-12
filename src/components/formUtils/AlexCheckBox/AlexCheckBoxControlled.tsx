import {FC} from "react"
import {Controller, useFormContext} from "react-hook-form"
import {AlexCheckBox} from "./AlexCheckBox.tsx"

interface IProps {
	name: string,
	color?: {
		outline?: string,
		checked?: string
	}
	size?: number
	disabled?: boolean
}

export const AlexCheckBoxControlled: FC<IProps> = ({
													   name,
													   color,
													   size,
													   disabled = false
												   }) => {
	const {control} = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			render={({field: {onChange, value}}) => {
				return (value == false || value) && (
					<AlexCheckBox onChange={onChange} value={value}
								  size={size} color={color} disabled={disabled}/>
				)
			}}
		/>
	)
}