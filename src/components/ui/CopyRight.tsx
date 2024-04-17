import {styled} from "styled-components"
import {CopyRightProps} from "../../ts/type/CopyRightProps.type.ts"

const date: Date = new Date()

const CopyRightStyled = styled.span`
  color: ${props => props.color};
`

export default function CopyRight(props: CopyRightProps) {
    const {
        color = 'black'
    } = props

    return (
        <CopyRightStyled color={color} className={'copy-right'}>
            Copyright {date.getFullYear()} © CoinTrackX
        </CopyRightStyled>
    )
}