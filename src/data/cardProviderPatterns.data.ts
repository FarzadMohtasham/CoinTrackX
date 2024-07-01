import {CardNumberProvider} from "@typings/component-types/CardNumberInput.type.ts";

export default {
    'Visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
    'MasterCard': /^(?:5[1-5][0-9]{14}|2[2-7][0-9]{14})$/,
} as Record<CardNumberProvider, RegExp>