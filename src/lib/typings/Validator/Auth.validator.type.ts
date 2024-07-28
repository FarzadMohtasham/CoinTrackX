export type LoginValidatorProps = {
   type: 'email' | 'password';
   payload: string;
};

export type LoginValidationResult = {
   isValid: boolean;
   errorMessage: string;
};

export type SignupValidatorProps = {
   type: 'firstName' | 'lastName' | 'email' | 'password';
   payload: string;
};

export type SignupValidationResult = {
   isValid: boolean;
   errorMessage: string;
};
