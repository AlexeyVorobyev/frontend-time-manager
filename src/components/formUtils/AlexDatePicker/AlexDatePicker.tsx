import {FC} from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3"
import {FormControl} from "@mui/material"

interface IProps {
	value: string,
	onChange: (...events:any) => void
	label: string,
}

export const AlexDatePicker: FC<IProps> = ({
											   value,
											   onChange,
											   label,
										   }) => {
	return (
		<FormControl fullWidth>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label={label}
					format="MM/dd/yyyy"
					value={value}
					onChange={onChange}
				/>
			</LocalizationProvider>
		</FormControl>
	)
}