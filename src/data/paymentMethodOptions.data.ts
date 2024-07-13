import { PaymentMethodOptionProps } from '@typings/PaymentMethodOption.type.ts';

export const paymentMethodOptions: PaymentMethodOptionProps[] = [
  {
    title: 'Credit/Debit Card',
    description:
      'Use any debit or credit card (Visa or Mastercard) to buy Crypto.\n' +
      'Use a Visa debit card to cash out.',
    iconSrc: 'credit-debit-card-with-bg.svg',
    disabled: false,
  },
];
