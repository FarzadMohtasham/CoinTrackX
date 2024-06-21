import {JSX} from 'react'
import {styled} from 'styled-components'

// Component
import Icon from './Icon.tsx'

import {BadgeProps, BadgePropsType} from '@typings/component-types/BadgeProps.type.ts'

const borderRadiusVariations = {
    none: '0',
    sm: '.5rem',
    md: '.8rem',
    lg: '1.1rem',
    full: '10rem',
}

const BadgeStyled = styled.span<BadgeProps>`
  display: flex;
  align-items: center;
  gap: .5rem;
  width: max-content;
  background-color: ${(props: any) => props.$bgColor};
  padding: .6rem .8rem;
  font-size: var(--font-size-body-xsm);
  color: ${(props: any) => props.$textColor};
  border-radius: ${(props: any) => props.$borderRadiusVariations[props.$borderRadius]};
  border: .1rem solid ${(props: any) => props.$borderColor};
  font-weight: 500;
`

export default function Badge(props: BadgePropsType): JSX.Element {
    const {
        children,
        icon,
        type = 'success',
        hasIcon = false,
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

    return (
        <BadgeStyled $bgColor={bgColor}
                     $borderColor={borderColor}
                     $textColor={textColor}
                     $borderRadiusVariations={borderRadiusVariations}
                     $borderRadius={borderRadius}>
            {hasIcon && (iconDir === 'left' ? <Icon iconSrc={icon}/> : '')}
            {children}
            {hasIcon && (iconDir === 'right' ? <Icon iconSrc={icon}/> : '')}
        </BadgeStyled>
    )
}