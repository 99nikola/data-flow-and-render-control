export const isEmail = (email: string) => {
    let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (re.test(email))
        return true;
    return 'Please enter a valid email address'
}