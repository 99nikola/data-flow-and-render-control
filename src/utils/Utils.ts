let timerId: number | undefined | NodeJS.Timeout;

/**
 * 
 * @param  callBack CallBack function to be executed
 * @param  delay Delay in ms
 * @returns Throttled function, function that will be executed every `delay`ms
 */

export const throttleFunction = (callBack: Function, delay: number) => {
    return () => {
        if (timerId) return;

        callBack();
        timerId = setTimeout(() => timerId = undefined, delay);
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
        clearTimeout(timerId as number);

        timerId = setTimeout(callBack.bind(null, props), delay);
    }
}