import {ComponentProps} from "react";

export type ButtonPropsType = ComponentProps<any> & {
    children: string;
    type?: 'primary' | 'secondary' | 'black' | 'white' | 'danger';
    hasIcon?: boolean;
    icon?: any;
    iconDir?: 'left' | 'right';
    size?: 'sm' | 'lg';
    expanded?: boolean;
    hollow?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full',
    outline?: boolean,
    hideOn?: 'mobile' | 'tablet' | 'desktop' | 'none'
}