import {JSX} from 'react'
import {styled, css, RuleSet} from 'styled-components'
import {HashLoader} from 'react-spinners'

// Components
import Icon from '@components/ui/stuff/Icon.tsx'

//  Types
import {ButtonPropsType, Properties} from '@typings/type/ButtonProps.type.ts';

// Data
import {
    buttonTypeVariations,
    buttonPaddingVariations,
    buttonFontSizeVariations,
    buttonBorderRadius
} from '@data/button.data.ts'

type ButtonStyledProps = {
    $properties: Properties;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: center;
  text-align: center;
  cursor: ${(props: any) => props.$properties.cursor};
  padding: ${(props: any) => props.$properties.padding};
  font-size: ${(props: any) => props.$properties.fontSize};
  width: ${(props: any): string => props.$properties.expanded ? '100%' : `max-content`};
  background-color: ${(props: any) => props.$properties.backgroundColor};
  color: ${(props: any) => props.$properties.color};
  border-radius: ${(props: any) => props.$properties.borderRadiusS};
  border: ${(props: any): string => props.$properties.noBorder ? '0' : '.2rem'} solid ${(props: any) => props.$properties.border};
  transition: background-color .3s ease-in-out, border .3s ease-in-out;
  height: 5rem;

  &:hover {
    ${(props: any) => props.$properties.hover}
  }

  /*Very Small devices (landscape phones, 576px and down)*/
  @media screen and (max-width: ${props => props.theme.responsive.md}) {
    ${(props: any) => props.$properties.mobileMedia}
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.md}) {
    ${(props: any) => props.$properties.tabletMedia}
  }

  /*Large devices (desktops, 992px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.lg}) {
    ${(props: any) => props.$properties.desktopMedia}
  }
`

function Button(props: ButtonPropsType): JSX.Element {
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
        onClickHandler = (): void => {
        },
        removePadding = false,
        noBorder = false,
    }: ButtonPropsType = props

    disabled = isLoading || disabled;

    const padding: RuleSet | number = removePadding ? 0 : css`${buttonPaddingVariations[size]['y']} ${buttonPaddingVariations[size]['x']}`
    const fontSize: RuleSet = css`${buttonFontSizeVariations[size].fontSize}`
    const cursor: string = disabled ? 'not-allowed' : 'pointer'

    const backgroundColor: RuleSet =
        css`${
            !outline ?
                (
                    disabled ?
                        css`var(--color-${variant + '-500)'}`
                        :
                        buttonTypeVariations[variant].backgroundColor
                )
                :
                'rgba(0, 0, 0, 0)'
        }`

    const color: RuleSet = css`${!outline ? buttonTypeVariations[variant].color : buttonTypeVariations[variant].backgroundColor}`
    const borderRadiusS = css`${buttonBorderRadius[borderRadius]}`

    const border: RuleSet = css`${
        outline ?
            css`var(--color-${variant + '-100)'}`
            :
            (
                disabled ?
                    css`var(--color-${variant + '-50)'}`
                    :
                    `${buttonTypeVariations[variant].backgroundColor}`
            )
    }`

    const hover: RuleSet = css`
      ${outline && css`background-color: var(--color-${variant + '-50)'};`}

      ${!outline && (disabled ? '' : css`background-color: var(--color-${variant + '-900)'};`)}
      ${
              !outline ?
                      css`border: ${noBorder ? '0' : '.2rem'} solid var(--color-${variant + '-50)'};`
                      :
                      css`border: ${noBorder ? '0' : '.2rem'} solid var(--color-${variant + '-100)'};`
      }
    `
    const mobileMedia: RuleSet | string = `${hideOn === 'mobile' ? css`display: none;` : ''}`
    const tabletMedia: RuleSet | string = `${hideOn === 'tablet' ? css`display: none;` : ''}`
    const desktopMedia: RuleSet | string = `${hideOn === 'desktop' ? css`display: none;` : ''}`

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
    }

    const onButtonClickHandler = (): void => {
        if (disabled) return
        else onClickHandler()
    }

    return (
        <ButtonStyled className={`${className} ${hideOn !== 'none' ? `hide-on-${hideOn}` : ''}`}
                      $properties={buttonProperties}
                      onClick={onButtonClickHandler}>
            {icon && (iconDir === 'left' &&
                <Icon iconSrc={icon} iconAlt={'button-icon'} width={'15rem'}/>)}
            {isLoading &&
                <HashLoader size={18} color={`var(--color-${variant + '-500)'}`}/>}
            {children}
            {icon && (iconDir === 'right' &&
                <Icon iconSrc={icon} iconAlt={'button-icon'} width={'15rem'}/>)}
        </ButtonStyled>
    )
}

export default Button