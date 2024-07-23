export type InputProps = {
  placeHolder: string;
  label?: string;
  onChangeHandler: (value: string) => void;
  iconSrc?: string | null;
  focusIconSrc?: string;
  iconWidth?: string;
  errorMessage?: string | null;
  unAllowedErrorMessages?: string[];
  maxLength?: number;
  minLength?: number;
  initialValue?: string;
  hasError?: boolean;
};

export type InputStyledProps = {
  $inputIsActive: boolean;
  $hasError: boolean;
};

export type InputRefProps = {
  clearInput: () => void;
  focusInput: () => void;
};
