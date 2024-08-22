import TransactionsHeader from '@/components/dashboard/settings/transactions/TransactionsHeader';
import TransactionsTable from '@/components/dashboard/settings/transactions/TransactionsTable';
import { JSX } from 'react';
import { styled } from 'styled-components';

const TransactionsContainer = styled.div``;

export default function TransactionsPage(): JSX.Element {
   return (
      <TransactionsContainer className="flex flex-col gap-6 max-sm:p-3 sm:py-[32px] sm:px-[20px]">
         <TransactionsHeader />

         <TransactionsTable />
      </TransactionsContainer>
   );
}
