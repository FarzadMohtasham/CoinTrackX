export type InputProps = {
    placeHolder: string;
    label: string;
    onChangeHandler: (value: string) => void;
    iconSrc?: string | null;
    focusIconSrc?: string;
    iconWidth?: string;
    errorMessage?: string | null;
    unAllowedErrorMessages?: string[];
}

export type InputStyledProps = {
    $inputSelected: string;
}

export type InputRefProps = {
    clearInput: () => void;
    focusInput: () => void;
}