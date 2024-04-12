import {styled} from 'styled-components'

const HeadingStyled = styled.h1`

`

export default function Heading({children}: any) {
    return (
        <HeadingStyled>
            {children}
        </HeadingStyled>
    )
}