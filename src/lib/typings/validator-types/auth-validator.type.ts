export type ValidatorProps = {
    type: 'email' | 'password';
    payload: string;
};

export type ValidationResult =  {
    isValid: boolean;
    errorMessage: string;
}