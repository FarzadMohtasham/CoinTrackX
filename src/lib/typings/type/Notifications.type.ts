import {MutableRefObject, ReactNode} from 'react'

export type NotificationContainerProps = {
    ref: MutableRefObject<any>
}

export type NotificationStyledProps = {
    $type: string;
}

export type Notification = {
    id: number;
    title: string;
    createdAt: ReactNode | Date;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    priority?: string;
    closable: boolean;
}




