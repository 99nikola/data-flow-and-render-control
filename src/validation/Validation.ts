export class ValidationError {
    error: string;
    constructor(error: string) {
        this.error = error;
    }
}

export const isEmail = (input: string | ValidationError) => {
    if (input instanceof ValidationError) 
        return input;
    let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (re.test(input))
        return input;
    return new ValidationError('Please enter a valid email address');
}

export const isWholeNumber = (input: string | ValidationError) => {
    if (input instanceof ValidationError) 
        return input;

    let number = Number(input); // NaN if not a number
    if (!Number.isInteger(number) || number < 0 || !Number.isFinite(number))
        return new ValidationError('Enter a valid whole number');
    return input;
}


// for testing compose function
export const isTest = (isValid: boolean) => {
    return (input : string | ValidationError) => {
        if (input instanceof ValidationError)
            return input;
    
        if (isValid)
            return input;
        
        return new ValidationError('Test error message');
    }
}

export const minLength = (value: string, min: number) => {
    if (value.length >= min)
        return true;
    return `Input must be at least ${min} characters long`;
}

export const maxLength = (value: string, max: number) => {
    if (value.length <= max)
        return true;
    return `Input could be up to ${max} characters long`;
}

export const required = (input: string) => {
    if (!input || input.length === 0)
        return 'Required';
    return true;
}

