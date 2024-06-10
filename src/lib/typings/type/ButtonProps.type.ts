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
    cursor: string | RuleSet<object>;
    noBorder: boolean;
}

export type ButtonPropsType = {
    children: React.ReactNode;
    className?: string;
    btnType?: 'primary' | 'secondary' | 'black' | 'white' | 'danger' | 'gray';
    icon?: string | null;
    iconDir?: 'left' | 'right';
    size?: 'sm' | 'lg';
    expanded?: boolean;
    hollow?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    outline?: boolean;
    hideOn?: 'mobile' | 'tablet' | 'desktop' | 'none';
    onClickHandler?: () => void;
    removePadding?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    noBorder?: boolean;
}