export type ButtonPropsType = {
    children: string;
    type?: 'primary' | 'secondary' | 'black' | 'white' | 'danger';
    hasIcon?: boolean;
    icon?: any;
    iconDir?: 'left' | 'right';
    size?: 'sm' | 'lg';
    expanded?: boolean;
    hollow?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full',
    outline?: boolean,
}