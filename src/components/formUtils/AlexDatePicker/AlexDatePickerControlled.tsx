import {FC} from "react"
import {WrapperVariant} from "@material-ui/pickers/wrappers/Wrapper"
import {Controller, useFormContext} from "react-hook-form"
import {AlexDatePicker} from "./AlexDatePicker.tsx"

interface IProps {
	name: string
	label: string,
	type: WrapperVariant
}

export const AlexDatePickerControlled: FC<IProps> = ({
														 name,
														 label,
														 type = 'dialog'
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