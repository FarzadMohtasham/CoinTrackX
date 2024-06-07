import {JSX} from 'react'
import {IconProps} from '@ts/type/IconProps.type.ts'

export default function Icon(props: IconProps): JSX.Element {
    const iconPath = '/icons'

    let {
        icon_src = '',
        icon_alt = 'icon',
        width = '2rem',
        height = null,
        class_name = 'icon',
        on_click_handler = (): void => {
        },
    } = props

    if (height === null) height = width

    if (icon_src === '') icon_src = `${iconPath}/default.png`
    else icon_src = `${iconPath}/${icon_src}`

    return (
        <img src={`${icon_src}`}
             alt={icon_alt}
             width={width}
             height={height}
             className={class_name}
             onClick={on_click_handler}
        />
    )
}