import { JSX } from 'react';
import { styled } from 'styled-components';

import Container from '@/Components/UI/Stuff/Container';

const numbersList: { title: string; desc: string }[] = [
   {
      title: '+100 Coin/Token',
      desc: 'supported',
   },
   {
      title: '50+',
      desc: 'countries supported',
   },
   {
      title: '#1 platform',
      desc: 'crypto tracking',
   },
];

const NumbersContainerStyled = styled.section`
   display: flex;
   justify-content: space-around;
   padding: 48px 0;

   /*Very Small devices (landscape phones, 576px and down)*/
   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      flex-direction: column;
      gap: 50px;
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      flex-direction: row;
   }
`;

const NumberStyled = styled.div`
   text-align: center;

   .title {
      padding-bottom: 8px;
      font-weight: 500;
   }

   .desc {
      display: block;
      color: var(--color-black-500);
   }
`;

export default function Numbers(): JSX.Element {
   return (
      <Container>
         <NumbersContainerStyled>
            {numbersList.map(
               (numberItem: { title: string; desc: string }, index: number) => {
                  return (
                     <NumberStyled key={numberItem.title + index}>
                        <h3 className={'title'}>{numberItem.title}</h3>
                        <span className={'desc'}>{numberItem.desc}</span>
                     </NumberStyled>
                  );
               },
            )}
         </NumbersContainerStyled>
      </Container>
   );
}
