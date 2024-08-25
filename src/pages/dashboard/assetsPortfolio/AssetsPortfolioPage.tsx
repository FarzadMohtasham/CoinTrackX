import { styled } from 'styled-components';
import { JSX } from 'react';
import AssetsPortfolioHeader from '@/components/dashboard/assets-portfolio/AssetsPortfolioHeader';
import AssetsPortfolioTable from '@/components/dashboard/assets-portfolio/AssetsPortfolioTable';

const AssetsPortfolioContainer = styled.div`
   padding: 32px 20px;
`;

export default function AssetsPortfolioPage(): JSX.Element {
   return (
      <AssetsPortfolioContainer>
         <AssetsPortfolioHeader />
         <AssetsPortfolioTable />
      </AssetsPortfolioContainer>
   );
}
