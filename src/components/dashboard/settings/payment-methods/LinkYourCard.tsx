import {useEffect, useState} from 'react'
import {styled} from 'styled-components'

import Input from '@components/ui/input-fields/InputField.input.tsx'
import Button from '@components/ui/stuff/Button.tsx'
import Icon from '@components/ui/stuff/Icon.tsx'
import CheckboxInput from '@components/ui/input-fields/Checkbox.input.tsx'

import {InputFieldValidator} from '@validations/InputField.validator.ts'

import {InputFieldValidatorResult} from '@typings/validator-types/Input.validator.type.ts'
import CardNumberInput from "@components/ui/input-fields/CardNumber.input.tsx"
import {CardNumberProvider} from "@typings/component-types/CardNumberInput.type.ts"
import SimpleNotification from "@components/ui/notifs/Simple-Notification.notif.tsx"
import {NotificationOptions} from "@typings/component-types/Notification.type.ts"

const LinkYouCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    div.cardholder-name-wrapper {
        .label {
            font-size: var(--font-size-body-sm);
            font-weight: 500;
            display: block;
            margin-bottom: var(--spacing-xsm);
        }
    }

    div.set-as-main-payment-wrapper {
        span {

        }
    }

    div.agree-terms-wrapper {
        span {
            font-size: var(--font-size-body-sm);
        }
    }

    div.add-card-btn-wrapper {
        display: flex;
        align-items: center;
        gap: 16px;
    }
`

const RowWrapper = styled.div`

`

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
}

export default function LinkYourCard() {
    const [cardholderNameErrorMsg, setCardholderNameErrorMsg] = useState<string>('')

    const [cardholderName, setCardholderName] = useState<string>('')
    const [hasFieldsError, setFieldsHasError] = useState(true);

    const [__, setCardNumber] = useState<string>('')
    const [cardNumberIsValid, setCardNumberIsValid] = useState<boolean>(false)
    const [creditCardProvider, setCreditCardProvider] = useState<CardNumberProvider | ''>('')

    const [_, setAsMainPaymentMethods] = useState<boolean>(false)

    // ---------- Input Validations ----------
    useEffect(function cardholderNameValidator() {
        InputFieldValidator({
            fieldName: 'Cardholder Name',
            minLength: 1,
            maxLength: 40,
            inputValue: cardholderName,
        }).then((result: InputFieldValidatorResult) => {
            setFieldsHasError(!result.isValid)
            setCardholderNameErrorMsg(result.errorMessage)
        })
    }, [cardholderName])

    return (
        <LinkYouCardContainer>
            <SimpleNotification options={simpleNotifOptions}/>
            <RowWrapper className={'cardholder-name-wrapper'}>
                <span className={'label'}>Cardholder name</span>
                <Input placeHolder={'Enter your Cardholder name'}
                       label={'cardholder-name'}
                       iconSrc={null}
                       onChangeHandler={setCardholderName}
                       errorMessage={cardholderNameErrorMsg}
                       unAllowedErrorMessages={['Cardholder Name is a required field']}
                />
            </RowWrapper>
            <RowWrapper className={'card-number'}>
                <CardNumberInput cardNumberSetterFn={setCardNumber}
                                 cardNumberHasErrorSetterFn={setCardNumberIsValid}
                                 creditCardProviderSetterFn={setCreditCardProvider}
                />
            </RowWrapper>
            <RowWrapper className={''}></RowWrapper>
            <RowWrapper className={'set-as-main-payment-wrapper'}>
                <CheckboxInput label={'Set as a main payment'}
                               checkBoxSetter={setAsMainPaymentMethods}
                />
            </RowWrapper>
            <RowWrapper className={'agree-terms-wrapper'}>
                <span>By adding a new card, you agree to our terms.</span>
            </RowWrapper>
            <RowWrapper className={'add-card-btn-wrapper'}>
                <Button disabled={hasFieldsError || cardNumberIsValid || creditCardProvider === ''}>
                    Add Card
                </Button>
                <Icon iconSrc={'processed-by-cointrackx.svg'} width={'160px'} height={'auto'}/>
            </RowWrapper>
        </LinkYouCardContainer>
    )
}