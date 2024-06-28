export type PaymentMethodOptionProps = {
    title: PaymentMethodTitle;
    description: string;
    iconSrc: string;
    onClick?: () => void;
    disabled: boolean;
}

export type PaymentMethodTitle = 'Credit/Debit Card';