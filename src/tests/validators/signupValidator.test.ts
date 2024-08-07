import {
   SignupValidationResult,
   SignupValidatorProps,
} from '@typings/validator/Auth.validator.type.ts';
import { signupInputValidator } from '@validations/signup.validator.ts';

describe('Signup validations - firstName', () => {
   it('should username not be valid when is empty', async () => {
      const validationInputs: SignupValidatorProps = {
         type: 'firstName',
         payload: ''
      }

      const validationResult: SignupValidationResult = await signupInputValidator(validationInputs)

      expect(validationResult).toHaveProperty('isValid', false)
   });

   it('should username not be valid when is larger than 30 char', async () => {
      const validationInputs: SignupValidatorProps = {
         type: 'firstName',
         payload: 'a'.repeat(31)
      }

      const validationResult: SignupValidationResult = await signupInputValidator(validationInputs)

      expect(validationResult).toHaveProperty('isValid', false)
   });

   it('should username not be valid when is larger than 30 char', async () => {
      const validationInputs: SignupValidatorProps = {
         type: 'firstName',
         payload: 'a'.repeat(31)
      }

      const validationResult: SignupValidationResult = await signupInputValidator(validationInputs)

      expect(validationResult).toHaveProperty('isValid', false)
   });
});

describe('Signup validations - lastName', () => {
   it('should lastName not be valid when is empty', async () => {
      const validationInputs: SignupValidatorProps = {
         type: 'lastName',
         payload: ''
      }

      const validationResult: SignupValidationResult = await signupInputValidator(validationInputs)

      expect(validationResult).toHaveProperty('isValid', false)
   });

   it('should lastName not be valid when is larger than 30 char', async () => {
      const validationInputs: SignupValidatorProps = {
         type: 'lastName',
         payload: 'a'.repeat(31)
      }

      const validationResult: SignupValidationResult = await signupInputValidator(validationInputs)

      expect(validationResult).toHaveProperty('isValid', false)
   });

   it('should lastName not be valid when is larger than 30 char', async () => {
      const validationInputs: SignupValidatorProps = {
         type: 'lastName',
         payload: 'a'.repeat(31)
      }

      const validationResult: SignupValidationResult = await signupInputValidator(validationInputs)

      expect(validationResult).toHaveProperty('isValid', false)
   });
});