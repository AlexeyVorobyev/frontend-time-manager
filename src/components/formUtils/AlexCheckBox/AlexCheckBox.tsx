import {FC} from "react"
import Checkbox from "@mui/material/Checkbox"
import { FormControl } from "@mui/material"

interface IProps {
	value?: boolean
	onChange?: (...events: any) => void
	color?: {
		outline?: string,
		checked?: string
	}
	size?: number
	disabled?: boolean
}

export const AlexCheckBox: FC<IProps> = ({
											 value,
											 onChange,
											 color,
											 size,
											 disabled = false
										 }) => {
	return (
		<FormControl fullWidth={false}>
			<Checkbox
				checked={value}
				onChange={onChange}
				disabled={disabled}
				sx={{
					color: color?.outline,
					'&.Mui-checked': {
						color: color?.checked,
					},
					'&.Mui-disabled': {
						color: color?.outline
					},
					'& .MuiSvgIcon-root': {
						fontSize: size
					}
				}}
			/>
		</FormControl>
	)
}