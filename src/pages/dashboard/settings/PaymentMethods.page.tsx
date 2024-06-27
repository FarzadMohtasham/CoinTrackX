import {useState} from "react";
import {styled} from "styled-components";
import Icon from "@components/ui/stuff/Icon.tsx";
import Heading from "@components/ui/stuff/Heading.tsx";
import Button from "@components/ui/stuff/Button.tsx";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";

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
    const {isOpen, onOpen, onClose} = useDisclosure()

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
                            <Button icon={'plus.svg'} onClickHandler={() => onOpen()}>
                                Add A Payment Method
                            </Button>
                        </div>
                    </NoPaymentMethodContainer>
                    :
                    <PaymentMethodsContainer>

                    </PaymentMethodsContainer>
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Modal body
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}