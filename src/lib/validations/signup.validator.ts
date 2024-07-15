import { object, string, ValidationError } from 'yup';
import { SignupValidationResult, SignupValidatorProps } from '@typings/validator-types/Auth.validator.type.ts';

const firstNameValidationSchema = object({
  'first name': string().required().min(1).max(30).trim()
});

const lastNameValidationSchema = object({
  'last name': string().required().min(1).max(30).trim()
});

const emailValidationSchema = object({
  email: string().required().max(100).email().trim()
});

const passwordValidationSchema = object({
  password: string()
    .required()
    .test(
      'min-length',
      'Password length can\'t be lower than 8',
      (val) => val.length >= 8
    )
    .test(
      'max-length',
      'Password length can\'t be lower than 16',
      (val) => val.length <= 16
    )
});

export const signupInputValidator = async (
  props: SignupValidatorProps
): Promise<SignupValidationResult> => {
  const validationResult: SignupValidationResult = {
    isValid: true,
    errorMessage: ''
  };

  try {
    switch (props.type) {
      case 'firstName':
        await firstNameValidationSchema.validate({
          'first name': props.payload
        });
        break;
      case 'lastName':
        await lastNameValidationSchema.validate({
          'last name': props.payload
        });
        break;
      case 'email':
        await emailValidationSchema.validate({
          email: props.payload
        });
        break;
      case 'password':
        await passwordValidationSchema.validate({
          password: props.payload
        });
        break;
    }
  } catch (e: any) {
    const error: ValidationError = e;

    if (error.message) validationResult.isValid = false;
    validationResult.errorMessage = error.message;
  }

  return validationResult;
};
