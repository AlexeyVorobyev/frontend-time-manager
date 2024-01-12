import {ReactElement} from "react";
import {AlexServerAutoComplete} from "../formUtils/AlexServerAutocomplete/AlexServerAutoComplete.tsx"
import {useLazyTagsQuery} from "../../redux/api/tags.api.ts"
import {formatTag} from "../functions/formatFunctions.ts"

export interface IAlexFilter {
    label: string,
    component: ReactElement
}

export const alexFiltersMap: Map<string, IAlexFilter> = new Map([
    ['tagFilter', {
        label: 'Тег',
        component: <AlexServerAutoComplete name={'tagFilter'} label={'Тэги'}
                                           useLazyGetQuery={useLazyTagsQuery} perPage={1000}
                                           optionsConfig={{
                                               optionsReadFunction: formatTag,
                                               optionsPath: ['list']
                                           }}/>
    }],
    // ['userRole', {
    //     label: 'Роль пользователя',
    //     component: <AlexToggle name={'userRole'}
    //                            options={
    //                                Object.values(EUserRole).map((item) => {
    //                                    return {
    //                                        id: item,
    //                                        name: parseEUserRoleToRusName(item)
    //                                    }
    //                                })
    //                            }/>
    // }],
    // ['educationLevel', {
    //     label: 'Уровень образования',
    //     component: <AlexToggle name={'educationLevel'}
    //                            orientation={'vertical'}
    //                            enforceSelect
    //                            options={
    //                                Object.values(EEducationLevel).map((item) => {
    //                                    return {
    //                                        id: item,
    //                                        name: parseEEducationLevelToRusName(item)
    //                                    }
    //                                })
    //                            }/>
    // }],
])