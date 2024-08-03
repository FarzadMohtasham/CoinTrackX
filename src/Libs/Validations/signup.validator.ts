import { object, string, ValidationError } from 'yup';
import {
   SignupValidationResult,
   SignupValidatorProps,
} from '@Typings/Validator/Auth.validator.type';

const firstNameValidationSchema = object({
   'firstname': string().required().min(1).max(30).trim(),
});

const lastNameValidationSchema = object({
   'lastname': string().required().min(1).max(30).trim(),
});

const emailValidationSchema = object({
   'email': string().required().max(100).email().trim(),
});

const passwordValidationSchema = object({
   'password': string()
      .required()
      .test(
         'min-length',
         "Password length can't be lower than 8",
         (val) => val.length >= 8,
      )
      .test(
         'max-length',
         "Password length can't be lower than 16",
         (val) => val.length <= 16,
      ),
});

export const signupInputValidator = async (
   props: SignupValidatorProps,
): Promise<SignupValidationResult> => {
   const validationResult: SignupValidationResult = {
      isValid: true,
      errorMessage: '',
   };

   const validationKey: string = props.type.toLowerCase();
   const validationValue: string = props.payload;

   const validationInputs = {
      [`${validationKey}`]: validationValue,
   }
   
   try {
      switch (validationKey) {
         case 'firstname':
            await firstNameValidationSchema.validate(validationInputs);
            break;
         case 'lastname':
            await lastNameValidationSchema.validate(validationInputs);
            break;
         case 'email':
            await emailValidationSchema.validate(validationInputs);
            break;
         case 'password':
            await passwordValidationSchema.validate(validationInputs);
            break;
      }
   } catch (e: any) {
      const error: ValidationError = e;

      if (error.message) validationResult.isValid = false;
      validationResult.errorMessage = error.message;
   }

   return validationResult;
};
