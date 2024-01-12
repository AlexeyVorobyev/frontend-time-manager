import {ESort} from "../../../redux/api/types/types.ts"


export const varsBehaviourMapTags = (initialVars: any) => {

    console.log('DEBUG INITIAL_VARS', initialVars)
    let resSort: string = ""

    if (initialVars.sort) {
        const sortObj = Object.fromEntries(initialVars.sort)
        for (const key of Object.keys(sortObj)) {
            if (sortObj![key] === 'asc') {
                resSort += (`&sort=${key},${ESort.ascending}`)
            } else {
                resSort += (`&sort=${key},${ESort.descending}`)
            }
        }
        resSort = resSort.replace('&sort=', '')
    }

    const mutatedVars = {
        ...(initialVars.page && {page: Number(initialVars.page)}),
        ...(initialVars.perPage && {perPage: Number(initialVars.perPage)}),
        // ...(initialVars.sort && {sort: resSort}),
        ...(initialVars.simpleFilter && {simpleFilter: initialVars.simpleFilter}),
    }

    console.log('DEBUG MUTATED_VARS', mutatedVars)

    return mutatedVars
}