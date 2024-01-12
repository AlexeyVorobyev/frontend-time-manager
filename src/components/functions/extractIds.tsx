export const extractIds = (data:any):any => {
    for (let key of Object.keys(data)) {
        if (typeof data[key] !== 'object' || !data[key]?.hasOwnProperty('id')) continue
        data[key] = data[key].id
    }
    return data
}