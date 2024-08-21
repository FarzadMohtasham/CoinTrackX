export type InputValue = string | number;

export type InputProps = {
   placeHolder: string;
   label?: string;
   showLabel?: boolean;
   onChangeHandler: (value: InputValue) => void;
   inputValue: InputValue;
   iconSrc?: string | null;
   focusIconSrc?: string;
   iconWidth?: string;
   unAllowedErrorMessages?: string[];
   hasError?: boolean;
   errorMessage?: string | null;
   maxLength?: number;
   minLength?: number;
   disabled?: boolean;
};

export type InputStyledProps = {
   $inputIsActive: boolean;
   $hasError: boolean;
   $disabled: boolean;
};

export type InputRefProps = {
   clearInput: () => void;
   focusInput: () => void;
};
