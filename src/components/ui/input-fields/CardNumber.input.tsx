import React, {JSX, useEffect, useState} from 'react'
import {styled} from 'styled-components'

import {checkCardProvider, formatCardNumber} from "@utils/helpers.ts";
import Icon from "@components/ui/stuff/Icon.tsx";
import {CardNumberProvider} from "@typings/component-types/CardNumberInput.type.ts";

type CardNumberProps = {
    setterFn: (value: string) => void;
    disabled?: boolean;
    separated?: boolean;
}

const CardNumberInputContainer = styled.div`
    background-color: var(--color-gray-100);
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 52px;

    input {
        width: 100%;
        background-color: rgba(0, 0, 0, 0);

        &::placeholder {
            color: var(--color-gray-300);
        }
    }
`

const CreditProvidersWrapper = styled.div<{ $creditCardProvider: CardNumberProvider | '' }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    margin-right: 10px;

    .visa-icon {
        opacity: ${props => props.$creditCardProvider === 'Visa' ? '1' : '.25'};
    }

    .mastercard-icon {
        opacity: ${props => props.$creditCardProvider === 'MasterCard' ? '1' : '.25'};
    }
`

export default function CardNumberInput(props: CardNumberProps): JSX.Element {
    const {
        setterFn,
        // separated = true,
        // disabled = false,
    } = props

    const [inputValue, setInputValue] = useState<string>('');
    const [creditCardProvider, setCreditCardProvider] = useState<'Visa' | 'MasterCard' | ''>('');
    const [inputHasError, _] = useState<boolean>(false);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        if (value.length !== 1) {
            const formatedValue: string = formatCardNumber(value)
            setInputValue(formatedValue)
            return
        }

        setInputValue(value)
    }

    // Update inputValue on parent component
    useEffect(() => {
        setterFn(inputValue)
    }, [])

    // Update credit card provider
    useEffect(() => {
        setCreditCardProvider('')

        if (inputValue.length !== 19 || inputHasError) return
        const cardProvider = checkCardProvider(inputValue.split(' ').join(''))
        console.log(cardProvider)
        setCreditCardProvider(cardProvider || '')
    }, [inputValue]);

    return (
        <CardNumberInputContainer>
            <input value={inputValue}
                   onChange={onInputChange}
                   maxLength={19}
                   placeholder="XXXX XXXX XXXX XXXX"
            />
            <CreditProvidersWrapper className={'credit-provider-icons'}
                                    $creditCardProvider={creditCardProvider}>
                <Icon iconSrc="visa-logo.svg"
                      iconAlt="visa icon"
                      className={'visa-icon'}
                      width={'36px'}
                      height={'auto'}
                />

                <Icon iconSrc="master-card-logo.svg"
                      iconAlt="mastercard icon"
                      className={'mastercard-icon'}
                      width={'36px'}
                      height={'auto'}
                />
            </CreditProvidersWrapper>
        </CardNumberInputContainer>
    )
}