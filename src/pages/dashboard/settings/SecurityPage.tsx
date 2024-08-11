import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';
import { Switch, Tooltip } from '@chakra-ui/react';

import PhoneNumberInput from '@components/ui/inputFields/PhoneNumber.input.tsx';
import Icon from '@components/ui/stuff/Icon.tsx';
import Heading from '@/components/ui/stuff/Heading';

const SecurityPageContainer = styled.div`
   padding: 15px;
   display: flex;
   flex-direction: column;
   gap: 30px;
`;

const PhoneNumberWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;

   div.heading-wrapper {
      .title {
         font-weight: 500;
      }

      span.desc {
         display: block;
         font-size: var(--font-size-body-sm);
         font-weight: 400;
      }
   }

   div.input-wrapper {
      border: 1px solid var(--color-black-100);
      border-radius: 10px;
      padding: 20px;

      span.input-title {
         font-size: var(--font-size-body-sm);
         font-weight: 500;
         display: block;
         margin-bottom: 8px;
      }
   }
`;

const TwoStepVerificationWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;

   div.heading-wrapper {
      .title {
         font-weight: 500;
      }

      span.desc {
         display: block;
         font-size: var(--font-size-body-sm);
         font-weight: 400;
      }
   }

   div.step2-auth-options-wrapper {
      display: flex;
      flex-direction: row;
      gap: 32px;
      border: 1px solid var(--color-black-100);
      border-radius: 10px;
      padding: 20px;

      div.step2-auth-option {
         display: flex;
         justify-content: space-between;
         gap: 20px;
         align-items: center;
         flex-grow: 1;

         div.desc-wrapper {
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            span.title {
               font-size: var(--font-size-body-sm);
               font-weight: bold;
            }

            span.desc {
               font-size: var(--font-size-body-xsm);
               color: var(--color-gray-800);
            }
         }
      }
   }

   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      div.step2-auth-options-wrapper {
         flex-direction: column;
      }
   }
`;

export default function SecurityPage() {
   const [, setPhoneNumber] = useState<string>('');
   const [textMessageCheckBox, setTextMessageCheckBox] = useState<boolean>();
   const [emailCheckBox, setEmailCheckBox] = useState<boolean>();

   return (
      <SecurityPageContainer>
         <PhoneNumberWrapper>
            <div className="heading-wrapper">
               <Heading tagName="h6" className={'title'}>
                  Phone number
               </Heading>
               <span className={'desc'}>Keep your phone number up-to-date</span>
            </div>

            <div className="input-wrapper">
               <span className={'input-title'}>Phone number</span>
               <PhoneNumberInput dispatchFn={setPhoneNumber} />
            </div>
         </PhoneNumberWrapper>

         <TwoStepVerificationWrapper>
            <div className="heading-wrapper">
               <Heading tagName="h6" className={'title'}>
                  Two-step verification
               </Heading>
               <span className={'desc'}>Keep your phone number up-to-date</span>
            </div>

            <div className="step2-auth-options-wrapper">
               <div className={'step2-auth-option text-message'}>
                  <Icon iconSrc={'text-message-with-bg.svg'} width={'40px'} />
                  <div className={'desc-wrapper'}>
                     <span className={'title'}>Text Message</span>
                     <span className={'desc'}>
                        When you sign in, you will receive OTP code to approve
                        your login to your number <em>(+44) 5673 436 4xxx</em>
                     </span>
                  </div>
                  <Tooltip label="Not available yet!">
                     <div>
                        <Switch
                           size="md"
                           colorScheme={'green'}
                           isChecked={textMessageCheckBox}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setTextMessageCheckBox(e.target.checked);
                           }}
                           disabled
                        />
                     </div>
                  </Tooltip>
               </div>

               <div className={'step2-auth-option email'}>
                  <Icon iconSrc={'email-with-bg.svg'} width={'40px'} />
                  <div className={'desc-wrapper'}>
                     <span className={'title'}>Email</span>
                     <span className={'desc'}>
                        When you sign in, you will receive notification to
                        approve your login on your email{' '}
                        <em>andresamosa@mail.com</em>
                     </span>
                  </div>
                  <Tooltip label="Not available yet!">
                     <div>
                        <Switch
                           size="md"
                           colorScheme={'green'}
                           checked={emailCheckBox}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setEmailCheckBox(e.target.checked);
                           }}
                           disabled
                        />
                     </div>
                  </Tooltip>
               </div>
            </div>
         </TwoStepVerificationWrapper>
      </SecurityPageContainer>
   );
}
