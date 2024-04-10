import {styled} from 'styled-components'
import {BadgePropsType} from "../../ts/type/BadgeProps.type.ts"

// Component
import Icon from "./Icon.tsx";

const borderRadiusVariations = {
    none: '0',
    sm: '.5rem',
    md: '.8rem',
    lg: '1.1rem',
    full: '10rem',
}

export default function Badge(props: BadgePropsType) {
    const {
        children,
        type = 'success',
        hasIcon = false,
        icon,
        iconDir = 'left',
        outline = false,
        borderRadius = 'none'
    } = props

    const bgColor = type === 'success' ?
        `var(--color-success${outline ? '-200' : ''})` :
        `var(--color-danger${outline ? '-200' : ''})`

    const borderColor = type === 'success' ?
        `var(--color-success${outline ? '-200' : ''})` :
        `var(--color-danger${outline ? '-200' : ''})`

    const textColor = type === 'success' ?
        (outline ? 'var(--color-success)' : 'var(--color-white)') :
        (outline ? 'var(--color-danger)' : 'var(--color-white)')

    const BadgeStyled = styled.span`
      background-color: ${bgColor};
      padding: .6rem .8rem;
      font-size: var(--font-size-body-xsm);
      color: ${textColor};
      border-radius: ${borderRadiusVariations[borderRadius]};
      border: .1rem solid ${borderColor};
    `

    return (
        <BadgeStyled>
            {hasIcon && (iconDir === 'left' ? <Icon icon={icon}/> : '')}
            {children}
            {hasIcon && (iconDir === 'right' ? <Icon icon={icon}/> : '')}
        </BadgeStyled>
    )
}