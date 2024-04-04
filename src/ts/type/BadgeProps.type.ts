export type BadgePropsType = {
    children: string;
    type?: 'success' | 'danger';
    hasIcon?: boolean;
    icon?: any;
    iconDir?: 'left' | 'right';
    hollow?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full',
    outline?: boolean,
}