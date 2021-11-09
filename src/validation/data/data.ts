import { compose } from "underscore"
import { RulesType } from "../../componenets/molecules/TextFieldState"
import { isEmail, isTest } from "../Validation"

export interface ValidationType {
    validation?: Function,
    rules?: RulesType
}

export const email: ValidationType = {
    validation: compose(isTest(true), isEmail),
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