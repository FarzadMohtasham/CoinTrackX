import {styled} from 'styled-components'
import {HeadingPropsType} from "../../ts/type/HeadingProps.type.ts";

const fontWeightFunc = (props: any) => props.font_weight

const HeadingStyled = styled.h1`
  font-weight: ${props => fontWeightFunc(props)};
`

export default function Heading(props: HeadingPropsType) {
    const {
        children,
        heading_type = 'h3',
        font_weight = '400',
        className = ''
    } = props

    return (
        // @ts-ignore
        <HeadingStyled className={className} font_weight={font_weight} as={heading_type}>
            {children}
        </HeadingStyled>
    )
}