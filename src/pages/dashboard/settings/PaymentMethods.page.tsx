import {useState} from "react";
import {styled} from "styled-components";
import Icon from "@components/ui/stuff/Icon.tsx";
import Heading from "@components/ui/stuff/Heading.tsx";
import Button from "@components/ui/stuff/Button.tsx";

type PaymentMethod = {}

const NoPaymentMethodContainer = styled.div`
    display: grid;
    place-content: center;
    height: 75vh;

    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.2rem;

        .title-desc-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .8rem;
            
            .title {
                font-weight: bold;
            }
        }
    }
`

const PaymentMethodsContainer = styled.div`

`

export default function PaymentMethodsPage() {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

    return (
        <>
            {
                paymentMethods ?
                    <NoPaymentMethodContainer className={'no-payment-methods'}>
                        <div className={'content-wrapper'}>
                            <Icon iconSrc={'payment-method-with-bg.svg'} width={'16rem'}/>
                            <div className={'title-desc-wrapper'}>
                                <Heading headingType={'h4'} className={'title'}>No Payment Methods Yet</Heading>
                                <span>Please add your payment methods.</span>
                            </div>
                            <Button icon={'plus.svg'}>
                                Add A Payment Method
                            </Button>
                        </div>
                    </NoPaymentMethodContainer>
                    :
                    <PaymentMethodsContainer>

                    </PaymentMethodsContainer>

            }
        </>
    )
}