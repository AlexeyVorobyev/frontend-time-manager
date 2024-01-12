import {FC} from "react"
import {Chip} from "@mui/material"
import {makeStyles} from "@mui/styles"

class IProps {
	label?: string
	color?: string
}

export const AlexChip: FC<IProps> = ({
										 label = "",
										 color
									 }) => {

	return (
		<Chip label={label} style={{

		}}/>
	)
}