export type InputProps = {
    place_holder: string;
    on_change_handler: (value: string) => void;
    icon_src?: string;
    focus_icon_src?: string;
    icon_width?: string;
    error_message?: string | null;
    invalid_error_messages?: string[];
}

export type InputStyledProps = {
    input_selected: string;
}