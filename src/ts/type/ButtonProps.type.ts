import {RuleSet, StyledObject} from "styled-components";
import React from "react";

export type Properties = {
    padding: RuleSet<object>;
    fontSize: StyledObject;
    expanded: StyledObject;
    backgroundColor: StyledObject;
    color: StyledObject;
    borderRadiusS: StyledObject;
    border: StyledObject;
    hover: StyledObject;
    mobileMedia: StyledObject;
    tabletMedia: StyledObject;
    desktopMedia: StyledObject;
}

export type ButtonPropsType = {
    children: React.ReactNode;
    class_name?: string;
    btnType?: 'primary' | 'secondary' | 'black' | 'white' | 'danger';
    hasIcon?: boolean;
    icon?: any;
    iconDir?: 'left' | 'right';
    size?: 'sm' | 'lg';
    expanded?: boolean;
    hollow?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    outline?: boolean;
    hideOn?: 'mobile' | 'tablet' | 'desktop' | 'none';
    on_click_handler?: () => void,
    remove_padding?: boolean
}