export type SelectMenuItem = {
    name: string;
    icon_src: string;
    default: boolean;
}

export type SelectProps = {
    $menu_items: SelectMenuItem[];
    $has_icon?: boolean;
    $close_after_select?: boolean;
}

export type SelectedMenuItemProps = {
    $selected?: boolean;
    onClick?: any
}