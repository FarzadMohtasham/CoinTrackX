export type InputFieldValidatorProps = {
  inputValue: string;
  fieldName: string;
  minLength?: number;
  maxLength?: number;
};

export type InputFieldValidatorResult = {
  isValid: boolean;
  errorMessage: string;
};
