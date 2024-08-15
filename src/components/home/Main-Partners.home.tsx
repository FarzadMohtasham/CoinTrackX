import React, { JSX } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import Container from '@components/ui/stuff/Container.tsx';
import HeadingBox from '@components/ui/stuff/HeadingBox.tsx';

const PartnersContainer = styled.section.attrs({
   id: 'partners',
})`
   padding-top: 100px;
   padding-bottom: 48px;
`;

const Brands = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 80px;

   /*Small devices (landscape phones, 768px and down)*/
   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      flex-direction: column;
      gap: 50px;
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      flex-direction: row;
   }
`;

const Brand = styled.div`
   img {
      width: 164px;
   }
`;

export default function Partners(): JSX.Element {
   return (
      <Container>
         <PartnersContainer>
            <HeadingBox
               label={'partners'}
               heading={'We’re backed by the bests of the world!'}
               desc={'Trusted by these blockchains leading industries'}
               headingTag={'h3'}
            />

            <Brands>
               <Brand>
                  <BrandImgMotion imgSrc="/images/logo1.brand.home.svg" />
               </Brand>
               <Brand>
                  <BrandImgMotion imgSrc="/images/logo2.brand.home.svg" />
               </Brand>
               <Brand>
                  <BrandImgMotion imgSrc="/images/logo3.brand.home.svg" />
               </Brand>
               <Brand>
                  <BrandImgMotion imgSrc="/images/logo4.brand.home.svg" />
               </Brand>
            </Brands>
         </PartnersContainer>
      </Container>
   );
}

const BrandImgMotion = (props: { imgSrc: string }) => {
   return (
      <motion.img
         src={props.imgSrc}
         alt=""
         initial={{ opacity: 0, scale: 0 }}
         whileInView={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
         viewport={{ once: true }}
         whileHover={{ scale: 1.2 }}
         whileTap={{ scale: 0.8 }}
         dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
         }}
         drag
      />
   );
};
