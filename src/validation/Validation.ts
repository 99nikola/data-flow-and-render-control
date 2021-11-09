export const isEmail = (email: string) => {
    let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (re.test(email))
        return true;
    return 'Please enter a valid email address'
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

