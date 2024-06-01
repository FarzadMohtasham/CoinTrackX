export type SelectMenuItem = {
    name: string;
    value: string;
    icon_src: string;
    default: boolean;
}

export type SelectProps = {
    $menu_items: SelectMenuItem[];
    $new_value_setter: any;
    $has_icon?: boolean;
    $close_after_select?: boolean;
    $menu_x_dir_start_position?: 'right' | 'left';
}

export type SelectMenuWrapperProps = {
    $menu_x_dir_start_position?: 'right' | 'left';
}

export type SelectedMenuItemProps = {
    $selected?: boolean;
    onClick?: any
}

export type PriceTableData = {
    name: string;
    logoSrc: string;
    symbol: string;
    price: string;
    marketCap: string;
    circulatingSupply: string;
    changePercent: string;
    last24H: string;
    watchList: boolean;
}