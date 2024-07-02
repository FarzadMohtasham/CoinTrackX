import {ReactNode} from "react";

export type NotificationOptions = {
    id: number;
    title: string | ReactNode;
    createdAt: Date | null;
    message?: string | ReactNode;
    type: 'success' | 'error' | 'info' | 'warning';
    closable?: boolean;
    iconSrc?: string;
    width?: string | '100%' | 'min-content' | 'max-content';
    height?: string | '100%' | 'min-content' | 'max-content';
    iconSize?: string | '100px' | '250px' | '500px';
    closeIconSize?: string | '100px' | '250px' | '500px';
}

export type SimpleNotifProps = {
    onNotifClose?: (notifId: number) => void;
    options: NotificationOptions;
}

export type SimpleNotifStyled = {
    $type?: string;
    $width?: string | '100%';
    $iconSize?: string | '100px' | '250px' | '500px';
    $closeIconSize?: string | '100px' | '250px' | '500px';
    $height?: string | '100%' | 'min-content' | 'max-content';
}