import { styled } from 'styled-components';
import { toast } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Icon from '@components/ui/stuff/Icon.tsx';

import { CreditDebitCard as CreditDebitCardT } from '@typings/component-types/CreditDebitCard.type.ts';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import EditCreditDebitCardModal from '@components/dashboard/settings/payment-methods/EditCreditDebitCard.modal.tsx';

type CreditDebitCardProps = {
  creditDebitCardInfo: CreditDebitCardT;
  CreditDebitCardsRefetchFn: () => void;
};

const CreditDebitCardContainer = styled.div`
    background-image: url('/images/credit-debit-card-bg.svg');
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 10px 50px;
    object-fit: cover;

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
            display: flex;
            align-items: center;
            gap: 10px;

            .edit-icon {
                cursor: pointer;
            }
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
`;

export default function CreditDebitCard(props: CreditDebitCardProps) {
  const {
    creditDebitCardInfo,
    CreditDebitCardsRefetchFn
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handlers
  const onCardNumberClickHandler = () => {
    toast.success('Credit/Debit card number copied', {
      icon: <Icon iconSrc={'copy.svg'} width={'25px'} />
    });
  };

  const onEditClickHandler = () => {
    onOpen();
  };

  return (
    <CreditDebitCardContainer>
      <div className="top-section">
        <div className="left-col">
          <Icon
            iconSrc={'credit-card-chip.svg'}
            width={'32px'}
            height={'auto'}
          />
          <Icon
            iconSrc={'credit-card-signal.svg'}
            width={'16px'}
            height={'auto'}
          />
          {!creditDebitCardInfo.as_main_payment && (
            <span className={'as-main-payment'}>Main Payment</span>
          )}
        </div>
        <div className="right-col">
          <Icon
            iconSrc={'mastercard-logo-with-name.svg'}
            width={'44px'}
            height={'34px'}
          />

          <Icon
            iconSrc={'edit.svg'}
            width={'20px'}
            height={'20px'}
            className={'edit-icon'}
            onClickHandler={onEditClickHandler}
          />
        </div>
      </div>
      <div className="middle-section">
        <CopyToClipboard
          text={creditDebitCardInfo.card_number}
          onCopy={onCardNumberClickHandler}
        >
          <span className={'card-number'}>
            {creditDebitCardInfo.card_number
              .match(/.{1,4}/g)
              ?.map((cardNumber) => cardNumber + ' ')}
          </span>
        </CopyToClipboard>
      </div>
      <div className="bottom-section">
        <span className={'cardholder-name'}>
          {creditDebitCardInfo.cardholder_name}
        </span>
        <span className={'cointrackx'}>CoinTrackX</span>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Credit/Debit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditCreditDebitCardModal onClose={onClose}
                                      creditDebitCardInfo={creditDebitCardInfo}
                                      creditDebitCardRefetchFn={CreditDebitCardsRefetchFn}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </CreditDebitCardContainer>
  );
}
