export type SelectMenuItem = {
   name: string;
   value: string;
   iconSrc: string;
   default: boolean;
};

export type SelectProps = {
   items: SelectMenuItem[];
   itemSelectSetter: any;
   hasIcon?: boolean;
   closeAfterSelect?: boolean;
   menuXDirStartPosition?: 'right' | 'left';
   label?: string | null;
};

export type SelectMenuWrapperProps = {
   $menuXDirStartPosition?: 'right' | 'left';
};

export type SelectedMenuItemProps = {
   $selected?: boolean;
   onClick?: any;
};
