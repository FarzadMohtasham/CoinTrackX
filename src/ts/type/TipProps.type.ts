import {ComponentProps} from "react";

export type TipPropsType = ComponentProps<'div'> & {
    children: string;
    closable?: boolean;
    redirect?: boolean;
    link?: string;
    replaceHistory?: boolean;
    extended?: boolean;
}