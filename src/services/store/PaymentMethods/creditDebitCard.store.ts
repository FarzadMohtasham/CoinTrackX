import { create, StoreApi, UseBoundStore } from 'zustand';
import { CreditDebitCard } from '@/Lib/Typings/Components/CreditDebitCard.type';

type CreditDebitCardPaymentMethodStates = {
   creditDebitCards: CreditDebitCard[];
   setCreditDebitCards: (paymentMethodsList: CreditDebitCard[]) => void;
   addCreditDebitCard: (paymentMethod: CreditDebitCard) => void;
   removeCreditDebitCard: (creditDebitCardId: number) => void;
};

export const useCreditDebitStore: UseBoundStore<
   StoreApi<CreditDebitCardPaymentMethodStates>
> = create<CreditDebitCardPaymentMethodStates>((set) => ({
   creditDebitCards: [
      {
         id: 0,
         card_number: '4111111111111111',
         card_provider: 'Visa',
         as_main_payment: false,
         cvv: '123',
         cardholder_name: 'Farzad Mohtasham',
         exp: '12/26',
         created_at: new Date(),
         email: 'farzad@gmail.com',
         postal_code: '12345-4321',
      },
      {
         id: 0,
         card_number: '4111111111111111',
         card_provider: 'Visa',
         as_main_payment: false,
         cvv: '123',
         cardholder_name: 'Farzad Mohtasham',
         exp: '12/26',
         created_at: new Date(),
         email: 'farzad@gmail.com',
         postal_code: '12345-4321',
      },
      {
         id: 0,
         card_number: '4111111111111111',
         card_provider: 'Visa',
         as_main_payment: false,
         cvv: '123',
         cardholder_name: 'Farzad Mohtasham',
         exp: '12/26',
         created_at: new Date(),
         email: 'farzad@gmail.com',
         postal_code: '12345-4321',
      },
   ],
   setCreditDebitCards: (paymentMethodsList: CreditDebitCard[]): void => {
      set({ creditDebitCards: paymentMethodsList });
   },
   addCreditDebitCard: (creditDebitCard: CreditDebitCard): void => {
      set((state) => ({
         creditDebitCards: [...state.creditDebitCards, creditDebitCard],
      }));
   },
   removeCreditDebitCard: (creditDebitCardId: number): void => {
      set((state) => ({
         creditDebitCards: state.creditDebitCards.filter(
            (card) => card.id !== creditDebitCardId,
         ),
      }));
   },
}));
