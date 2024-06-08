import {MutableRefObject, ReactNode} from 'react'

export type NotificationContainerProps = {
    ref: MutableRefObject<any>
}

export type NotificationStyledProps = {
    $type: string;
}

export type Notification = {
    title: string;
    created_at: ReactNode;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    priority: string;
    closable: boolean;
}




