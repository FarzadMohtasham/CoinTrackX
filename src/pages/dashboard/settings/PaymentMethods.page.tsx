import {JSX, useState} from "react"
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
import {useCreditDebitStore} from "@services/store/payment-methods/creditDebitCard.store.ts"
import CreditDebitCard from "@components/ui/cards/CreditDebit.card.tsx"
import {CreditDebitCard as CreditDebitCardT} from '@typings/component-types/CreditDebitCard.type'
import CreditDebitCardModal from "@components/dashboard/settings/payment-methods/CreditDebitCardModal.tsx";
import AddCreditDebitCard from "@components/ui/cards/AddCreditDebit.card.tsx";

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

    .creditDebitCards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 25px;
        width: 100%;
        padding: 30px;
    }
`

export function Component() {
    const {creditDebitCards} = useCreditDebitStore()
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
                !creditDebitCards ?
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
                        {
                            creditDebitCards &&
                            <div className="creditDebitCards">
                                {
                                    creditDebitCards.map((creditDebitCard: CreditDebitCardT, index: number) => {
                                        return (
                                            <CreditDebitCard key={creditDebitCard.cardholder_name + index}
                                                             creditDebitCardInfo={creditDebitCard}/>
                                        )
                                    })
                                }
                                <AddCreditDebitCard onClick={onOpen}/>
                            </div>
                        }
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
                                        <CreditDebitCardModal/>
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
