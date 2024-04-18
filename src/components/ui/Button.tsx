import {styled, css} from 'styled-components'

// Components
import Icon from './Icon.tsx'

//  Types
import {ButtonPropsType, Properties} from "../../ts/type/ButtonProps.type.ts";

// Data
import {
    buttonTypeVariations,
    buttonPaddingVariations,
    buttonFontSizeVariations,
    buttonBorderRadius
} from '../../data/Button.data.ts'

const StyledButton = styled.button<{ properties: Properties }>`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: center;
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
        class_name = '',
        btnType = 'primary',
        hasIcon = false,
        icon = '',
        iconDir = 'left',
        size = 'sm',
        expanded = false,
        borderRadius = 'sm',
        outline = false,
        hideOn = 'none',
        on_click_handler = () => {
            console.log('fuck me')
        },
        remove_padding = false
    } = props

    const padding = remove_padding ? 0 : css`${buttonPaddingVariations[size]['y']} ${buttonPaddingVariations[size]['x']}`
    const fontSize = css`${buttonFontSizeVariations[size].fontSize}`
    const backgroundColor = css`${!outline ? buttonTypeVariations[btnType].backgroundColor : 'rgba(0, 0, 0, 0)'}`
    const color = css`${!outline ? buttonTypeVariations[btnType].color : buttonTypeVariations[btnType].backgroundColor}`
    const borderRadiusP = css`${buttonBorderRadius[borderRadius]}`
    const border = css`${outline ? css`var(--color-${btnType + '-100)'}` : `${buttonTypeVariations[btnType].backgroundColor}`}`
    const hover = css`
      ${outline && css`background-color: var(--color-${btnType + '-50)'};`}

      ${!outline && css`background-color: var(--color-${btnType + '-900)'};`}
      ${!outline && css`border: .2rem solid var(--color-${btnType + '-700)'};`}
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
        expanded,
    }

    return (
        // @ts-ignore
        <StyledButton className={`${class_name} ${hideOn !== 'none' ? `hide-on-${hideOn}` : ''}`} properties={buttonProperties}
                      onClick={on_click_handler}
        >
            {hasIcon && (iconDir === 'left' &&
                <Icon icon_src={icon} icon_alt={'button-icon'} width={'15rem'} same_height/>)}
            {children}
            {hasIcon && (iconDir === 'right' &&
                <Icon icon_src={icon} icon_alt={'button-icon'} width={'15rem'} same_height/>)}
        </StyledButton>
    )
}

export default Button