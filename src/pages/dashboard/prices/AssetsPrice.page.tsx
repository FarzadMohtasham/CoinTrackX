import {JSX, useState} from "react";
import {styled} from 'styled-components'

import TopMovers from '@components/dashboard/prices/TopMovers.tsx'
import PricesTable from '@components/dashboard/prices/PricesTable.tsx'
import SimpleNotification from '@components/ui/notifs/Simple-Notification.notif.tsx'
import {NotificationOptions} from '@typings/component-types/Notification.type.ts'
import Icon from '@components/ui/stuff/Icon.tsx'

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

const SimpleNotifOptions: NotificationOptions = {
    id: 0,
    iconSrc: 'watchlist.svg',
    title: 'Follow your favorite cryptos with Watchlist',
    message: <>Tap the <Icon iconSrc={'watchlist-gray.svg'} width={'15rem'}/> at the right of an asset’s list to add to
        your Watchlist.</>,
    type: 'info',
    closable: false,
    createdAt: null,
    width: '100%',
    height: 'max-content',
    iconSize: '5rem',
    closeIconSize: '10rem',
}

export default function Prices(): JSX.Element {
    const [hasError, setHasError] = useState<boolean>(false)

    return (
        <PricesContainer>
            <SimpleNotification options={SimpleNotifOptions}/>

            <TopMoversWrapper>
                <TopMovers setHasError={setHasError}/>
            </TopMoversWrapper>

            {
                !hasError &&
                <PricesWrapper>
                    <PricesTable/>
                </PricesWrapper>
            }
        </PricesContainer>
    )
}