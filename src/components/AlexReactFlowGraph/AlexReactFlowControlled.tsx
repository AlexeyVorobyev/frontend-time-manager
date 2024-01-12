import {FC} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {AlexReactFlowUncontrolled, EAlexReactFlowUncontrolledMode, IGraphData} from "./AlexReactFlowUncontrolled";

interface IProps {
    name: string
}

export const AlexReactFlowControlled: FC<IProps> = ({
                                                        name
                                                    }) => {
    const {control} = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value}}) => (
                <AlexReactFlowUncontrolled onChange={onChange} value={value} mode={EAlexReactFlowUncontrolledMode.edit}/>
            )}/>
    )
}