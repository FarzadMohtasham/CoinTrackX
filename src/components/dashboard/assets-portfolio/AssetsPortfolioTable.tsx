import { DashboardPageLoaderResponse } from '@/layouts/Dashboard.layout';
import { calcTransactionsProfitLoss } from '@/libs/utils/portfolio-utils/CalcTransactionsProfitLoss';
import { sortTransactionsByAsset } from '@/libs/utils/portfolio-utils/SortTransactionsByAsset';
import { getTransactionsQuery } from '@/queries/transactions/getTransactions.query';
import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

export default function AssetsPortfolioTable() {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;

   // const [tableData, setTableData] = useState([]);

   const { data: transactionsData, isLoading: transactionsDataIsLoading } =
      getTransactionsQuery(user?.id || '');

   useEffect(() => {
      const handleUseEffect = async () => {
         const sortedTransactionsByAsset = await sortTransactionsByAsset(
            transactionsData || [],
         );

         const calculatedTransactionsProfitLoss =
            await calcTransactionsProfitLoss(sortedTransactionsByAsset);

         console.log(
            sortedTransactionsByAsset,
            calculatedTransactionsProfitLoss,
         );
      };

      if (transactionsData?.length !== 0 && !transactionsDataIsLoading) {
         handleUseEffect();
      }
   }, [transactionsData, transactionsDataIsLoading]);

   return <div>AssetsPortfolioTable</div>;
}
