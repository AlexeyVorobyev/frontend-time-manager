export const checkLocation = (currentLocation: string, constructedPathLink: string): boolean => {
    return currentLocation === '/' + constructedPathLink || currentLocation === constructedPathLink
}