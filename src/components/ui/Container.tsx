import {styled} from 'styled-components'

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .wrapper {
    width: 95%;
    max-width: 95%;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media (min-width: ${props => props.theme.responsive.sm}) {
    .wrapper {
      width: 57.6rem;
    }
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: ${props => props.theme.responsive.md}) {
    .wrapper {
      width: 76.8rem;
    }
  }

  /*Large devices (desktops, 992px and up)*/
  @media (min-width: ${props => props.theme.responsive.lg}) {
    .wrapper {
      width: 99.2rem;
    }
  }

  /*X-Large devices (large desktops, 1200px and up)*/
  @media (min-width: ${props => props.theme.responsive.xl}) {
    .wrapper {
      width: 120.0rem;
    }
  }

  /*XX-Large devices (larger desktops, 1400px and up)*/
  @media (min-width: ${props => props.theme.responsive.xxl}) {
    .wrapper {
      width: 140.0rem;
    }
  }
`

export default function Container(props: any) {
    const {children} = props

    return (
        <ContainerStyled>
            <div className={'wrapper'}>
                {children}
            </div>
        </ContainerStyled>
    )
}