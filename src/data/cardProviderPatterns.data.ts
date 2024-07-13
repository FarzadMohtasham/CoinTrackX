import { CardNumberProvider } from '@typings/component-types/CardNumberInput.type.ts';

export default {
  Visa: /^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/,
  MasterCard:
    /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{2}|[3-6][0-9]{3}|7[01][0-9]{2}|720)[0-9]{12})$/,
} as Record<CardNumberProvider, RegExp>;
