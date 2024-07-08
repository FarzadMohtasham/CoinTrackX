import {CreditDebitCard as CreditDebitCardT} from '@typings/component-types/CreditDebitCard.type.ts'
import {styled} from 'styled-components'
import copy from 'copy-to-clipboard'
import {toast} from 'react-hot-toast'

import Icon from '@components/ui/stuff/Icon.tsx'

type CreditDebitCardProps = {
    creditDebitCardInfo: CreditDebitCardT;
}

const CreditDebitCardContainer = styled.div`
    background-color: var(--color-primary-800);
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 10px 50px;

    .top-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px 0 20px;

        .left-col {
            display: flex;
            align-items: center;
            gap: 8px;

            .as-main-payment {
                padding: 4px 6px;
                font-size: var(--font-size-body-xxsm);
                color: white;
                background-color: var(--color-white-200);
                border-radius: 2px;
            }
        }

        .right-col {
            display: grid;
            place-content: center;
        }
    }

    .middle-section {
        padding: 20px 20px 30px 20px;

        .card-number {
            color: white;
            cursor: pointer;
        }
    }

    .bottom-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-black-100);
        padding: 16px 20px;
        border-radius: 0 0 12px 12px;

        .cardholder-name {
            color: white;
            font-weight: 400;
        }

        .cointrackx {
            color: white;
            font-size: var(--font-size-body-xsm);
        }
    }
`

export default function CreditDebitCard(props: CreditDebitCardProps) {
    const {
        creditDebitCardInfo,
    } = props

    const onCardNumberClickHandler = () => {
        copy(creditDebitCardInfo.card_number, {
            onCopy: () => toast.success('Card number copied'),
        })
    }

    return (
        <CreditDebitCardContainer>
            <div className="top-section">
                <div className="left-col">
                    <Icon iconSrc={'credit-card-chip.svg'}
                          width={'32px'}
                          height={'auto'}
                    />
                    <Icon iconSrc={'credit-card-signal.svg'}
                          width={'16px'}
                          height={'auto'}
                    />
                    {
                        !creditDebitCardInfo.as_main_payment &&
                        <span className={'as-main-payment'}>Main Payment</span>
                    }
                </div>
                <div className="right-col">
                    <Icon iconSrc={'mastercard-logo-with-name.svg'}
                          width={'44px'}
                          height={'34px'}
                    />
                </div>
            </div>
            <div className="middle-section">
                <span className={'card-number'}
                      onClick={onCardNumberClickHandler}>
                    {
                        creditDebitCardInfo.card_number.match(/.{1,4}/g)?.map((cardNumber) => cardNumber + ' ')
                    }
                </span>
            </div>
            <div className="bottom-section">
                <span className={'cardholder-name'}>{creditDebitCardInfo.cardholder_name}</span>
                <span className={'cointrackx'}>CoinTrackX</span>
            </div>
        </CreditDebitCardContainer>
    )
}





