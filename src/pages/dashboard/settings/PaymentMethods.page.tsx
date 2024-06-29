import {JSX, useState} from "react";
import {styled} from "styled-components"
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react"

import {paymentMethodOptions} from '@data/paymentMethodOptions.data.ts'

import Icon from "@components/ui/stuff/Icon.tsx"
import Heading from "@components/ui/stuff/Heading.tsx"
import Button from "@components/ui/stuff/Button.tsx"

import PaymentMethodOption from "@components/dashboard/settings/payment-methods/PaymentMethodOption.tsx"
import {PaymentMethodOptionProps, PaymentMethodTitle} from "@typings/PaymentMethodOption.type.ts"
import LinkYourCard from "@components/dashboard/settings/payment-methods/LinkYourCard.tsx";

type PaymentMethod = {}

const NoPaymentMethodContainer = styled.div`
    display: grid;
    place-content: center;
    height: 75vh;

    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        .title-desc-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;

            .title {
                font-weight: bold;
            }
        }
    }
`

const PaymentMethodsContainer = styled.div`

`

export default function PaymentMethodsPage() {
    const [paymentMethods, _] = useState<PaymentMethod[]>([])
    const [paymentMethodStep, setPaymentMethodStep] = useState<PaymentMethodTitle | null>(null)

    const {isOpen, onOpen, onClose} = useDisclosure()

    // ---------- onClick Handlers ----------
    const onModalOpenHandler = () => {
        onOpen()
    }

    const onModalCloseHandler = () => {
        onClose()
        setPaymentMethodStep(null)
    }

    return (
        <>
            {
                paymentMethods ?
                    <NoPaymentMethodContainer className={'no-payment-methods'}>
                        <div className={'content-wrapper'}>
                            <Icon iconSrc={'payment-method-with-bg.svg'} width={'160px'}/>
                            <div className={'title-desc-wrapper'}>
                                <Heading headingType={'h4'} className={'title'}>No Payment Methods Yet</Heading>
                                <span>Please add your payment methods.</span>
                            </div>
                            <Button icon={'plus.svg'} onClickHandler={onModalOpenHandler}>
                                Add A Payment Method
                            </Button>
                        </div>
                    </NoPaymentMethodContainer>
                    :
                    <PaymentMethodsContainer>

                    </PaymentMethodsContainer>
            }

            <Modal isOpen={isOpen}
                   onClose={onModalCloseHandler}
                   size={'xl'}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add A Payment Method</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {
                            paymentMethodStep === null ?
                                <>
                                    {
                                        paymentMethodOptions.map((paymentMethodOption: PaymentMethodOptionProps, index: number): JSX.Element => {
                                            return (
                                                <PaymentMethodOption {...paymentMethodOption}
                                                                     key={paymentMethodOption.title + index}
                                                                     onClick={() => setPaymentMethodStep(paymentMethodOption.title)}/>
                                            )
                                        })
                                    }
                                </>
                                :
                                <div>
                                    {
                                        paymentMethodStep === 'Credit/Debit Card' &&
                                        <LinkYourCard/>
                                    }
                                </div>
                        }
                        <br/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}