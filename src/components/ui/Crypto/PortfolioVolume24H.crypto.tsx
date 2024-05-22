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
      font-weight: 500;
      color: var(--color-black-500);
      font-size: var(--font-size-body-sm);
    }
  }

  .content {
    span {
      font-weight: bold;
      font-size: var(--font-size-heading-2);
    }
  }
`

const RightCol = styled.div`

`

export default function PortfolioVolume24HCrypto() {
    return (
        <Container>
            <LeftCol>
                <div className={'top-bar'}>
                    <Icon icon_src={'portfolio-volume.svg'}
                          width={'20rem'}
                    />
                    <span>VOLUME (24H)</span>
                </div>

                <div className={'content'}>
                    <span>
                        $7,472
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