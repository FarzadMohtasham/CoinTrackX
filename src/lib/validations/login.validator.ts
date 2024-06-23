import {object, string, ValidationError} from 'yup'
import {LoginValidatorProps, LoginValidationResult} from '@typings/validator-types/auth-validator.type.ts'

const emailValidationSchema = object({
    email: string().required().max(100).email().trim(),
});

const passwordValidationSchema = object({
    password: string()
        .required()
        .test('min-length', 'Password length can\'t be lower than 8', val => val.length >= 8)
        .test('max-length', 'Password length can\'t be lower than 16', val => val.length <= 16)
});

export const loginInputValidator = async (props: LoginValidatorProps): Promise<LoginValidationResult> => {
    const validationResult: LoginValidationResult = {
        isValid: true,
        errorMessage: ''
    }

    try {
        if (props.type === 'email') await emailValidationSchema.validate({
            email: props.payload
        })

        if (props.type === 'password') await passwordValidationSchema.validate({
            password: props.payload
        })
    } catch (e: any) {
        const error: ValidationError = e

        if (error.message) validationResult.isValid = false
        validationResult.errorMessage = error.message
    }

    return validationResult
}