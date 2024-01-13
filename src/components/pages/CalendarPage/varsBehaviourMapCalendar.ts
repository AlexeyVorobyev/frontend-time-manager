import {ESort} from "../../../redux/api/types/types.ts"


export const varsBehaviourMapCalendar = (initialVars: any) => {

    console.log('DEBUG INITIAL_VARS', initialVars)

    const mutatedVars = {
        ...(initialVars.page && {page: Number(initialVars.page)}),
        ...(initialVars.perPage && {perPage: Number(initialVars.perPage)}),
    }

    console.log('DEBUG MUTATED_VARS', mutatedVars)

    return mutatedVars
}