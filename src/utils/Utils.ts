import _ from "underscore";


/**
 * 
 * @param  callBack CallBack function to be executed
 * @param  delay Delay in ms
 * @returns Throttled function, function that will be executed every `delay`ms
 */

export const throttleFunction = (callBack: Function, delay: number) => {
    let timerId: NodeJS.Timeout | undefined;
    
    const executor = (args: any) => {
        if (timerId)
            return;
        
        timerId = setTimeout(() => {
            callBack(args);
            timerId = undefined;
        }, delay);
    }

    executor.cancel = () => {
        if (!timerId)
            return;
        clearTimeout(timerId);
    }

    return executor;
}


/**
 * 
 * @param  callBack CallBack function to be executed
 * @param  delay Delay in ms
 * @returns Debouncing function, function that will be executed after `delay`ms of the last call
 */


export const debounceFunction = (callBack: Function, delay: number) => {
    let timerId: NodeJS.Timeout;

    const executor = (args: any) => {
        if (timerId) 
            clearTimeout(timerId);
    
        timerId = setTimeout(callBack.bind(this, args), delay);
    }

    executor.cancel = () => {
        if (!timerId)
            return;
        clearTimeout(timerId);
    }

    return executor;
}


const compose = (...args: any) => {
    return _.compose(...args);
}




