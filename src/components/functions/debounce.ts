export const debounce = (callback:Function,delay:number) => {
    let timer:any = null;
    return (...args:any) => {
        if (timer != null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            callback(...args);
        },delay)
    }
}
