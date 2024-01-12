import React, {FC} from "react"
import {EIconToNameMap, IconToNameMap} from "./AlexIconIconToNameMap.ts"

interface IProps {
	iconName: EIconToNameMap | `${EIconToNameMap}`
}

export const AlexIcon: FC<IProps> = ({
								  iconName
							  }) => {
	const Icon = IconToNameMap[iconName]
	return <Icon/>
}