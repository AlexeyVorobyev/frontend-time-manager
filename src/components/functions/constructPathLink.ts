export const constructPathLink = (path: string[]): string => {
    const formattedPathArr = ['', ...path]
    return formattedPathArr.reduce((resPath, currentValue, currentIndex) => resPath + currentValue + (currentIndex !== formattedPathArr.length - 1 ? '/' : ""))
}