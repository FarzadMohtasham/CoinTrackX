import { styled } from 'styled-components'

import logo from './../../../public/images/logo.svg'
import logoType from './../../../public/images/logo-type.svg'

const StyledLogo = styled.div`
  display: flex;
  gap: .8rem;
`

export default function Logo() {
    return (
        <StyledLogo>
            <img src={logo}
                 alt="logo"
                 width={24}/>
            <img src={logoType}
                 alt="logo type"
                 width={116}/>
        </StyledLogo>
    )
}