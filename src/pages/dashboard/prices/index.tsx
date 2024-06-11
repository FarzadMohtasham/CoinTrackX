import {JSX} from "react";
import {styled} from 'styled-components'

import TopMovers from '@components/dashboard/prices/TopMovers.tsx'
import PricesTable from '@components/dashboard/prices/PricesTable.tsx'
import SimpleNotification from "@components/ui/notifs/Simple-Notification.notif.tsx";
import {NotificationOptions} from "@typings/type/Notification.type.ts";

const PricesContainer = styled.div`
  padding: 3.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .portfolio-summary {
    margin-bottom: 2.4rem;
  }
`

const PricesWrapper = styled.div`
`

const TopMoversWrapper = styled.div``

export default function Index(): JSX.Element {
    const SimpleNotifOptions: NotificationOptions = {
        id: 0,
        iconSrc: 'watchlist.svg',
        title: 'Follow your favorite cryptos with Watchlist',
        message: 'Tap the star at the right of an asset’s list to add to your Watchlist.',
        type: 'info',
        closable: false,
        createdAt: new Date(),
        width: '100%',
        height: 'max-content',
        iconSize: '5rem',
        closeIconSize: '10rem',
    }

    return (
        <PricesContainer>
            <SimpleNotification options={SimpleNotifOptions}/>

            <TopMoversWrapper>
                <TopMovers/>
            </TopMoversWrapper>

            <PricesWrapper>
                <PricesTable/>
            </PricesWrapper>
        </PricesContainer>
    )
}