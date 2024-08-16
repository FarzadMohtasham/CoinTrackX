import { JSX } from 'react';
import { css, styled } from 'styled-components';

import Container from '@components/ui/stuff/Container.tsx';
import HeadingBox from '@components/ui/stuff/HeadingBox.tsx';
import { string } from 'yup';
import { motion } from 'framer-motion';

const coinsSrcList = [
   '/images/dogecoin.coin.home.svg',
   '/images/act.coin.home.svg',
   '/images/btc.coin.home.svg',
   '/images/eth.coin.home.svg',
   '/images/gusd.coin.home.svg',
   '/images/ogn.coin.home.svg',
   '/images/xrp.coin.home.svg',
];

const CoinsWrapperStyled = styled.section.attrs({
   id: 'coins',
})`
   padding-top: 100px;
   padding-bottom: 48px;
   display: flex;
   flex-direction: column;
   gap: 80px;
   align-items: center;
`;

const CoinsListStyled = styled.div`
   display: grid;
   gap: 50px;
   padding: 30px 40px;
   background-color: white;
   width: max-content;
   height: max-content;

   img {
      width: 80px;
   }

   /*Very Small devices (landscape phones, 768px and down)*/
   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      grid-template-areas:
         'a b'
         'c d'
         'e f'
         'g .';
      border-radius: 30px;
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      grid-template-areas: 'a b c d e f g';
      border-radius: 1000px;
   }
`;

export default function Coins(): JSX.Element {
   return (
      <Container
         backgroundStyle={css`
            background: linear-gradient(to bottom, #efedfd, #ffffff);
         `}
      >
         <CoinsWrapperStyled>
            <HeadingBox
               label={'Coins'}
               heading={'A lot of coin & tokens!'}
               desc={
                  'As a crypto-Currency tracking platform, We should support a lot of coin and tokens for make customers and clients happy'
               }
            />

            <CoinsListStyled>
               {coinsSrcList.map((coinSrc, index) => {
                  return (
                     <motion.img
                        key={coinSrc + index}
                        src={coinSrc}
                        alt="crypto coin"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.05, 1] }} // Scale up to 1.1 then back to 1
                        transition={{
                           duration: 1, // Duration of one cycle
                           repeat: Infinity, // Repeat infinitely
                           repeatType: 'mirror', // Reverse animation for each repeat
                           ease: 'easeInOut', // Smooth transition
                        }}
                        dragConstraints={{
                           bottom: 0,
                           left: 0,
                           right: 0,
                           top: 0,
                        }}
                        drag
                     />
                  );
               })}
            </CoinsListStyled>
         </CoinsWrapperStyled>
      </Container>
   );
}
