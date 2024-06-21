export type SelectMenuItem = {
    name: string;
    value: string;
    iconSrc: string;
    default: boolean;
}

export type SelectProps = {
    $menuItems: SelectMenuItem[];
    $newValueSetter: any;
    $hasIcon?: boolean;
    $closeAfterSelect?: boolean;
    $menuXDirStartPosition?: 'right' | 'left';
}

export type SelectMenuWrapperProps = {
    $menuXDirStartPosition?: 'right' | 'left';
}

export type SelectedMenuItemProps = {
    $selected?: boolean;
    onClick?: any;
}