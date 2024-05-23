import {styled} from 'styled-components'

import {ContainerPropsType, ContainerStyledProps} from '@ts/type/ContainerProps.type.ts'

const ContainerStyled = styled.div<ContainerStyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${props => props.$background_style}
  .wrapper {
    width: 95%;
    max-width: 95%;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.sm}) {
    .wrapper {
      width: 57.6rem;
    }
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.md}) {
    .wrapper {
      width: 76.8rem;
    }
  }

  /*Large devices (desktops, 992px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.lg}) {
    .wrapper {
      width: 99.2rem;
    }
  }

  /*X-Large devices (large desktops, 1200px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.xl}) {
    .wrapper {
      width: 120.0rem;
    }
  }

  /*XX-Large devices (larger desktops, 1400px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.xxl}) {
    .wrapper {
      width: 140.0rem;
    }
  }
`

export default function Container(props: ContainerPropsType) {
    const {
        children,
        background_style = '',
        tag_type = 'div'
    } = props

    return (
        // @ts-ignore
        <ContainerStyled $background_style={background_style}
                         as={tag_type}>
            <div className={'wrapper'}>
                {children}
            </div>
        </ContainerStyled>
    )
}