import {styled, css} from 'styled-components'

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

    const StyledButton = styled.button`
      display: inline-block;
      text-align: center;
      cursor: pointer;
      padding: ${buttonPaddingVariations[size]['y']} ${buttonPaddingVariations[size]['x']};
      font-size: ${buttonFontSizeVariations[size].fontSize};
      width: ${expanded ? '100%' : `max-content`};
      background-color: ${!outline ? buttonTypeVariations[type].backgroundColor : 'rgba(0, 0, 0, 0)'};
      color: ${!outline ? buttonTypeVariations[type].color : buttonTypeVariations[type].backgroundColor};
      border-radius: ${buttonBorderRadius[borderRadius]};
      border: .2rem solid ${outline ? css`var(--color-${type + '-200)'}` : `${buttonTypeVariations[type].backgroundColor}`};
      transition: background-color .3s ease-in-out, border .3s ease-in-out;

      &:hover {
        ${outline && css`background-color: var(--color-${type + '-100)'};`}

        ${!outline && css`background-color: var(--color-${type + '-700)'};`}
        ${!outline && css`border: .2rem solid var(--color-${type + '-700)'};`}
      }

      /*Very Small devices (landscape phones, 576px and down)*/
      @media (max-width: 76.79rem) {
        ${hideOn === 'mobile' ? css`display: none;` : ''}
      }

      /*Medium devices (tablets, 768px and up)*/
      @media (min-width: 76.8rem) {
        ${hideOn === 'tablet' ? css`display: none;` : ''}
      }

      /*Large devices (desktops, 992px and up)*/
      @media (min-width: 99.2rem) {
        ${hideOn === 'desktop' ? css`display: none;` : ''}
      }
    `

    return (
        <StyledButton className={hideOn !== 'none' ? `hide-on-${hideOn}` : ''}>
            {hasIcon && (iconDir === 'left' && <Icon icon={icon}/>)}
            {children}
            {hasIcon && (iconDir === 'right' && <Icon icon={icon}/>)}
        </StyledButton>
    )
}

export default Button