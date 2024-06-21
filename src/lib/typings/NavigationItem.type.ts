import {ReactNode} from 'react'

export type NavigationItemStyledProps = {
    $active: boolean;
    onClick?: any;
}

export type NavigationProps = {
    children: ReactNode;
    active?: boolean;
    iconSrc: string;
    activeIconSrc: string;
    iconAlt?: string;
    iconWidth?: string;
    onClick?: (navItemName: string) => void;
}

export type NavigationItemType = {
    name: string;
    title: string;
    link: string;
    iconSrc: string;
    activeIconSrc: string;
    active: boolean;
}