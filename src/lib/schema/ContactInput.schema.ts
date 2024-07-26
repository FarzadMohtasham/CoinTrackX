import * as yup from 'yup';

export const contactInputSchema = yup.object({
   displayName: yup.string().required().max(40),
   email: yup.string().required().email().max(50),
});
