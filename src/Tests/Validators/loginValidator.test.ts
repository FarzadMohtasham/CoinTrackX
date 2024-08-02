import { LoginValidationResult } from "@/Libs/Typings/Validator/Auth.validator.type";
import { loginInputValidator } from "@/Libs/Validations/login.validator";

describe('Login Validation - Email tests', () => {
   it('should validate email', async () => {
      const validationResult: LoginValidationResult = await loginInputValidator({
         payload: 'cointrackx@gmail.com',
         type: 'email'
      })

      expect(validationResult).toHaveProperty('isValid', true)
   });

   it('should not be valid larger than 100 char', async () => {
      const validationResult: LoginValidationResult = await loginInputValidator({
         payload: `${'a'.repeat(102)}@gmail.com`,
         type: 'email'
      })

      expect(validationResult).toHaveProperty('isValid', false)
   });

   it('should not be valid when email is empty', async () => {
      const validationResult: LoginValidationResult = await loginInputValidator({
         payload: '',
         type: 'email'
      })

      expect(validationResult).toHaveProperty('isValid', false)
   });
});

describe('Login Validation - Password tests', () => {
   it('should not be valid password - less than 8', async () => {
      const validationResult: LoginValidationResult = await loginInputValidator({
         payload: 'a'.repeat(7),
         type: 'password'
      })

      expect(validationResult).toHaveProperty('isValid', false)
   });

   it('should not be valid password - more than 16', async () => {
      const validationResult: LoginValidationResult = await loginInputValidator({
         payload: 'a'.repeat(17),
         type: 'password'
      })

      expect(validationResult).toHaveProperty('isValid', false)
   });

   it('should be valid password - between 8 and 16', async () => {
      const validationResult: LoginValidationResult = await loginInputValidator({
         payload: 'a'.repeat(13),
         type: 'password'
      })

      expect(validationResult).toHaveProperty('isValid', true)
   });

   it('should not be valid password - an space between chars', async () => {
      const validationResult: LoginValidationResult = await loginInputValidator({
         payload: 'pass password',
         type: 'password'
      })

      expect(validationResult).toHaveProperty('isValid', false)
   });
});