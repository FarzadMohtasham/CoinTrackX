import { useEffect, useState } from 'react';
import styled from 'styled-components';

import PasswordInputField from '@/components/ui/inputFields/PasswordField.input';
import Button from '@/components/ui/stuff/Button';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import * as Yup from 'yup';
import Heading from '@/components/ui/stuff/Heading';
import {
   Alert,
   AlertDescription,
   AlertIcon,
   AlertTitle,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { InputValue } from '@/libs/typings/components/InputFieldProps.type';

const Container = styled.div`
   padding: 10px;
   width: 100%;
   height: 100%;
   display: grid;
   place-content: center;
   padding: 15px;
   padding-top: 32px;
`;

const ContentWrapper = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   gap: 30px;

   .header-wrapper {
      .heading {
         margin-bottom: 10px;
         font-weight: 500;
      }

      .desc {
         font-size: var(--font-size-body-md);
      }
   }

   .input-fields-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .input-field {
         span.input-label {
            display: block;
            font-size: var(--font-size-body-md);
            font-weight: 500;
            color: var(--color-black-700);
            margin-bottom: 7px;
         }
      }
   }
`;

export default function PasswordPage() {
   const [newPassword, setNewPassword] = useState<string>('');
   const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
   const [errorMessage, setErrorMessage] = useState<string | null>(null);

   const { mutateAsync: changePasswordMutation } = useMutation({
      mutationFn: async () => {
         await supabaseClient.auth.updateUser({
            password: newPassword,
         });
      },
      onSuccess: () => {
         toast.success('Password changed successfully');
      },
      onError: ({ message }) => {
         toast.error(message);
      },
   });

   const onPasswordChangeClick = async () => {
      changePasswordMutation();
   };

   const validateNewPassword = async (): Promise<{
      isValid: boolean;
      message: string | null;
   }> => {
      try {
         const passwordValidationSchema = Yup.object().shape({
            newPassword: Yup.string()
               .required('New password field is required')
               .min(8, 'Password length cannot be lower than 8')
               .max(24, 'Password length cannot be more than 24'),
            confirmNewPassword: Yup.string()
               .required('Confirm new password field is required')
               .min(8, 'Password length cannot be lower than 8')
               .max(24, 'Password length cannot be more than 24')
               .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
         });

         await passwordValidationSchema.validate({
            newPassword,
            confirmNewPassword,
         });

         return {
            isValid: true,
            message: null,
         };
      } catch (err: unknown) {
         const error = err as Yup.ValidationError;

         return {
            isValid: false,
            message: error.message,
         };
      }
   };

   useEffect(() => {
      validateNewPassword().then((validationResult) => {
         const { isValid, message: validationErrorMsg } = validationResult;
         if (!isValid) {
            setErrorMessage(validationErrorMsg);
            return;
         }
         setErrorMessage(null);
      });
   }, [newPassword, confirmNewPassword]);

   return (
      <Container>
         <ContentWrapper>
            <div className="header-wrapper">
               <Heading tagName="h5" className="heading">
                  Change password
               </Heading>
               <span className="desc">
                  Remember not to store your password in your email or cloud and
                  don't share it with anyone
               </span>
            </div>

            <div className="input-fields-wrapper">
               <AnimatePresence>
                  {errorMessage && (
                     <motion.div
                        key={'container-1'}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                     >
                        <Alert status="error">
                           <AlertIcon />
                           <AlertTitle>Error!</AlertTitle>
                           <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                     </motion.div>
                  )}

                  <motion.div
                     key={'container-2'}
                     layout
                     className="input-field"
                  >
                     <span className="input-label">New Password</span>
                     <PasswordInputField
                        inputValue={newPassword}
                        onChangeHandler={(inputVal: InputValue) =>
                           setNewPassword(String(inputVal))
                        }
                        iconSrc={'password-icon.svg'}
                        placeHolder="New password"
                        disabled={false}
                     />
                  </motion.div>

                  <motion.div
                     key={'container-3'}
                     layout
                     className="input-field"
                  >
                     <span className="input-label">Confirm New Password</span>
                     <PasswordInputField
                        inputValue={confirmNewPassword}
                        onChangeHandler={(inputVal: InputValue) =>
                           setConfirmNewPassword(String(inputVal))
                        }
                        iconSrc={'password-icon.svg'}
                        placeHolder="Confirm new password"
                        disabled={false}
                     />
                  </motion.div>

                  <motion.div layout key={'container-4'}>
                     <Button
                        onClickHandler={onPasswordChangeClick}
                        disabled={errorMessage ? true : false}
                        expanded
                     >
                        Change Password
                     </Button>
                  </motion.div>
               </AnimatePresence>
            </div>
         </ContentWrapper>
      </Container>
   );
}
