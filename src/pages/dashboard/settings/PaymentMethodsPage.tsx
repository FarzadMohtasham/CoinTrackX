import React, { JSX, useState } from 'react';
import { styled } from 'styled-components';
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';

import { paymentMethodOptions } from '@data/paymentMethodOptions.data.ts';

import Icon from '@components/ui/stuff/Icon.tsx';
import Heading from '@components/ui/stuff/Heading.tsx';
import Button from '@components/ui/stuff/Button.tsx';

import PaymentMethodOptionComponent from '@components/dashboard/settings/paymentMethods/PaymentMethodOption.component.tsx';
import {
   PaymentMethodOptionProps,
   PaymentMethodTitle,
} from '@typings/PaymentMethodOption.type.ts';
import CreditDebitCard from '@components/ui/cards/CreditDebit.card.tsx';
import { CreditDebitCard as CreditDebitCardT } from '@typings/components/CreditDebitCard.type.ts';
import AddCreditDebitCardModal from '@components/dashboard/settings/paymentMethods/AddCreditDebitCard.modal.tsx';
import AddCreditDebitCard from '@components/ui/cards/AddCreditDebit.card.tsx';
import useGetCreditDebitCardsQuery from '@queries/paymentMethods/useGetCreditDebitCards.query.ts';
import { AnimatePresence, motion } from 'framer-motion';

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
`;

const PaymentMethodsContainer = styled.div`
   .creditDebitCards {
      display: grid;
      gap: 25px;
      width: 100%;
      padding: 30px;

      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(auto-fill, 185px);

      @media screen and (max-width: ${(props) => props.theme.breakpoints.xxl}) {
         grid-template-columns: repeat(3, 1fr);
         grid-template-rows: repeat(auto-fill, 185px);
      }

      @media screen and (max-width: ${(props) => props.theme.breakpoints.xl}) {
         grid-template-columns: repeat(2, 1fr);
         grid-template-rows: repeat(auto-fill, 185px);
      }

      @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
         padding: 12px;
      }

      @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
         grid-template-columns: repeat(1, 1fr);
         grid-template-rows: repeat(auto-fill, 185px);
      }
   }
`;

const PaymentMethodsIsLoadingContainer = styled.div`
   padding: 30px;

   @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
      padding: 12px;
   }
`;

export default function PaymentMethodsPage() {
   const {
      creditDebitCards,
      error: _,
      isLoading,
   } = useGetCreditDebitCardsQuery();
   const [paymentMethodStep, setPaymentMethodStep] =
      useState<PaymentMethodTitle | null>(null);

   const { isOpen, onOpen, onClose } = useDisclosure();

   // ---------- onClick Handlers ----------
   const onModalOpenHandler = () => {
      onOpen();
   };

   const onModalCloseHandler = () => {
      onClose();
      setPaymentMethodStep(null);
   };

   let PaymentStepComponent: React.FC<unknown> = () => <div></div>;

   switch (paymentMethodStep) {
      case 'Credit/Debit Card':
         PaymentStepComponent = () => (
            <>
               {paymentMethodStep === 'Credit/Debit Card' && (
                  <AddCreditDebitCardModal onClose={onClose} />
               )}
            </>
         );
         break;
   }

   return (
      <>
         {isLoading ? (
            <PaymentMethodsIsLoadingContainer>
               <Skeleton
                  count={5}
                  width={'100%'}
                  height={'185px'}
                  borderRadius={'12px'}
               />
            </PaymentMethodsIsLoadingContainer>
         ) : (
            <>
               {creditDebitCards.length ? (
                  <AnimatePresence>
                     <PaymentMethodsContainer as={motion.div} layout>
                        {creditDebitCards && (
                           <div className="creditDebitCards">
                              {creditDebitCards.map(
                                 (creditDebitCard: CreditDebitCardT) => {
                                    return (
                                       <motion.div
                                          key={creditDebitCard.card_number}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          layout
                                       >
                                          <CreditDebitCard
                                             key={String(
                                                creditDebitCard.created_at,
                                             )}
                                             creditDebitCardInfo={
                                                creditDebitCard
                                             }
                                          />
                                       </motion.div>
                                    );
                                 },
                              )}
                              <AddCreditDebitCard onClick={onOpen} />
                           </div>
                        )}
                     </PaymentMethodsContainer>
                  </AnimatePresence>
               ) : (
                  <NoPaymentMethodContainer className={'no-payment-methods'}>
                     <div className={'content-wrapper'}>
                        <Icon
                           iconSrc={'payment-method-with-bg.svg'}
                           width={'160px'}
                        />
                        <div className={'title-desc-wrapper'}>
                           <Heading tagName={'h4'} className={'title'}>
                              No Payment Methods Yet
                           </Heading>
                           <span>Please add your payment methods.</span>
                        </div>
                        <Button
                           icon={'plus.svg'}
                           onClickHandler={onModalOpenHandler}
                        >
                           Add A Payment Method
                        </Button>
                     </div>
                  </NoPaymentMethodContainer>
               )}
            </>
         )}

         <Modal isOpen={isOpen} onClose={onModalCloseHandler} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Add A Payment Method</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  {paymentMethodStep === null ? (
                     <>
                        {paymentMethodOptions.map(
                           (
                              paymentMethodOption: PaymentMethodOptionProps,
                           ): JSX.Element => {
                              return (
                                 <PaymentMethodOptionComponent
                                    {...paymentMethodOption}
                                    key={
                                       paymentMethodOption.title +
                                       paymentMethodOption.description
                                    }
                                    onClick={() =>
                                       setPaymentMethodStep(
                                          paymentMethodOption.title,
                                       )
                                    }
                                 />
                              );
                           },
                        )}
                     </>
                  ) : (
                     <PaymentStepComponent />
                  )}
                  <br />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}
