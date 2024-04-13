import {css, styled} from "styled-components";

import Container from "../ui/Container.tsx";
import HeadingBox from "../ui/HeadingBox.tsx";

const PlatformWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10rem;

  img {
    width: 100%;
  }
`

export default function Platform() {
    return (
        <Container backgroundStyle={css`background: linear-gradient(to top, #f8f7fe, #f8f7fe, #fff);`}>
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