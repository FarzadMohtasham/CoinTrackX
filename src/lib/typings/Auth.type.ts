export type ValidatorProps = {
    type: 'firstName' | 'lastName' | 'email' | 'password';
    payload: string;
};

export type ValidationResult = {
    isValid: boolean;
    errorMessage: string;
}