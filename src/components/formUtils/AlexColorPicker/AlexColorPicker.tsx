import React, {useEffect, useState} from 'react'
import * as muiColors from '@mui/material/colors'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import {Box, Divider, Paper, Stack, Tooltip} from '@mui/material'
import {AlexInput} from "../AlexInput/AlexInput.tsx"
import {makeStyles} from "@mui/styles"
import {EColorPaletteType} from "./AlexColorPickerControlled.tsx"
import {theme} from "../../Theme/theme.ts"

interface Color {
	[shade: string]: string
}

interface Colors {
	[hue: string]: Color
}

type MuiColors = typeof muiColors

const fullHuesRus: Color = {
	'red': 'красный',
	'deepOrange': 'оранжевый',
	'orange': 'апельсиновый',
	'amber': 'янтарь',
	'yellow': 'желтый',
	'lime': 'лайм',
	'lightGreen': 'желто-зеленый',
	'green': 'зеленый',
	'teal': 'изумрудный',
	'cyan': 'бирюзовый',
	'lightBlue': 'голубой',
	'blue': 'синий',
	'indigo': 'индиго',
	'deepPurple': 'фиолетовый',
	'purple': 'сиреневый',
	'pink': 'розовый',
}
const huesRus: Color = {
	'red': 'красный',
	'orange': 'апельсиновый',
	'amber': 'янтарь',
	'green': 'зеленый',
	'cyan': 'бирюзовый',
	'blue': 'синий',
	'indigo': 'индиго',
	'purple': 'сиреневый',
}
const reducedHues: string[] = Object.keys(huesRus)
const fullHues: string[] = Object.keys(fullHuesRus)

const colors: Colors = {}
for (let hue of fullHues) {
	colors[hue] = muiColors[hue as keyof MuiColors]
}

const fullShades: string[] = [
	'A700',
	'A400',
	'A200',
	'A100',
	'900',
	'800',
	'700',
	'600',
	'500',
	'400',
	'300',
	'200',
	'100',
	'50',
]
const reducedShades: string[] = [
	'A400',
	'200',
	'100',
	'50',
	'500',
	'700',
	'800',
	'900',
]

const allColors: string[] = fullHues
	.map((hue) => {
		return fullShades.map((shade, shadeIndex) => colors[hue][shade])
	}).flat()

export const DEFAULT_COLOR = '#2196f3'
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

interface HueShade {
	hue: string
	shadeIndex: number
}

interface HueShadeMap {
	[color: string]: HueShade
}

interface ColorPickerProps {
	disabled?: boolean
	defaultColor: string
	onChange: (value: any) => void
	palette?: EColorPaletteType | `${EColorPaletteType}`
}

const STORAGE_KEY = 'alex-custom-colors'

export const AlexColorPicker: React.FC<ColorPickerProps> = ({
																defaultColor,
																onChange,
																disabled,
																palette = EColorPaletteType.full
															}) => {
	const [currentPalette, setCurrentPalette] = useState<`${EColorPaletteType}`>(palette)
	const [customColor, setCustomColor] = useState<string>(defaultColor)
	const [customColors, setCustomColors] = useState<string[]>([])
	const [colorToHueShadeMap, setColorToHueShadeMap] = useState<HueShadeMap>({})

	const [selectedHue, setSelectedHue] = useState<string | undefined>(
		colorToHueShadeMap?.[defaultColor]?.hue
	)
	const [selectedShadeIndex, setSelectedShadeIndex] = useState<number | undefined>(
		colorToHueShadeMap?.[defaultColor]?.shadeIndex
	)
	const classes = useStyles()

	const hues = currentPalette === 'full' ? fullHues : reducedHues
	const shades = currentPalette === 'full' ? fullShades : reducedShades

	useEffect(() => {
		let colors = []
		const ls =
			localStorage.getItem(STORAGE_KEY)
		if (ls) {
			try {
				colors = JSON.parse(ls) || []
			} catch {
				colors = []
			}
		}
		setCustomColors(colors)
	}, [])

	useEffect(() => {
		let colorToHueShadeMap: HueShadeMap = {}
		hues.forEach((hue) => {
			shades.forEach((shade, shadeIndex) => {
				const color = colors[hue][shade]
				if (!!colorToHueShadeMap) colorToHueShadeMap[color] = {hue, shadeIndex}
			})
		})
		setColorToHueShadeMap(colorToHueShadeMap)
	}, [currentPalette, colors, hues, shades])

	useEffect(() => {
		if (defaultColor) {
			setSelectedHue(colorToHueShadeMap?.[defaultColor]?.hue)
			setSelectedShadeIndex(colorToHueShadeMap?.[defaultColor]?.shadeIndex)
		}
		setCustomColor(defaultColor)
	}, [defaultColor, colorToHueShadeMap])

	return (
		<Paper elevation={0} style={{maxWidth: 608}}>
			<Box style={{
				display: 'flex', flexDirection: 'column', alignItems: 'center',
				minWidth: 560, maxWidth: 560, gap: '28px 0px',
			}}
			>
				<Box className={classes.hueBox}>
					{hues.map((hue, index) => {
						const backgroundColor = colors[hue]['A400']
						return (
							<Tooltip placement="right" title={huesRus[hue]} key={hue}>
								<Radio
									name={'hue'}
									className={classes.hueRadio}
									style={{
										backgroundColor: selectedHue === hue ? 'white' : undefined,
										marginRight: (index % 8) !== 7 ? 10 : 0
									}}
									color="default"
									checked={selectedHue === hue}
									data-testid={hue}
									onChange={(e) => {
										if (!disabled) {
											setSelectedHue(e.target.value)
										}
									}}
									value={hue}
									aria-labelledby={`tooltip-${hue}`}
									icon={<div className={classes.hueIcon} style={{backgroundColor}}/>}
									checkedIcon={<div className={classes.hueIcon} style={{backgroundColor}}/>}
								/>
							</Tooltip>
						)
					})}
				</Box>
				<Box className={classes.shades}>
					{selectedHue && shades.map((shade, index) => {
						const backgroundColor = colors[selectedHue]?.[shades[index]]
						const checked = selectedShadeIndex === index && defaultColor === backgroundColor
						return (
							<Radio
								name={'shade'}
								className={classes.shadeRadio}
								style={{border: checked ? '1px solid #1F4094' : undefined}}
								color="default"
								checked={checked}
								data-testid={shade}
								onChange={(e) => {
									if (!disabled) {
										if (e.target.value) {
											const color = colors[selectedHue][shades[Number(e.target.value)]]
											onChange(color)
											setSelectedShadeIndex(Number(e.target.value))
										}
									}
								}}
								value={index}
								icon={<div className={classes.shadeIcon} style={{backgroundColor}}/>}
								checkedIcon={<div className={classes.shadeIcon} style={{backgroundColor}}/>}
							/>
						)
					})}

				</Box>
				<Divider style={{width: '100%', marginLeft: -48, marginRight: -48}}/>
				<Stack direction={'row'} spacing={theme.spacing(2)} alignItems={'center'}>
					<AlexInput
						label={'Цвет'}
						value={customColor}
						onChange={(e) => {
							const isValid = /^\#[\da-fA-F]{0,6}$/.test(e.target.value)
							if (isValid) {
								setCustomColor(e.target.value)
							}
						}}
						onKeyPress={(e) => {
							if (e.key === 'PageUp') setCurrentPalette('full')
							if (e.key === 'PageDown') setCurrentPalette('reduced')
						}}
						error={customColor.length !== 7}
					/>
					<Radio
						name={'custom'}
						className={classes.shadeRadio}
						style={{border: defaultColor === customColor ? '1px solid #1F4094' : undefined}}
						color="default"
						checked={defaultColor === customColor}
						onChange={(e) => {
							console.log(`e.target.value`, e.target.value)
							if (!disabled && e.target.value) {
								onChange(e.target.value)
							}
						}}
						onClick={(e) => {
							const isValid = /^\#[\da-fA-F]{6}$/.test(customColor)
							if (isValid) {
								onChange(customColor)
								if
								(!colorToHueShadeMap.hasOwnProperty(customColor) && !customColors.includes(customColor)) {
									localStorage.setItem(STORAGE_KEY, JSON.stringify([customColor, ...customColors].slice(0, 4)))
									setCustomColors(customColors => [customColor, ...customColors].slice(0, 4))
								}
							}
						}}
						value={customColor}
						icon={<div className={classes.shadeIcon} style={{backgroundColor: customColor}}/>}
						checkedIcon={<div className={classes.shadeIcon}
										  style={{backgroundColor: customColor}}/>}
					/>
				</Stack>
			</Box>
		</Paper>
	)

}