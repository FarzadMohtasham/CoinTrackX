import {ComponentProps} from "react";

export type HeadingPropsType = ComponentProps<any> & {
    children: string;
    heading_type?: string;
    font_weight?: string;
    className?: string;
}