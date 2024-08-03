import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryClient } from '@Configs/ReactQuery/queryClient';

import Input from '@Components/UI/InputFields/InputField.input';
import Button from '@Components/UI/Stuff/Button';
import Icon from '@Components/UI/Stuff/Icon';
import CheckboxInput from '@Components/UI/InputFields/Checkbox.input';
import SimpleNotification from '@Components/UI/Notifications/Simple-Notification.notif';
import CardNumberInput from '@Components/UI/InputFields/CardNumber.input';
import CreditCardExpInput from '@Components/UI/InputFields/CreditCardExp.input';
import CreditCardCVVInput from '@Components/UI/InputFields/CreditCardCVV.input';
import PostalCodeInput from '@Components/UI/InputFields/PostalCode.input';

import { InputFieldValidator } from '@Validations/InputField.validator';

import useUser from '@Hooks/useUser';
import { InputFieldValidatorResult } from '@Typings/Validator/Input.validator.type';
import { CardNumberProvider } from '@Typings/Components/CardNumberInput.type';
import { NotificationOptions } from '@Typings/Components/Notification.type';
import { createCreditDebitCard } from '@Services/APIs/payment-methods/creditDebitPayments.api';
import { CreditDebitCard } from '@Typings/Components/CreditDebitCard.type';

type CreditDebitCardModalProps = {
   onClose: () => void;
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

export default function AddCreditDebitCardModal(
   props: CreditDebitCardModalProps,
) {
   const [cardholderNameErrorMsg, setCardholderNameErrorMsg] =
      useState<string>('');

   const [cardholderName, setCardholderName] = useState<string>('');
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

   const user: AuthResponse | null = useUser();

   const { mutate, isPending } = useMutation({
      mutationFn: createCreditDebitCard,
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ['getCreditDebitCards'],
         });
         toast.success('New credit/debit card added');
         props.onClose();
      },
      onError: ({ code: errorCode }: { code: string }) => {
         switch (errorCode) {
            case '23505':
               toast.error(
                  "You can't create credit/debit card with the same card number!",
               );
               break;
            default:
               toast.error('Unknown error, Please try again');
         }
      },
   });

   const cardInfo = {
      email: user?.user.email || '',
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
            inputValue: cardholderName,
         }).then((result: InputFieldValidatorResult) => {
            setHasCardHolderNameInputError(!result.isValid);
            setCardholderNameErrorMsg(result.errorMessage);
         });
      },
      [cardholderName],
   );

   // ---------- Handlers ----------
   const onAddCreditDebitCardHandler = () => {
      mutate(cardInfo);
   };

   return (
      <LinkYouCardContainer>
         <SimpleNotification options={simpleNotifOptions} />
         <RowWrapper className={'cardholder-name-wrapper'}>
            <span className={'label'}>Cardholder name</span>
            <Input
               placeHolder={'Enter your Cardholder name'}
               label={'cardholder-name'}
               iconSrc={null}
               inputValue={cardholderName}
               onChangeHandler={setCardholderName}
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
            />
         </RowWrapper>
         <div className={'credit-card-other-inputs'}>
            <RowWrapper className={'Expiration'}>
               <span className={'label'}>Expiration</span>
               <CreditCardExpInput
                  creditCardExpSetterFn={setCardExpInput}
                  creditCardExpErrorMsgSetterFn={setCardExpInputErrorMsg}
                  maxLength={5}
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
               />
               <span className={'error-msg'}>{postalInputErrorMsg}</span>
            </RowWrapper>
         </div>
         <RowWrapper className={'set-as-main-payment-wrapper'}>
            <CheckboxInput
               label={'Set as a main payment'}
               checkBoxSetter={setAsMainPaymentMethods}
            />
         </RowWrapper>
         <RowWrapper className={'agree-terms-wrapper'}>
            <span className={'agree-terms'}>
               By adding a new card, you agree to our terms.
            </span>
         </RowWrapper>
         <RowWrapper className={'add-card-btn-wrapper'}>
            <Button
               disabled={buttonDisabled}
               isLoading={isPending}
               onClickHandler={onAddCreditDebitCardHandler}
            >
               Add Card
            </Button>
            <Icon
               iconSrc={'processed-by-cointrackx.svg'}
               width={'160px'}
               height={'auto'}
            />
         </RowWrapper>
      </LinkYouCardContainer>
   );
}
