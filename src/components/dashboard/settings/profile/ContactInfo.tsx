import { styled } from 'styled-components';
import Heading from '@/Components/UI/Stuff/Heading';
import UploadProfilePhoto from '@/Components/Dashboard/Settings/Profile/ContactInfo_UploadProfilePhoto';
import UpdateContactInfo from '@/Components/Dashboard/Settings/Profile/ContactInfo_UpdateContactInfo';
import Button from '@/Components/UI/Stuff/Button';
import { useEffect, useState } from 'react';
import { contactInputSchema } from '@/Libs/Schemas/contactInput.schema';
import { ValidationError } from 'yup';
import useUser from '@/Libs/Hooks/useUser';

type ValidationErrorT = {
   inner?: ValidationError[];
};

const ContactInfoContainer = styled.div`
   border-radius: 8px;
   border: 1px solid var(--color-black-100);
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

const ContentWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 32px;
`;

const LeftCol = styled.div`
   padding-top: 32px;

   span.description {
      color: var(--color-black-700);
      font-size: var(--font-size-body-sm);
   }
`;

const RightCol = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   gap: 32px;
`;

const ActionsContainer = styled.div`
   display: flex;
   gap: 12px;
`;

// Constants
const defaultMinChangesNumber = 3;

export default function ContactInfo() {
   const user = useUser();
   const defaultContactInfo = {
      displayName: user?.user.confirmed_at || '',
      email: user?.user.email || '',
   };

   const [displayName, setDisplayName] = useState<string>(
      () => defaultContactInfo.displayName,
   );
   const [email, setEmail] = useState<string>(() => defaultContactInfo.email);
   const [profileImageFile, setProfileImageFile] = useState<File | undefined>();

   const [displayNameErrorMsg, setDisplayNameErrorMsg] = useState<string>('');
   const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

   const [changes, setChanges] = useState<number>(0);

   // Constants
   const fieldsAreValid: boolean = !!(displayNameErrorMsg || emailErrorMsg);

   // Handlers
   const handleResetChangesClick = () => {
      setDisplayName(defaultContactInfo.displayName);
      setEmail(defaultContactInfo.email);
   };

   const resetErrorMessages = () => {
      setDisplayNameErrorMsg('');
      setEmailErrorMsg('');
   };

   const saveChangesClick = async () => {};

   // Validation process of user inputs
   useEffect(() => {
      const runValidation = async () => {
         try {
            await contactInputSchema.validate(
               {
                  displayName,
                  email,
               },
               { abortEarly: false },
            );
            resetErrorMessages();
         } catch (e: unknown) {
            if (!e) return;

            const error: ValidationErrorT = e;
            let displayNameFieldError = null;
            let emailFieldError = null;

            const innerError = error.inner || [];
            innerError.map((err: ValidationError) => {
               switch (err.path) {
                  case 'displayName':
                     displayNameFieldError = err.message;
                     break;
                  case 'email':
                     emailFieldError = err.message;
                     break;
               }
            });

            if (displayNameFieldError)
               setDisplayNameErrorMsg(displayNameFieldError);
            else setDisplayNameErrorMsg('');

            if (emailFieldError) setEmailErrorMsg(emailFieldError);
            else setEmailErrorMsg('');
         }
      };

      runValidation().then();
   }, [displayName, email]);
   // Update Changes in every input change
   useEffect(() => {
      setChanges((prevChanges) => prevChanges + 1);
   }, [displayName, email, profileImageFile]);

   return (
      <ContactInfoContainer>
         {changes}
         <ContentWrapper>
            <LeftCol>
               <Heading tagName={'h6'}>Contact Info</Heading>
               <span className={'description'}>Manage your information</span>
            </LeftCol>

            <RightCol>
               <UploadProfilePhoto
                  imageFile={profileImageFile}
                  setImageFile={setProfileImageFile}
               />
               <UpdateContactInfo
                  email={email}
                  setEmail={setEmail}
                  displayName={displayName}
                  setDisplayName={setDisplayName}
                  displayNameErrorMsg={displayNameErrorMsg}
                  emailErrorMsg={emailErrorMsg}
               />
            </RightCol>
         </ContentWrapper>

         {changes >= defaultMinChangesNumber && (
            <ActionsContainer>
               <Button
                  disabled={fieldsAreValid}
                  onClickHandler={saveChangesClick}
               >
                  Save Changes
               </Button>
               <Button outline={true} onClickHandler={handleResetChangesClick}>
                  Reset Changes
               </Button>
            </ActionsContainer>
         )}
      </ContactInfoContainer>
   );
}
