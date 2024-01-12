import {FC} from "react"
import {Chip} from "@mui/material"
import {makeStyles} from "@mui/styles"

const invertHex = (hex: string) => {
	return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).toUpperCase()
}

interface IProps {
	label?: string
	color?: string
}

export const AlexChip: FC<IProps> = ({
										 label = "",
										 color = "#333333"
									 }) => {


	return (
		<Chip label={label} sx={{
			backgroundColor: color,
			color: `#${invertHex(color)}`
		}}/>
	)
}