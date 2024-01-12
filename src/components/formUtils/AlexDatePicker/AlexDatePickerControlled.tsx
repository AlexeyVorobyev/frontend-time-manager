import {FC} from "react"
import {Controller, useFormContext} from "react-hook-form"
import {AlexDatePicker, EDatePickerType} from "./AlexDatePicker.tsx"

interface IProps {
	name: string
	label: string,
	type?: EDatePickerType | `${EDatePickerType}`
}

export const AlexDatePickerControlled: FC<IProps> = ({
														 name,
														 label,
														 type = EDatePickerType.date
													 }) => {
	const {control} = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			render={({field: {onChange, value}}) => {
				return <AlexDatePicker value={value} onChange={onChange}
									   label={label} type={type}/>
			}}/>
	)
}