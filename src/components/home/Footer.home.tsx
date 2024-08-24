import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Container from '@components/ui/stuff/Container.tsx';
import Logo from '@components/ui/stuff/Logo.tsx';
import CopyRight from '@components/ui/stuff/CopyRight.tsx';
import Heading from '@components/ui/stuff/Heading.tsx';

// Type
import { ColumnItem as ColumnItemType } from '@typings/components/Footer.type.ts';
import { IStyledComponentBase } from 'styled-components/dist/types.ts';
import { motion } from 'framer-motion';

// Data
import {
   footerColumnItemsList,
   socialMediaLogoList,
} from '@data/footer.data.ts';

const FooterWrapper: IStyledComponentBase<any> = styled.div`
   padding-bottom: 100px;
`;

const FooterStyled: IStyledComponentBase<any> = styled.div`
   background: white;
   border-radius: 24px;
   padding: 64px;
   display: grid;
   width: 100%;

   .brand-info {
      .brand-logo {
         margin-bottom: 24px;
      }

      .social-media {
         display: flex;
         gap: 16px;
         margin-bottom: 48px;

         img {
            width: 20px;
         }
      }
   }

   .footer-column {
      .footer-heading {
         margin-bottom: 16px;
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
   @media screen and (max-width: ${(props: any) =>
         props.theme.breakpoints.md}) {
      grid-template-areas:
         'footer-column-1'
         'footer-column-2'
         'footer-column-3'
         'footer-column-4';
      gap: 15px;
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.md}) {
      grid-template-areas:
         'footer-column-1 footer-column-2'
         'footer-column-3 footer-column-4';
      gap: 25px;
   }

   /*Large devices (desktops, 992px and up)*/
   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.lg}) {
      grid-template-areas: 'footer-column-1 footer-column-2 footer-column-3 footer-column-4';
      gap: 40px;
   }
`;

const ColumnList = styled.ul`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: 8px;
`;

const ColumnItem = styled.li`
   a {
      color: var(--color-black-400);
      font-size: var(--font-size-body-sm);
      font-weight: 500;
      transition: color 0.3s ease-in-out;

      &:hover {
         color: var(--color-black-600);
      }
   }
`;

export default function Footer(): JSX.Element {
   return (
      <Container
         tagType={'footer'}
         backgroundStyle={css`
            background-color: #f7f6fe;
         `}
      >
         <motion.div
            initial={{ y: 200 }}
            whileInView={{ y: 0 }}
            transition={{ type: 'spring' }}
            viewport={{ once: true }}
         >
            <FooterWrapper>
               <FooterStyled>
                  <div className={'footer-column footer-column-1 brand-info'}>
                     <Logo />
                     <div className={'social-media'}>
                        {socialMediaLogoList.map((social, index) => {
                           return (
                              <Link to={'#'} key={social.name + index}>
                                 <img
                                    key={social.name + index}
                                    src={social.logoSrc}
                                    alt={social.name}
                                 />
                              </Link>
                           );
                        })}
                     </div>
                     <CopyRight color={'#9C9CAB'} />
                  </div>

                  <div className={'footer-column footer-column-2'}>
                     <Heading
                        className={'footer-heading'}
                        tagName={'h6'}
                        fontWeight={'500'}
                     >
                        Company
                     </Heading>

                     <ColumnList>
                        {footerColumnItemsList.column1.map(
                           (item: ColumnItemType, index: number) => {
                              return (
                                 <ColumnItem key={item.name + index}>
                                    <Link to={item.address}>{item.name}</Link>
                                 </ColumnItem>
                              );
                           },
                        )}
                     </ColumnList>
                  </div>

                  <div className={'footer-column footer-column-3'}>
                     <Heading
                        className={'footer-heading'}
                        tagName={'h6'}
                        fontWeight={'500'}
                     >
                        Features
                     </Heading>

                     <ColumnList>
                        {footerColumnItemsList.column2.map(
                           (item: ColumnItemType, index: number) => {
                              return (
                                 <ColumnItem key={item.name + index}>
                                    <Link to={item.address}>{item.name}</Link>
                                 </ColumnItem>
                              );
                           },
                        )}
                     </ColumnList>
                  </div>

                  <div className={'footer-column footer-column-4'}>
                     <Heading
                        className={'footer-heading'}
                        tagName={'h6'}
                        fontWeight={'500'}
                     >
                        Resources
                     </Heading>

                     <ColumnList>
                        {footerColumnItemsList.column3.map(
                           (item: ColumnItemType, index: number) => {
                              return (
                                 <ColumnItem key={item.name + index}>
                                    <Link to={item.address}>{item.name}</Link>
                                 </ColumnItem>
                              );
                           },
                        )}
                     </ColumnList>
                  </div>
               </FooterStyled>
            </FooterWrapper>
         </motion.div>
      </Container>
   );
}
