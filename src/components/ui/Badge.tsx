import {styled} from 'styled-components'

import {BadgePropsType} from "@ts/type/BadgeProps.type.ts"

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
        `var(--color-success${outline ? '-100' : ''})` :
        `var(--color-danger${outline ? '-100' : ''})`

    const borderColor = type === 'success' ?
        `var(--color-success${outline ? '-200' : ''})` :
        `var(--color-danger${outline ? '-200' : ''})`

    const textColor = type === 'success' ?
        (outline ? 'var(--color-success)' : 'var(--color-white)') :
        (outline ? 'var(--color-danger)' : 'var(--color-white)')

    const BadgeStyled = styled.span`
      display: flex;
      align-items: center;
      gap: .5rem;
      width: min-content;
      background-color: ${bgColor};
      padding: .6rem .8rem;
      font-size: var(--font-size-body-xsm);
      color: ${textColor};
      border-radius: ${borderRadiusVariations[borderRadius]};
      border: .1rem solid ${borderColor};
      font-weight: 500;
    `

    return (
        <BadgeStyled>
            {hasIcon && (iconDir === 'left' ? <Icon icon_src={icon}/> : '')}
            {children}
            {hasIcon && (iconDir === 'right' ? <Icon icon_src={icon}/> : '')}
        </BadgeStyled>
    )
}