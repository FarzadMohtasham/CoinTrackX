import {styled, css, StyledObject} from 'styled-components'

// Components
import Icon from './Icon.tsx'

//  Types
import {ButtonPropsType} from "../../ts/type/ButtonProps.type.ts";

// Data
import {
    buttonTypeVariations,
    buttonPaddingVariations,
    buttonFontSizeVariations,
    buttonBorderRadius
} from '../../data/Button.data.ts'

type Properties = {
    padding: StyledObject;
    fontSize: StyledObject;
    expanded: StyledObject;
    backgroundColor: StyledObject;
    color: StyledObject;
    borderRadiusP: StyledObject;
    border: StyledObject;
    hover: StyledObject;
    mobileMedia: StyledObject;
    tabletMedia: StyledObject;
    desktopMedia: StyledObject;
}

const StyledButton = styled.button<{ properties: Properties }>`
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: ${(props) => props.properties.padding};
  font-size: ${props => props.properties.fontSize};
  width: ${props => props.properties.expanded ? '100%' : `max-content`};
  background-color: ${props => props.properties.backgroundColor};
  color: ${props => props.properties.color};
  border-radius: ${props => props.properties.borderRadiusP};
  border: .2rem solid ${props => props.properties.border};
  transition: background-color .3s ease-in-out, border .3s ease-in-out;

  &:hover {
    ${props => props.properties.hover}
  }

  /*Very Small devices (landscape phones, 576px and down)*/
  @media (max-width: ${props => props.theme.responsive.md}) {
    ${props => props.properties.mobileMedia}
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: ${props => props.theme.responsive.md}) {
    ${props => props.properties.tabletMedia}
  }

  /*Large devices (desktops, 992px and up)*/
  @media (min-width: ${props => props.theme.responsive.lg}) {
    ${props => props.properties.desktopMedia}
  }
`

function Button(props: ButtonPropsType) {
    const {
        children = 'ERROR - No Value',
        type = 'primary',
        hasIcon = false,
        icon = '',
        iconDir = 'left',
        size = 'sm',
        expanded = false,
        borderRadius = 'sm',
        outline = false,
        hideOn = 'none'
    }: ButtonPropsType = props

    const padding = css`${buttonPaddingVariations[size]['y']} ${buttonPaddingVariations[size]['x']}`
    const fontSize = css`${buttonFontSizeVariations[size].fontSize}`
    const backgroundColor = css`${!outline ? buttonTypeVariations[type].backgroundColor : 'rgba(0, 0, 0, 0)'}`
    const color = css`${!outline ? buttonTypeVariations[type].color : buttonTypeVariations[type].backgroundColor}`
    const borderRadiusP = css`${buttonBorderRadius[borderRadius]}`
    const border = css`${outline ? css`var(--color-${type + '-200)'}` : `${buttonTypeVariations[type].backgroundColor}`}`
    const hover = css`
      ${outline && css`background-color: var(--color-${type + '-100)'};`}

      ${!outline && css`background-color: var(--color-${type + '-700)'};`}
      ${!outline && css`border: .2rem solid var(--color-${type + '-700)'};`}
    `
    const mobileMedia = `${hideOn === 'mobile' ? css`display: none;` : ''}`
    const tabletMedia = `${hideOn === 'tablet' ? css`display: none;` : ''}`
    const desktopMedia = `${hideOn === 'desktop' ? css`display: none;` : ''}`

    const buttonProperties = {
        padding,
        fontSize,
        backgroundColor,
        color,
        borderRadiusP,
        border,
        hover,
        mobileMedia,
        tabletMedia,
        desktopMedia,
        expanded
    }

    return (
        // @ts-ignore
        <StyledButton className={hideOn !== 'none' ? `hide-on-${hideOn}` : ''} properties={buttonProperties}>
            {hasIcon && (iconDir === 'left' && <Icon icon={icon}/>)}
            {children}
            {hasIcon && (iconDir === 'right' && <Icon icon={icon}/>)}
        </StyledButton>
    )
}

export default Button