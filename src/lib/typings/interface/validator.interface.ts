export interface ValidatorProps {
    type: 'email' | 'password';
    payload: string;
};

export interface ValidationResult {
    isValid: boolean;
    errorMessage: string;
}