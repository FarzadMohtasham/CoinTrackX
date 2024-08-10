import { useState } from 'react';
import styled from 'styled-components';

import PasswordInputField from '@/components/ui/inputFields/PasswordField.input';
import Button from '@/components/ui/stuff/Button';
import toast from 'react-hot-toast';

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
   .header-wrapper {
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

   const onPasswordChangeClick = () => {
      toast.success('changed!');
   };

   return (
      <Container>
         <ContentWrapper>
            <div className="header-wrapper"></div>

            <div className="input-fields-wrapper">
               <div className="input-field">
                  <span className="input-label">New Password</span>
                  <PasswordInputField
                     inputValue={newPassword}
                     onChangeHandler={setNewPassword}
                     placeHolder="New password"
                     disabled={false}
                  />
               </div>

               <div className="input-field">
                  <span className="input-label">Confirm New Password</span>
                  <PasswordInputField
                     inputValue={confirmNewPassword}
                     onChangeHandler={setConfirmNewPassword}
                     placeHolder="Confirm new password"
                     disabled={false}
                  />
               </div>

               <Button
                  onClickHandler={onPasswordChangeClick}
                  disabled={false}
                  expanded
               >
                  Change Password
               </Button>
            </div>
         </ContentWrapper>
      </Container>
   );
}
