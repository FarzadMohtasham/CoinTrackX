import {styled, css} from 'styled-components'

// Components
import Icon from './Icon.tsx'

//  Types
import {ButtonPropsType} from "../ts/type/ButtonProps.type.ts";

// Data
const buttonPaddingVariations = {
    sm: {
        x: '2.4rem',
        y: '1.4rem',
    },
    lg: {
        x: '2.4rem',
        y: '1.8rem',
    }
}
const buttonFontSizeVariations = {
    sm: {
        fontSize: 'var(--font-size-body-sm)'
    },
    lg: {
        fontSize: 'var(--font-size-body-lg)'
    }
}
const buttonTypeVariations = {
    primary: {
        backgroundColor: 'var(--color-primary)',
        color: 'white',
    },
    secondary: {
        backgroundColor: 'var(--color-secondary)',
        color: 'black',
    },
    black: {
        backgroundColor: 'var(--color-black)',
        color: 'white',
    },
    white: {
        backgroundColor: 'var(--color-white)',
        color: 'black',
    },
    danger: {
        backgroundColor: 'var(--color-danger)',
        color: 'white',
    }
}
const buttonBorderRadius = {
    none: '0',
    sm: '0.5rem',
    md: '0.8rem',
    lg: '1rem',
    full: '10rem',
}

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
    }: ButtonPropsType = props

    // const hPadding

    const StyledButton = styled.button`
      text-align: center;
      cursor: pointer;
      padding: ${buttonPaddingVariations[size]['y']} ${buttonPaddingVariations[size]['x']};
      font-size: ${buttonFontSizeVariations[size].fontSize};
      width: ${expanded ? '100%' : `min-content`};
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
    `

    return (
        <StyledButton>
            {hasIcon && (iconDir === 'left' && <Icon icon={icon}/>)}
            {children}
            {hasIcon && (iconDir === 'right' && <Icon icon={icon}/>)}
        </StyledButton>
    )
}

export default Button