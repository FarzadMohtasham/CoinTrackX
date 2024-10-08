import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { toast } from 'react-hot-toast';
import { PostgrestError } from '@supabase/supabase-js';

import Input from '@components/ui/inputFields/InputField.input.tsx';
import Button from '@components/ui/stuff/Button.tsx';
import Icon from '@components/ui/stuff/Icon.tsx';
import CheckboxInput from '@components/ui/inputFields/Checkbox.input.tsx';
import CreditCardExpInput from '@components/ui/inputFields/CreditCardExp.input.tsx';
import CreditCardCVVInput from '@components/ui/inputFields/CreditCardCVV.input.tsx';
import PostalCodeInput from '@components/ui/inputFields/PostalCode.input.tsx';
import SimpleNotification from '@components/ui/notifications/SimpleNotification.notif';
import CardNumberInput from '@components/ui/inputFields/CardNumber.input.tsx';

import { InputFieldValidatorResult } from '@typings/validator/Input.validator.type.ts';
import { CardNumberProvider } from '@typings/components/CardNumberInput.type.ts';
import { NotificationOptions } from '@typings/components/Notification.type.ts';
import { CreditDebitCard } from '@typings/components/CreditDebitCard.type.ts';
import {
   deleteCreditDebitCard,
   updateCreditDebitCard,
} from '@services/apis/payment-methods/creditDebitPayments.api.ts';

import { InputFieldValidator } from '@validations/InputField.validator.ts';

import { queryClient } from '@configs/react-query/queryClient.tsx';

import { useRouteLoaderData } from 'react-router-dom';
import { DashboardPageLoaderResponse } from '@/layouts/Dashboard.layout';
import { InputValue } from '@/libs/typings/components/InputFieldProps.type';

type EditCreditDebitCardModalProps = {
   onClose: () => void;
   creditDebitCardInfo: CreditDebitCard;
};

const LinkYouCardContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;

   .credit-card-other-inputs {
      display: flex;
      gap: 15px;
   }

   div.add-card-btn-wrapper {
      display: flex;
      align-items: center;
      gap: 16px;
   }
`;

const RowWrapper = styled.div`
   span {
      font-size: var(--font-size-body-sm);
      font-weight: bold;
      display: block;
      margin-bottom: var(--spacing-xsm);
   }

   span.agree-terms {
      font-weight: 500;
   }
`;

const simpleNotifOptions: NotificationOptions = {
   id: 0,
   createdAt: null,
   title: 'Read me!',
   message: 'Credit card provider(CCP) should be MasterCard or Visa.',
   closable: true,
   height: 'min-content',
   type: 'info',
   iconSize: '30px',
   closeIconSize: '12px',
};

export default function EditCreditDebitCardModal(
   props: EditCreditDebitCardModalProps,
) {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;

   const { creditDebitCardInfo, onClose } = props;

   const [cardholderNameErrorMsg, setCardholderNameErrorMsg] =
      useState<string>();

   const [cardholderName, setCardholderName] = useState<string>();
   const [hasCardHolderNameInputError, setHasCardHolderNameInputError] =
      useState(true);

   const [cardNumber, setCardNumber] = useState<string>('');
   const [cardNumberHasValid, setCardNumberHasValid] = useState<boolean>(false);
   const [creditCardProvider, setCreditCardProvider] = useState<
      CardNumberProvider | ''
   >('');

   const [cardExpInput, setCardExpInput] = useState<string>('');
   const [cardExpInputErrorMsg, setCardExpInputErrorMsg] = useState<
      string | null
   >('');

   const [cardCVVInput, setCardCVVInput] = useState<string>('');
   const [cardCVVInputErrorMsg, setCardCVVInputErrorMsg] = useState<
      string | null
   >('');

   const [postalInput, setPostalInput] = useState<string>('');
   const [postalInputErrorMsg, setPostalInputErrorMsg] = useState<
      string | null
   >('');

   const [asMainPaymentMethod, setAsMainPaymentMethods] =
      useState<boolean>(false);

   const [actionButtonsDisabled, setActionButtonsDisabled] = useState(false);

   const cardInfo = {
      email: user?.email,
      cardholder_name: cardholderName,
      card_provider: creditCardProvider,
      card_number: cardNumber,
      exp: cardExpInput,
      cvv: cardCVVInput,
      postal_code: postalInput,
      as_main_payment: asMainPaymentMethod,
   } as CreditDebitCard;

   const buttonDisabled =
      hasCardHolderNameInputError ||
      typeof cardExpInputErrorMsg === 'string' ||
      typeof cardCVVInputErrorMsg === 'string' ||
      typeof postalInputErrorMsg === 'string' ||
      cardNumberHasValid;

   // ---------- Input Validations ----------
   useEffect(
      function cardholderNameValidator() {
         InputFieldValidator({
            fieldName: 'Cardholder Name',
            minLength: 1,
            maxLength: 40,
            inputValue: cardholderName || '',
         }).then((result: InputFieldValidatorResult) => {
            setHasCardHolderNameInputError(!result.isValid);
            setCardholderNameErrorMsg(result.errorMessage);
         });
      },
      [cardholderName],
   );

   // ---------- Handlers ----------
   const onEditCreditDebitCardHandler = async () => {
      setActionButtonsDisabled(true);
      try {
         await updateCreditDebitCard(creditDebitCardInfo.id, cardInfo);
         queryClient.invalidateQueries({
            queryKey: ['getCreditDebitCards'],
         });
         toast.success('Credit/Debit Card Updated');
         onClose();
      } catch (e: PostgrestError | any) {
         toast.error(e.message);
      } finally {
         setActionButtonsDisabled(false);
      }
   };

   const onCreditDebitCardDelete = async () => {
      setActionButtonsDisabled(true);
      try {
         await deleteCreditDebitCard(creditDebitCardInfo.id);
         queryClient.invalidateQueries({
            queryKey: ['getCreditDebitCards'],
         });
         toast.success('Credit/Debit Card Removed');
         onClose();
      } catch (e: PostgrestError | any) {
         toast.error(e.message);
      } finally {
         setActionButtonsDisabled(false);
      }
   };

   return (
      <LinkYouCardContainer>
         <SimpleNotification options={simpleNotifOptions} />
         <RowWrapper className={'cardholder-name-wrapper'}>
            <span className={'label'}>Cardholder name</span>
            <Input
               placeHolder={'Enter your Cardholder name'}
               iconSrc={null}
               inputValue={
                  cardholderName || creditDebitCardInfo.cardholder_name
               }
               onChangeHandler={(inputVal: InputValue) =>
                  setCardholderName(String(inputVal))
               }
               errorMessage={cardholderNameErrorMsg}
               unAllowedErrorMessages={['Cardholder Name is a required field']}
            />
         </RowWrapper>
         <RowWrapper className={'card-number'}>
            <span className={'label'}>Card number</span>
            <CardNumberInput
               cardNumberSetterFn={setCardNumber}
               cardNumberHasErrorSetterFn={setCardNumberHasValid}
               creditCardProviderSetterFn={setCreditCardProvider}
               initialValue={creditDebitCardInfo.card_number}
            />
         </RowWrapper>
         <div className={'credit-card-other-inputs'}>
            <RowWrapper className={'Expiration'}>
               <span className={'label'}>Expiration</span>
               <CreditCardExpInput
                  creditCardExpSetterFn={setCardExpInput}
                  creditCardExpErrorMsgSetterFn={setCardExpInputErrorMsg}
                  maxLength={5}
                  initialValue={creditDebitCardInfo.exp}
               />
               {cardExpInputErrorMsg !== null &&
                  cardExpInputErrorMsg.length !== 0 && (
                     <span className={'error-msg'}>{cardExpInputErrorMsg}</span>
                  )}
            </RowWrapper>
            <RowWrapper className={'CVV'}>
               <span className={'label'}>CVV</span>
               <CreditCardCVVInput
                  creditCardCVVSetterFn={setCardCVVInput}
                  creditCardCVVErrorMsgSetterFn={setCardCVVInputErrorMsg}
                  placeholder={'3-digit number'}
                  maxLength={3}
                  initialValue={creditDebitCardInfo.cvv}
               />
               {<span className={'error-msg'}>{cardCVVInputErrorMsg}</span>}
            </RowWrapper>
            <RowWrapper className={'Postal code'}>
               <span className={'postal-code'}>Postal code</span>
               <PostalCodeInput
                  postalSetterFn={setPostalInput}
                  postalErrorMsgSetterFn={setPostalInputErrorMsg}
                  placeholder={'Postal'}
                  maxLength={10}
                  initialValue={creditDebitCardInfo.postal_code}
               />
               <span className={'error-msg'}>{postalInputErrorMsg}</span>
            </RowWrapper>
         </div>
         <RowWrapper className={'set-as-main-payment-wrapper'}>
            <CheckboxInput
               label={'Set as a main payment'}
               checkBoxSetter={setAsMainPaymentMethods}
               defaultValue={creditDebitCardInfo.as_main_payment}
            />
         </RowWrapper>
         <RowWrapper className={'agree-terms-wrapper'}>
            <span className={'agree-terms'}>
               By adding a new card, you agree to our terms.
            </span>
         </RowWrapper>
         <RowWrapper className={'add-card-btn-wrapper'}>
            <Button
               disabled={buttonDisabled || actionButtonsDisabled}
               onClickHandler={onEditCreditDebitCardHandler}
            >
               Save changes
            </Button>
            <Button
               disabled={actionButtonsDisabled}
               variant={'danger'}
               outline={true}
               onClickHandler={onCreditDebitCardDelete}
            >
               Delete Card
            </Button>
         </RowWrapper>
         <RowWrapper>
            <Icon
               iconSrc={'processed-by-cointrackx.svg'}
               width={'160px'}
               height={'auto'}
            />
         </RowWrapper>
      </LinkYouCardContainer>
   );
}
