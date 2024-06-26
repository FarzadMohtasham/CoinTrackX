import {useState} from 'react';
import {styled} from 'styled-components';

import {countriesCode} from '@data/countryCode.data.ts'

type PhoneNumberInputProps = {}

const PhoneNumberInputContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-color: var(--color-gray-100);
    border-radius: .8rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;

    .country-select-wrapper {
        padding: 0 0 0 1rem;
        height: 100%;

        .country-select {
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            font-size: var(--font-size-body-sm);
        }
    }

    .separator {
        height: 70%;
        width: .2rem;
        background-color: var(--color-gray-300);
    }

    .input-field-wrapper {
        flex-grow: 1;
        height: 60%;
        padding: 0 1rem 0 0;
        display: flex;
        align-items: center;
        gap: 1rem;

        .input-field-wrapper {
            font-size: var(--font-size-body-sm);
        }

        input {
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0);
            font-size: var(--font-size-body-md);

            &::placeholder {
                font-weight: 400;
            }
        }
    }
`

export default function PhoneNumberInput(props: PhoneNumberInputProps) {
    const {} = props

    // @ts-ignore
    const [PhoneNumberInput, setPhoneNumberInput] = useState<string>()
    const [countryCode, setCountryCode] = useState<string>('+93')

    return (
        <PhoneNumberInputContainer>
            <div className={'country-select-wrapper'}>
                <select name={'country'}
                        onChange={e => setCountryCode(e.target.value)}
                        className={'country-select'}>
                    {
                        countriesCode.map(countryCode => {
                            return (
                                <option value={countryCode.code} key={countryCode.countryName}>
                                    {countryCode.countryName}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={'separator'}></div>
            <div className={'input-field-wrapper'}>
                <span>{countryCode}</span>
                <input placeholder={'Enter phone number'}/>
            </div>
        </PhoneNumberInputContainer>
    )
}





