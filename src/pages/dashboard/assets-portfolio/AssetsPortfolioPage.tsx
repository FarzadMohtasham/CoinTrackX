import { styled } from 'styled-components';
import { JSX } from 'react';

const AssetsPortfolioContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(9, 1fr);
   padding: 32px 20px;
`;

const AssetsPortfolioWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 40px;

   @media screen and (max-width: ${(props: any) =>
         props.theme.breakpoints.sm}) {
      grid-column: 1 / 10;
   }

   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.sm}) {
      grid-column: 2 / 9;
   }

   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.lg}) {
      grid-column: 3 / 8;
   }
`;

export default function AssetsPortfolioPage(): JSX.Element {
   return (
      <AssetsPortfolioContainer>
         <AssetsPortfolioWrapper>AssetsPortfolio</AssetsPortfolioWrapper>
      </AssetsPortfolioContainer>
   );
}
