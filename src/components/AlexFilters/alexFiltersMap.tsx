import {ReactElement} from "react";

export interface IAlexFilter {
    label: string,
    component: ReactElement
}

export const alexFiltersMap: Map<string, IAlexFilter> = new Map([
    // ['universityGrade', {
    //     label: 'Вид учебного заведения',
    //     component: <AlexToggle name={'universityGrade'}
    //                            options={
    //                                Object.values(EGrade).map((item) => {
    //                                    return {
    //                                        id: item,
    //                                        name: parseEGradeToRusName(item)
    //                                    }
    //                                })
    //                            }/>
    // }],
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