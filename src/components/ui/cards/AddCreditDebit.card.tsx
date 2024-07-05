import {styled} from "styled-components";
import Icon from "@components/ui/stuff/Icon.tsx";

type AddCreditDebitCardProps = {
    onClick: () => void;
    containerText?: string;
}

const AddCreditDebitCardContainer = styled.div`
    display: grid;
    place-content: center;
    border-radius: 12px;
    border: 2px solid var(--color-black-100);
    cursor: pointer;
    
    .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        
        span {
            font-size: var(--font-size-body-md);
            color: var(--color-primary);
        }
    }
`

export default function AddCreditDebitCard(props: AddCreditDebitCardProps) {
    return (
        <AddCreditDebitCardContainer onClick={props.onClick}>
            <div className={'wrapper'}>
                <Icon iconSrc={'plus-with-border.svg'}
                      width={'40px'}
                      height={'40px'}
                />
                <span className={'add-a-payment-method'}>
                    {props.containerText || 'Add a Credit/Debit Payment Card'}
                </span>
            </div>
        </AddCreditDebitCardContainer>
    )
}