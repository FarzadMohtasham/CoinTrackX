import React from "react";
import {RuleSet} from "styled-components";

export type Properties = {
    padding: number | RuleSet<object>;
    fontSize: string | RuleSet<object>;
    expanded: boolean | RuleSet<object>;
    backgroundColor: string | RuleSet<object>;
    color: string | RuleSet<object>;
    borderRadiusS: string | RuleSet<object>;
    border: string | RuleSet<object>;
    hover: string | RuleSet<object>;
    mobileMedia: string | RuleSet<object>;
    tabletMedia: string | RuleSet<object>;
    desktopMedia: string | RuleSet<object>;
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