import { JSX } from 'react';
import { css, RuleSet, styled } from 'styled-components';
import { HashLoader } from 'react-spinners';

// Components
import Icon from '@components/ui/stuff/Icon.tsx';

//  Types
import {
   ButtonPropsType,
   Properties,
} from '@typings/components/ButtonProps.type.ts';

// Data
import {
   buttonBorderRadius,
   buttonFontSizeVariations,
   buttonPaddingVariations,
   buttonTypeVariations,
} from '@data/button.data.ts';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';

type ButtonStyledProps = MotionProps & {
   $properties: Properties;
};

const ButtonStyled = styled.button<ButtonStyledProps>`
   display: flex;
   align-items: center;
   gap: 12px;
   justify-content: center;
   text-align: center;
   cursor: ${(props: any) => props.$properties.cursor};
   padding: ${(props: any) => props.$properties.padding};
   font-size: ${(props: any) => props.$properties.fontSize};
   width: ${(props: any): string | RuleSet<Object> =>
      props.$properties.expanded ? '100%' : 'max-content'};
   background-color: ${(props: any) => props.$properties.backgroundColor};
   color: ${(props: any) => props.$properties.color};
   border-radius: ${(props: any) => props.$properties.borderRadiusS};
   border: ${(props: any): string => (props.$properties.noBorder ? '0' : '2px')}
      solid ${(props: any) => props.$properties.border};
   transition:
      background-color 0.3s ease-in-out,
      border 0.3s ease-in-out;
   height: 50px;

   &:hover {
      ${(props: any) => props.$properties.hover}
   }

   /*Very Small devices (landscape phones, 576px and down)*/
   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      ${(props: any) => props.$properties.mobileMedia}
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      ${(props: any) => props.$properties.tabletMedia}
   }

   /*Large devices (desktops, 992px and up)*/
   @media screen and (min-width: ${(props) => props.theme.breakpoints.lg}) {
      ${(props: any) => props.$properties.desktopMedia}
   }
`;

export default function Button(props: ButtonPropsType): JSX.Element {
   let {
      children = 'ERROR - No Value',
      className = '',
      variant = 'primary',
      icon = null,
      iconDir = 'left',
      size = 'sm',
      expanded = false,
      borderRadius = 'sm',
      outline = false,
      hideOn = 'none',
      disabled = false,
      isLoading = false,
      onClickHandler = (): void => {},
      removePadding = false,
      noBorder = false,
   }: ButtonPropsType = props;

   disabled = isLoading || disabled;

   const padding: RuleSet | number = removePadding
      ? 0
      : // eslint-disable-next-line
        css`
           ${buttonPaddingVariations[size]['y']} ${buttonPaddingVariations[
              size
           ]['x']}
        `;
   const fontSize: RuleSet = css`
      ${buttonFontSizeVariations[size].fontSize}
   `;
   const cursor: string = disabled ? 'not-allowed' : 'pointer';

   const backgroundColor: RuleSet = css`
      ${!outline
         ? disabled
            ? css`var(--color-${variant + '-500)'}`
            : buttonTypeVariations[variant].backgroundColor
         : 'rgba(0, 0, 0, 0)'}
   `;

   const color: RuleSet = css`
      ${!outline
         ? buttonTypeVariations[variant].color
         : buttonTypeVariations[variant].backgroundColor}
   `;
   const borderRadiusS = css`
      ${buttonBorderRadius[borderRadius]}
   `;

   const border: RuleSet = css`
      ${outline
         ? css`var(--color-${variant + '-100)'}`
         : disabled
           ? css`var(--color-${variant + '-50)'}`
           : `${buttonTypeVariations[variant].backgroundColor}`}
   `;

   const hover: RuleSet = css`
      ${outline && css`background-color: var(--color-${variant + '-50)'};`}

      ${!outline &&
      (disabled
         ? ''
         : css`background-color: var(--color-${variant + '-900)'};`)}
      ${!outline
         ? css`border: ${noBorder ? '0' : '2px'} solid var(--color-${variant + '-50)'};`
         : css`border: ${noBorder ? '0' : '2px'} solid var(--color-${variant + '-100)'};`}
   `;
   const mobileMedia: RuleSet | string = `${
      hideOn === 'mobile'
         ? css`
              display: none;
           `
         : ''
   }`;
   const tabletMedia: RuleSet | string = `${
      hideOn === 'tablet'
         ? css`
              display: none;
           `
         : ''
   }`;
   const desktopMedia: RuleSet | string = `${
      hideOn === 'desktop'
         ? css`
              display: none;
           `
         : ''
   }`;

   const buttonProperties = {
      padding,
      fontSize,
      backgroundColor,
      color,
      borderRadiusS,
      border,
      hover,
      mobileMedia,
      tabletMedia,
      desktopMedia,
      expanded,
      cursor,
      noBorder,
   };

   const onButtonClickHandler = (): void => {
      if (disabled) return;
      onClickHandler();
   };

   return (
      <ButtonStyled
         as={motion.button}
         className={`${className} ${hideOn !== 'none' ? `hide-on-${hideOn}` : ''}`}
         $properties={buttonProperties}
         onClick={onButtonClickHandler}
         disabled={disabled || isLoading}
         whileTap={{ scale: 0.95 }}
      >
         {icon && iconDir === 'left' && (
            <Icon
               iconSrc={icon}
               iconAlt={'button-icon'}
               width={'15px'}
               className="left-icon"
            />
         )}
         <AnimatePresence mode="wait">
            {isLoading && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               >
                  <HashLoader
                     size={18}
                     color={`var(--color-${variant + '-500)'}`}
                  />
               </motion.div>
            )}
         </AnimatePresence>
         {children}
         {icon && iconDir === 'right' && (
            <Icon
               iconSrc={icon}
               iconAlt={'button-icon'}
               width={'15px'}
               className="right-icon"
            />
         )}
      </ButtonStyled>
   );
}
