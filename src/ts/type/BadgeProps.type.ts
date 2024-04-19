import React from "react";

export type BadgePropsType = {
    children: React.ReactNode;
    type?: 'success' | 'danger';
    hasIcon?: boolean;
    icon?: any;
    iconDir?: 'left' | 'right';
    hollow?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full',
    outline?: boolean,
}