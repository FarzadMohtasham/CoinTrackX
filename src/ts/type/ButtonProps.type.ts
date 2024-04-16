import {ComponentProps} from "react";
import {StyledObject} from "styled-components";

export type Properties = {
    padding: StyledObject;
    fontSize: StyledObject;
    expanded: StyledObject;
    backgroundColor: StyledObject;
    color: StyledObject;
    borderRadiusP: StyledObject;
    border: StyledObject;
    hover: StyledObject;
    mobileMedia: StyledObject;
    tabletMedia: StyledObject;
    desktopMedia: StyledObject;
}

export type ButtonPropsType = ComponentProps<'button'> & {
    children: string;
    btnType?: 'primary' | 'secondary' | 'black' | 'white' | 'danger';
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