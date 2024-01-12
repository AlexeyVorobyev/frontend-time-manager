import React, {FC} from "react"
import Radio from "@mui/material/Radio"
import {makeStyles} from "@mui/styles"

const HUE_ICON_SIZE = 24
const SHADE_ICON_SIZE = 32

const useStyles = makeStyles((theme: any) => ({
	hueBox: {
		maxWidth: 554,
		backgroundColor: '#F6F6F6',
		borderRadius: 8,
		padding: 2,
	},
	hueRadio: {
		width: 60,
		height: 34,
		padding: 8,
		borderRadius: 4,
	},
	hueIcon: {
		width: HUE_ICON_SIZE,
		height: HUE_ICON_SIZE,
		borderRadius: HUE_ICON_SIZE / 2,
	},

	shades: {
		maxWidth: 136 * 4,
		minHeight: 120,
	},
	shadeRadio: {
		width: 136,
		height: 48,
		padding: 8,
		marginBottom: 12,
		borderRadius: 8,
	},
	shadeIcon: {
		width: SHADE_ICON_SIZE,
		height: SHADE_ICON_SIZE,
		borderRadius: SHADE_ICON_SIZE / 2,
	},

}))

interface IProps {
	value?: string
}

export const AlexColorDisplay: FC<IProps> = ({
												 value
											 }) => {

	const classes = useStyles()

	return (
		<Radio
			name={'custom'}
			className={classes.shadeRadio}
			style={{border: value ? '1px solid #1F4094' : undefined}}
			color="default"
			checked={Boolean(value)}
			value={value}
			icon={<div className={classes.shadeIcon} style={{backgroundColor: value}}/>}
			checkedIcon={<div className={classes.shadeIcon}
							  style={{backgroundColor: value}}/>}
		/>
	)
}