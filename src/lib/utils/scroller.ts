import {scroller} from 'react-scroll'

const scrollOptions = {
    duration: 800,
    smooth: true,
    offset: 50,
}

export default function scrollTo(targetName: string, options: object = scrollOptions) {
    scroller.scrollTo(targetName, options)
}