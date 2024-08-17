import { JSX } from 'react';
import { styled } from 'styled-components';

import { MotionProps } from 'framer-motion';
import { MotionIconProps } from '@/libs/typings/components/IconProps.type';

const IconImg = styled.img<
   {
      $clickable: boolean;
      $width: string;
      $height: string;
   } & MotionProps
>`
   display: inline;
   width: ${(props) => props.$width};
   height: ${(props) => props.$height};
   cursor: ${(props) => (props.$clickable ? 'pointer' : 'cursor')};
`;

export default function Icon(props: MotionIconProps): JSX.Element {
   const iconPath = '/icons';

   let {
      iconSrc = '',
      iconAlt = 'icon',
      width = '20px',
      height = null,
      className = 'icon',
      onClickHandler = (): void => {},
      clickable = false,
      ...motionProps
   } = props;

   if (height === null) {
      height = width;
   }

   if (iconSrc === '') iconSrc = `${iconPath}/default.svg`;
   else iconSrc = `${iconPath}/${iconSrc}`;

   return (
      <IconImg
         src={`${iconSrc}`}
         alt={iconAlt}
         $width={width}
         $height={height}
         className={className}
         $clickable={clickable}
         onClick={onClickHandler}
         {...motionProps}
      />
   );
}
