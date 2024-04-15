type IconProps = {
    icon: string;
}

export default function Icon(props: IconProps) {
    const {
        icon
    } = props

    return (<i>{ icon }</i>)
}