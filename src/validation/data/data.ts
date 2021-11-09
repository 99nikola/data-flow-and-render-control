import { RulesType } from "../../componenets/molecules/TextFieldState"
import { isEmail } from "../Validation"

export interface ValidationType {
    validation?: Array<Function>,
    rules?: RulesType
}

export const email: ValidationType = {
    validation: [
        isEmail
    ],
    rules: {
        required: true,
        minLength: 6,
    }
}

export const name: ValidationType = {
    rules: {
        required: true
    }
}

export const address: ValidationType = {
    rules: {
        minLength: 6,
        maxLength: 20
    }
}