import {FC} from "react"
import {Controller, useFormContext} from "react-hook-form"
import {AlexDatePicker} from "./AlexDatePicker.tsx"

interface IProps {
	name: string
	label: string,
}

export const AlexDatePickerControlled: FC<IProps> = ({
														 name,
														 label,
													 }) => {
	const {control} = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			render={({field: {onChange, value}}) => {
				return <AlexDatePicker value={value} onChange={onChange}
									   label={label}/>
			}}/>
	)
}