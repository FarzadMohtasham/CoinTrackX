import {IconProps} from "../../ts/type/IconProps.type.ts";

export default function Icon(props: IconProps) {
    const iconPath = '/icons'

    let {
        icon_src = '',
        icon_alt = 'icon',
        width = '2rem',
        height = '2rem',
        same_height = true,
    } = props

    if (same_height) height = width

    if (icon_src === '') icon_src = `${iconPath}/default.png`
    else icon_src = `${iconPath}/${icon_src}`

    return (
        <img src={`${icon_src}`}
             alt={icon_alt}
             width={width}
             height={height}
             className={'icon'}
        />
    )
}