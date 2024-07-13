import { ReactNode } from 'react';

export type NavigationItemStyledProps = {
  $active: boolean;
  onClick?: any;
};

export type NavigationProps = {
  children: ReactNode;
  active?: boolean;
  iconSrc: string;
  activeIconSrc: string;
  iconAlt?: string;
  iconWidth?: string;
  onClick?: (navItemName: string) => void;
};

type NavigationItem = {
  name: string;
  title: string;
  link: string;
  iconSrc: string;
  activeIconSrc: string;
  active: boolean;
};

export type NavigationItemType = NavigationItem & {
  childItems?: NavigationItem[];
};
