import {FC} from "react"
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3"
import {FormControl} from "@mui/material"

export enum EDatePickerType {
	date = 'date',
	dateTime = 'dateTime'
}

interface IProps {
	value: string,
	onChange: (...events: any) => void
	label: string,
	type?: EDatePickerType | `${EDatePickerType}`
}

export const AlexDatePicker: FC<IProps> = ({
											   value,
											   onChange,
											   label,
											   type = EDatePickerType.date
										   }) => {
	return (
		<FormControl fullWidth>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				{type === EDatePickerType.date
					? <DatePicker
					label={label}
					format="MM/dd/yyyy"
					value={value}
					onChange={onChange}
				/>
					: <DateTimePicker
						label={label}
						value={value}
						onChange={onChange}
					/>}
			</LocalizationProvider>
		</FormControl>
	)
}