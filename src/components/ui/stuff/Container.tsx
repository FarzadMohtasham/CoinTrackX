import { JSX } from 'react';
import { styled } from 'styled-components';

import {
   ContainerPropsType,
   ContainerStyledProps,
} from '@typings/component-types/ContainerProps.type.ts';

const ContainerStyled = styled.div<ContainerStyledProps>`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   ${(props: any) => props.$backgroundStyle}
   .wrapper {
      width: 95%;
      max-width: 95%;
   }

   /*Small devices (landscape phones, 576px and up)*/
   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.sm}) {
      .wrapper {
         width: 576px;
      }
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.md}) {
      .wrapper {
         width: 768px;
      }
   }

   /*Large devices (desktops, 992px and up)*/
   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.lg}) {
      .wrapper {
         width: 992px;
      }
   }

   /*X-Large devices (large desktops, 1200px and up)*/
   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.xl}) {
      .wrapper {
         width: 1200px;
      }
   }

   /*XX-Large devices (larger desktops, 1400px and up)*/
   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.xxl}) {
      .wrapper {
         width: 1400px;
      }
   }
`;

export default function Container(props: ContainerPropsType): JSX.Element {
   const { children, backgroundStyle = '', tagType = 'div' } = props;

   return (
      <ContainerStyled $backgroundStyle={backgroundStyle} as={tagType}>
         <div className={'wrapper'}>{children}</div>
      </ContainerStyled>
   );
}
