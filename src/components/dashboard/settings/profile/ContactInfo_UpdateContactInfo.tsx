import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';

import Input from '@components/ui/inputFields/InputField.input.tsx';

type UpdateContactInfoProps = {
   setDisplayName: Dispatch<SetStateAction<string>>;
   setEmail: Dispatch<SetStateAction<string>>;
   displayNameErrorMsg: string;
   emailErrorMsg: string;
   displayName: string;
   email: string;
};

const UploadProfilePhotoContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   gap: 24px;

   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      flex-direction: row;
   }
`;

const FieldWrapper = styled.div`
   flex-grow: 1;
   width: 100%;

   span.label {
      margin-bottom: 7px;
      display: block;
      font-size: var(--font-size-body-md);
   }

   span.error-msg {
      color: red;
      font-size: var(--font-size-body-md);
      margin-top: 5px;
      display: block;
      text-align: left;
   }
`;

export default function UpdateContactInfo(props: UpdateContactInfoProps) {
   return (
      <UploadProfilePhotoContainer>
         <FieldWrapper>
            <span className="label display-name-label">Display name</span>
            <Input
               iconSrc={null}
               placeHolder={'Please enter display name'}
               hasError={props.displayNameErrorMsg.length > 0}
               inputValue={props.displayName}
               onChangeHandler={props.setDisplayName}
            />
            <span className={'error-msg'}>{props.displayNameErrorMsg}</span>
         </FieldWrapper>

         <FieldWrapper>
            <span className="label email-label">Email</span>
            <Input
               iconSrc={null}
               placeHolder={'Please enter email'}
               hasError={props.emailErrorMsg.length > 0}
               inputValue={props.email}
               onChangeHandler={props.setEmail}
               disabled={true}
            />
            <span className={'error-msg'}>{props.emailErrorMsg}</span>
         </FieldWrapper>
      </UploadProfilePhotoContainer>
   );
}
