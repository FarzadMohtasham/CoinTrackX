import { MotionProps } from 'framer-motion';

export type IconProps = {
   iconSrc: string;
   iconAlt?: string;
   width: string;
   height?: string;
   className?: string;
   onClickHandler?: () => void;
   clickable?: boolean;
   as?: any;
};

export interface MotionIconProps extends IconProps, MotionProps {}
