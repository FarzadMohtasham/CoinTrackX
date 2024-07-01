import {useEffect, useState} from 'react'
import {styled} from 'styled-components'

import Input from '@components/ui/input-fields/InputField.input.tsx'
import Button from '@components/ui/stuff/Button.tsx'
import Icon from '@components/ui/stuff/Icon.tsx'
import CheckboxInput from '@components/ui/input-fields/Checkbox.input.tsx'

import {InputFieldValidator} from '@validations/InputField.validator.ts'

import {InputFieldValidatorResult} from '@typings/validator-types/Input.validator.type.ts'
import CardNumberInput from "@components/ui/input-fields/CardNumber.input.tsx";

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

export default function LinkYourCard() {
    const [cardholderName, setCardholderName] = useState<string>('')
    const [cardholderNameErrorMsg, setCardholderNameErrorMsg] = useState<string>('')

    const [__, setCardNumber] = useState<string>('')

    const [_, setAsMainPaymentMethods] = useState<boolean>(false)

    const [hasFieldsError, setFieldsHasError] = useState(true);

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
                <CardNumberInput setterFn={setCardNumber}/>
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
                <Button disabled={hasFieldsError}>
                    Add Card
                </Button>
                <Icon iconSrc={'processed-by-cointrackx.svg'} width={'160px'} height={'auto'}/>
            </RowWrapper>
        </LinkYouCardContainer>
    )
}