import { object, string, ValidationError } from 'yup';
import {
   InputFieldValidatorProps,
   InputFieldValidatorResult,
} from '@/Libs/Typings/Validator/Input.validator.type';

export const InputFieldValidator = async (
   props: InputFieldValidatorProps,
): Promise<InputFieldValidatorResult> => {
   const validationResult: InputFieldValidatorResult = {
      isValid: true,
      errorMessage: '',
   };

   const { inputValue, fieldName, minLength = 1, maxLength = 10 } = props;

   const inputFieldValidationSchema = object({
      inputValue: string()
         .required(`${fieldName} is a required field`)
         .test(
            'min-length',
            `${fieldName} length can\'t be lower than ${minLength}`,
            (val) => val.length >= minLength,
         )
         .test(
            'max-length',
            `${fieldName} length can\'t be higher than ${maxLength}`,
            (val) => val.length <= maxLength,
         ),
   });

   try {
      await inputFieldValidationSchema.validate({
         inputValue: inputValue,
      });
   } catch (e: any) {
      const error: ValidationError = e;

      if (error.message) validationResult.isValid = false;
      validationResult.errorMessage = error.message;
   }

   return validationResult;
};
