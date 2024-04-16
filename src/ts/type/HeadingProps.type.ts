import {ComponentProps} from "react";

export type HeadingPropsType = ComponentProps<'h1'> & {
    children: string;
    heading_type?: string;
    font_weight?: string;
    className?: string;
}