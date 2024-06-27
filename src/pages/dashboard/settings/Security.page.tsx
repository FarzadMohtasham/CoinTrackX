import {styled} from 'styled-components'
import PhoneNumberInput from "@components/ui/input-fields/PhoneNumber.input.tsx";
import Icon from "@components/ui/stuff/Icon.tsx";
import {ChangeEvent, useState} from "react";
import {Switch} from "@chakra-ui/react";

const SecurityPageContainer = styled.div`
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`

const PhoneNumberWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    div.heading-wrapper {
        span.title {
            display: block;
            font-size: var(--font-size-body-md);
            font-weight: 500;
        }

        span.desc {
            display: block;
            font-size: var(--font-size-body-sm);
            font-weight: 400;
        }
    }

    div.input-wrapper {
        border: .1rem solid var(--color-black-100);
        border-radius: 1rem;
        padding: 3rem;

        span.title {
            font-size: var(--font-size-body-sm);
            font-weight: 500;
            display: block;
            margin-bottom: .8rem;
        }
    }
`

const TwoStepVerificationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    div.heading-wrapper {
        span.title {
            display: block;
            font-size: var(--font-size-body-md);
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
        gap: 3.2rem;
        border: .1rem solid var(--color-black-100);
        border-radius: 1rem;
        padding: 3rem;

        div.step2-auth-option {
            display: flex;
            justify-content: space-between;
            gap: 2rem;
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

    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        div.step2-auth-options-wrapper {
            flex-direction: column;
        }
    }
`

export default function SecurityPage() {
    const [textMessageCheckBox, setTextMessageCheckBox] = useState<boolean>()
    const [emailCheckBox, setEmailCheckBox] = useState<boolean>()

    return (
        <SecurityPageContainer>
            <PhoneNumberWrapper>
                <div className="heading-wrapper">
                    <span className={'title'}>Phone number</span>
                    <span className={'desc'}>Keep your phone number up-to-date</span>
                </div>

                <div className="input-wrapper">
                    <span className={'title'}>Phone number</span>
                    <PhoneNumberInput/>
                </div>
            </PhoneNumberWrapper>

            <TwoStepVerificationWrapper>
                <div className="heading-wrapper">
                    <span className={'title'}>Two-step verification</span>
                    <span className={'desc'}>Keep your phone number up-to-date</span>
                </div>

                <div className="step2-auth-options-wrapper">
                    <div className={'step2-auth-option text-message'}>
                        <Icon iconSrc={'text-message-with-bg.svg'} width={'40rem'}/>
                        <div className={'desc-wrapper'}>
                            <span className={'title'}>
                                Text Message
                            </span>
                            <span className={'desc'}>
                                When you sign in, you will receive OTP code to approve your login to your number <em>(+44) 5673 436 4xxx</em>
                            </span>
                        </div>
                        <Switch size='lg'
                                colorScheme={'green'}
                                isChecked={textMessageCheckBox}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setTextMessageCheckBox(e.target.checked)
                                }}/>
                    </div>

                    <div className={'step2-auth-option email'}>
                        <Icon iconSrc={'email-with-bg.svg'} width={'40rem'}/>
                        <div className={'desc-wrapper'}>
                            <span className={'title'}>
                                Email
                            </span>
                            <span className={'desc'}>
                                When you sign in, you will receive notification to approve your login on your email <em>andresamosa@mail.com</em>
                            </span>
                        </div>
                        <Switch size='lg'
                                colorScheme={'green'}
                                checked={emailCheckBox}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setEmailCheckBox(e.target.checked)
                                }}/>
                    </div>
                </div>
            </TwoStepVerificationWrapper>
        </SecurityPageContainer>
    )
}