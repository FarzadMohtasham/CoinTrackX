import {ReactNode} from 'react'

export type NavigationItemStyledProps = {
    $active: boolean;
    onClick?: any;
}

export type NavigationProps = {
    children: ReactNode;
    active?: boolean;
    icon_src: string;
    active_icon_src: string;
    icon_alt?: string;
    icon_width?: string;
    on_click?: (navItemName: string) => void;
}

export type NavigationItemType = {
    name: string;
    title: string;
    link: string;
    icon_src: string;
    active_icon_src: string;
    active: boolean;
}