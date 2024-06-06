import {JSX} from 'react'
import {styled} from 'styled-components'

import Icon from '@components/ui/Icon.tsx'
import Badge from '@components/ui/Badge.tsx'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  .top-bar {
    display: flex;
    align-items: center;
    gap: .8rem;

    span {
      color: var(--color-black-500);
      font-weight: 500;
      font-size: var(--font-size-body-sm);
    }
  }

  .content {
    span {
      font-size: var(--font-size-heading-2);
      font-weight: bold;
    }
  }
`

const RightCol = styled.div`

`

export default function PortfolioValueCrypto(): JSX.Element {
    return (
        <Container>
            <LeftCol>
                <div className={'top-bar'}>
                    <Icon icon_src={'portfolio-value.svg'}
                          width={'20rem'}
                    />
                    <span>PORTFOLIO VALUE</span>
                </div>

                <div className={'content'}>
                    <span>
                        $5,260
                    </span>
                </div>
            </LeftCol>

            <RightCol>
                <Badge borderRadius={'full'}
                       type={'success'}
                       outline>
                    <Icon icon_src={'arrow-up.svg'} width={'12rem'}/>
                    1.37%
                </Badge>
            </RightCol>
        </Container>
    )
}