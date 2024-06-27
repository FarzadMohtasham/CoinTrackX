import {JSX} from 'react'
import {css, styled} from 'styled-components'

import Container from '@components/ui/stuff/Container.tsx'
import HeadingBox from '@components/ui/stuff/HeadingBox.tsx'

const PlatformWrapper = styled.div.attrs({
    id: 'platforms'
})`
  display: flex;
  flex-direction: column;
  padding-top: 100px;

  img {
    width: 100%;
  }
`

export default function Platform(): JSX.Element {
    return (
        <Container backgroundStyle={css`background: linear-gradient(to top, #FFFFFF, #EFEDFD, #FFFFFF);`}>
            <PlatformWrapper>
                <HeadingBox label={'platform'}
                            heading={'Get a bird’s eye view of your crypto assets growing!'}
                            desc={'With a easy-to-use user interface, you can check your tokens and coins profit/loss in less than 3 seconds, That’s true'}/>

                <img src="/images/platform.home.png"
                     alt="platform image"/>
            </PlatformWrapper>
        </Container>
    )
}