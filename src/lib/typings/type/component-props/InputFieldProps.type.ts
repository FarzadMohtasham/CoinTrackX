export type InputProps = {
    placeHolder: string;
    onChangeHandler: (value: string) => void;
    iconSrc?: string;
    focusIconSrc?: string;
    iconWidth?: string;
    errorMessage?: string | null;
    invalidErrorMessages?: string[];
}

export type InputStyledProps = {
    $inputSelected: string;
}