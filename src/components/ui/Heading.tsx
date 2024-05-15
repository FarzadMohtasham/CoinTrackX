import {styled} from 'styled-components'

import {HeadingPropsType, HeadingStyledProps} from "@ts/type/HeadingProps.type.ts";

const HeadingStyled = styled.h1<HeadingStyledProps>`
  font-weight: ${props => props.$font_weight};
`

export default function Heading(props: HeadingPropsType) {
    const {
        children,
        heading_type = 'h3',
        font_weight = '400',
        class_name = ''
    } = props

    return (
        <HeadingStyled className={class_name}
                       $font_weight={font_weight}
                       as={heading_type}>
            {children}
        </HeadingStyled>
    )
}