import {JSX} from 'react'
import {styled} from "styled-components";

import {IconProps} from '@typings/component-types/IconProps.type.ts'

const IconImg = styled.img`
    display: inline;
`

export default function Icon(props: IconProps): JSX.Element {
    const iconPath = '/icons'

    let {
        iconSrc = '',
        iconAlt = 'icon',
        width = '2rem',
        height = null,
        className = 'icon',
        onClickHandler = (): void => {
        },
    } = props

    if (height === null) height = width

    if (iconSrc === '') iconSrc = `${iconPath}/default.png`
    else iconSrc = `${iconPath}/${iconSrc}`

    return (
        <IconImg src={`${iconSrc}`}
             alt={iconAlt}
             width={width}
             height={height}
             className={className}
             onClick={onClickHandler}
        />
    )
}