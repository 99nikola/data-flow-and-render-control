let timerIds: Map<Function, number> = new Map<Function, number>();

/**
 * 
 * @param  callBack CallBack function to be executed
 * @param  delay Delay in ms
 * @returns Throttled function, function that will be executed every `delay`ms
 */

export const throttleFunction = (callBack: Function, delay: number) => {
    return (props: any) => {
        if (timerIds.has(callBack))
            return;

        
        let id: any = setTimeout(() => {
            timerIds.delete(callBack)
            callBack(props);
        }, delay);
        timerIds.set(callBack, id);
    }
}




/**
 * 
 * @param  callBack CallBack function to be executed
 * @param  delay Delay in ms
 * @returns Debouncing function, function that will be executed after `delay`ms of the last call
 */


export const debounceFunction = (callBack: Function, delay: number) => {
    return (props: any) => {
        if (timerIds.has(callBack)) {
            clearTimeout(timerIds.get(callBack));
            timerIds.delete(callBack);
        }
    

        let id: any = setTimeout(callBack.bind(null, props), delay);
        timerIds.set(callBack, id);
    }
}