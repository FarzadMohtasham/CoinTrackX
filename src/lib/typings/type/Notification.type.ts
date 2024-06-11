import {ReactNode} from "react";

export type NotificationOptions = {
    id: number;
    title: string;
    createdAt: ReactNode | Date;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    closable?: boolean;
    iconSrc?: string;
    width?: string | '100%' | 'min-content' | 'max-content';
    height?: string | '100%' | 'min-content' | 'max-content';
    iconSize?: string | '10rem' | '25rem' | '50rem';
    closeIconSize?: string | '10rem' | '25rem' | '50rem';
}

export type SimpleNotifProps = {
    onNotifClose?: (notifId: number) => void;
    options: NotificationOptions
}

export type SimpleNotifStyled = {
    $type?: string;
    $width?: string | '100%';
    $iconSize?: string | '10rem' | '25rem' | '50rem';
    $closeIconSize?: string | '10rem' | '25rem' | '50rem';
    $height?: string | '100%' | 'min-content' | 'max-content';
}