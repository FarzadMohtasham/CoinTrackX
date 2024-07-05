export type CreditDebitCard = {
    id: number;
    created_at: Date;
    email: string;
    cardholder_name: string;
    card_number: string;
    card_provider: string;
    exp: string;
    cvv: string;
    postal_code: string;
    as_main_payment: boolean;
}