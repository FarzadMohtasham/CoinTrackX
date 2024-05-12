import {MutableRefObject} from "react";

export type NotificationContainerProps = {
    ref: MutableRefObject<any>
}

export type NotificationStyledProps = {
    $priority: string;
    $type: string;
}

export type Notifications = {
    title: string;
    message: string;
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    priority: 'high' | 'middle' | 'low';
}