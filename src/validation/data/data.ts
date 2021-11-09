import { compose } from "underscore"
import { isEmail, isTest } from "../Validation"

export interface IValidationRuleKey {
    "email"?: boolean;
    "minLength"?: number;
    "maxLength"?: number;
    "required"?: boolean;
}

export interface ValidationType {
    validation?: Function,
    rules?: IValidationRuleKey;
}

export const email: ValidationType = {
    validation: compose(isTest(true), isEmail),
    rules: {
        required: true,
        minLength: 6,
        email: true
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

export interface IValidationRule {
    /**
     * @throws {ValidationError}
     */
    validate(input: any): true | never;
}

export class ValidationError extends Error {}

export class MinLengthRule implements IValidationRule {
    length: number;

    constructor(length: number) {
        this.length = length;
    }

    validate(input: string): true | never {
        if (input.length < this.length) {
            throw new ValidationError("Min length error");
        }
        return true;
    }
}

export class MaxLengthRule extends MinLengthRule {
    validate(input: string): true | never {
        if (input.length > this.length) {
            throw new ValidationError("Max length error");
        }
        return true;
    }
}

export class RequiredRule implements IValidationRule {
    validate(input: any): true | never {
        const message = "Required field";
        if (input === undefined || input === null || input === NaN) {
            throw new ValidationError(message);
        }
        if (typeof input == "string" && input.length == 0) {
            throw new ValidationError(message);
        }
        return true;
    }
}

export class EmailRule implements IValidationRule {
    validate(input: string): true | never {
        let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!re.test(input)) {
            throw new ValidationError("Invalid email format");
        }
        return true;
    }
}

export class ValidationRuleFactory {
    static create(rule: keyof IValidationRuleKey): IValidationRule | null;
    static create(rule: keyof IValidationRuleKey, arg1: any): IValidationRule | null;
    static create(rule: keyof IValidationRuleKey, arg1: any, arg2: any): IValidationRule | null;
    static create(rule: keyof IValidationRuleKey, ...args: any[]): IValidationRule | null {
        switch (rule) {
            case "required":
                return new RequiredRule();
            case "minLength":
                return new MinLengthRule(args[0]);
            case "maxLength":
                return new MaxLengthRule(args[0]);
            case "email":
                return new EmailRule();
            default:
                return null;
        }
    }
}