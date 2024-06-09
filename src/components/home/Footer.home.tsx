import {JSX} from 'react'
import {Link} from 'react-router-dom'
import {styled, css, ExecutionContext, FastOmit} from 'styled-components'

import Container from '@components/ui/Container.tsx'
import Logo from '@components/ui/Logo.tsx'
import CopyRight from '@components/ui/CopyRight.tsx'
import Heading from '@components/ui/Heading.tsx'

// Type
import {ColumnItem as ColumnItemType} from '@ts/type/Footer.type.ts'
import {IStyledComponentBase} from "styled-components/dist/types";

// Data
import {footerColumnItemsList, socialMediaLogoList} from '@data/Footer.data.ts'

const FooterWrapper: IStyledComponentBase<any> = styled.div`
  padding-bottom: 10rem;
`

const FooterStyled: IStyledComponentBase<any> = styled.div`
  background: white;
  border-radius: 2.4rem;
  padding: 6.4rem;
  display: grid;
  width: 100%;

  .brand-info {
    .brand-logo {
      margin-bottom: 2.4rem;
    }

    .social-media {
      display: flex;
      gap: 1.6rem;
      margin-bottom: 4.8rem;

      img {
        width: 2rem;
      }
    }
  }

  .footer-column {
    .footer-heading {
      margin-bottom: 1.6rem;
    }
  }

  .footer-column-1 {
    grid-area: footer-column-1;
  }

  .footer-column-2 {
    grid-area: footer-column-2;
  }

  .footer-column-3 {
    grid-area: footer-column-3;
  }

  .footer-column-4 {
    grid-area: footer-column-4;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media screen and (max-width: ${(props: ExecutionContext & FastOmit<any, any>) => props.theme.responsive.md}) {
    grid-template-areas: 'footer-column-1'
                         'footer-column-2'
                         'footer-column-3'
                         'footer-column-4';
    gap: 1.5rem;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${(props: ExecutionContext & FastOmit<any, any>) => props.theme.responsive.md}) {
    grid-template-areas: 'footer-column-1 footer-column-2'
                          'footer-column-3 footer-column-4';
    gap: 2.5rem;
  }

  /*Large devices (desktops, 992px and up)*/
  @media screen and (min-width: ${(props: ExecutionContext & FastOmit<any, any>) => props.theme.responsive.lg}) {
    grid-template-areas: 'footer-column-1 footer-column-2 footer-column-3 footer-column-4';
    gap: 4rem;
  }
`

const ColumnList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .8rem;
`

const ColumnItem = styled.li`
  a {
    color: var(--color-black-400);
    font-size: var(--font-size-body-sm);
    font-weight: 500;
    transition: color .3s ease-in-out;

    &:hover {
      color: var(--color-black-600);
    }
  }
`

export default function Footer(): JSX.Element {
    return (
        <Container tagType={'footer'}
                   backgroundStyle={css`background-color: #f7f6fe;`}>
            <FooterWrapper>
                <FooterStyled>
                    <div className={'footer-column footer-column-1 brand-info'}>
                        <Logo/>
                        <div className={'social-media'}>
                            {
                                socialMediaLogoList.map((social, index) => {
                                    return (
                                        <Link to={'#'} key={social.name + index}>
                                            <img key={social.name + index}
                                                 src={social.logoSrc}
                                                 alt={social.name}/>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <CopyRight color={'#9C9CAB'}/>
                    </div>

                    <div className={'footer-column footer-column-2'}>
                        <Heading className={'footer-heading'}
                                 headingType={'h6'}
                                 fontWeight={'500'}>
                            Company
                        </Heading>

                        <ColumnList>
                            {
                                footerColumnItemsList.column1.map((item: ColumnItemType, index: number) => {
                                    return (
                                        <ColumnItem key={item.name + index}>
                                            <Link to={item.address}>
                                                {item.name}
                                            </Link>
                                        </ColumnItem>
                                    )
                                })
                            }
                        </ColumnList>
                    </div>

                    <div className={'footer-column footer-column-3'}>
                        <Heading className={'footer-heading'}
                                 headingType={'h6'}
                                 fontWeight={'500'}>
                            Features
                        </Heading>

                        <ColumnList>
                            {
                                footerColumnItemsList.column2.map((item: ColumnItemType, index: number) => {
                                    return (
                                        <ColumnItem key={item.name + index}>
                                            <Link to={item.address}>
                                                {item.name}
                                            </Link>
                                        </ColumnItem>
                                    )
                                })
                            }
                        </ColumnList>
                    </div>

                    <div className={'footer-column footer-column-4'}>
                        <Heading className={'footer-heading'}
                                 headingType={'h6'}
                                 fontWeight={'500'}>
                            Resources
                        </Heading>

                        <ColumnList>
                            {
                                footerColumnItemsList.column3.map((item: ColumnItemType, index: number) => {
                                    return (
                                        <ColumnItem key={item.name + index}>
                                            <Link to={item.address}>
                                                {item.name}
                                            </Link>
                                        </ColumnItem>
                                    )
                                })
                            }
                        </ColumnList>
                    </div>
                </FooterStyled>
            </FooterWrapper>
        </Container>
    )
}