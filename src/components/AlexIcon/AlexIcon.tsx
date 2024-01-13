import React, {FC} from "react"
import {EIconToNameMap, IconToNameMap} from "./AlexIconIconToNameMap.ts"

interface IProps {
	iconName: EIconToNameMap | `${EIconToNameMap}`
	size: "small" | "inherit" | "large" | "medium"
}

export const AlexIcon: FC<IProps> = ({
										 iconName,
										 size = 'medium'
									 }) => {
	const Icon = IconToNameMap[iconName]
	return <Icon fontSize={size}/>
}