export type InputProps = {
    place_holder: string;
    on_change_handler: (value: string) => void;
    icon_src: string;
    icon_width: string;
}

export type InputStyledProps = {
    inputSelected: boolean;
}