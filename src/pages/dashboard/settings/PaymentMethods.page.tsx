import {useState} from "react";
import {styled} from "styled-components";
import Icon from "@components/ui/stuff/Icon.tsx";

type PaymentMethod = {}

const NoPaymentMethodContainer = styled.div`
    display: grid;
    place-content: center;
`

const PaymentMethodsContainer = styled.div`

`

export default function PaymentMethodsPage() {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod>()

    return (
        <>
            {
                paymentMethods ?
                    <NoPaymentMethodContainer className={'no-payment-methods'}>
                        <Icon iconSrc={''} width={'1.6rem'}/>
                    </NoPaymentMethodContainer>
                    :
                    <PaymentMethodsContainer>

                    </PaymentMethodsContainer>

            }
        </>
    )
}