import { JSX, useState } from 'react';
import { styled } from 'styled-components';

import TopMovers from '@/Components/Dashboard/Prices/TopMovers';
import PricesTable from '@/Components/Dashboard/Prices/PricesTable';
import SimpleNotification from '@/Components/UI/Notifications/Simple-Notification.notif';
import { NotificationOptions } from '@/Lib/Typings/Components/Notification.type';
import Icon from '@/Components/UI/Stuff/Icon';

const PricesContainer = styled.div`
   padding: 32px 20px;
   display: flex;
   flex-direction: column;
   gap: 40px;

   .portfolio-summary {
      margin-bottom: 24px;
   }
`;

const PricesWrapper = styled.div``;

const TopMoversWrapper = styled.div``;

const SimpleNotifOptions: NotificationOptions = {
   id: 0,
   iconSrc: 'watchlist.svg',
   title: 'Follow your favorite cryptos with Watchlist',
   message: (
      <>
         Tap the <Icon iconSrc={'watchlist-gray.svg'} width={'15px'} /> at the
         right of an asset’s list to add to your Watchlist.
      </>
   ),
   type: 'info',
   closable: false,
   createdAt: null,
   width: '100%',
   height: 'max-content',
   iconSize: '40px',
   closeIconSize: '100px',
};

export default function AssetsPricePage(): JSX.Element {
   const [hasError, setHasError] = useState<boolean>(false);

   return (
      <PricesContainer>
         <SimpleNotification options={SimpleNotifOptions} />

         <TopMoversWrapper>
            <TopMovers setHasError={setHasError} />
         </TopMoversWrapper>

         {!hasError && (
            <PricesWrapper>
               <PricesTable />
            </PricesWrapper>
         )}
      </PricesContainer>
   );
}
