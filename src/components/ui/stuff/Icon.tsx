import { JSX } from 'react';
import { styled } from 'styled-components';

import { IconProps } from '@typings/components/IconProps.type.ts';

const IconImg = styled.img<{
   $clickable: boolean;
   $width: string;
   $height: string;
}>`
   display: inline;
   width: ${(props) => props.$width};
   height: ${(props) => props.$height};
   cursor: ${(props) => (props.$clickable ? 'pointer' : 'cursor')};
`;

export default function Icon(props: IconProps): JSX.Element {
   const iconPath = '/icons';

   let {
      iconSrc = '',
      iconAlt = 'icon',
      width = '20px',
      height = null,
      className = 'icon',
      onClickHandler = (): void => {},
      clickable = false,
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
      />
   );
}
