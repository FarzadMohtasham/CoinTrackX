import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';

import Button from '@/components/ui/stuff/Button';

import useSignout from '@/libs/hooks/useSignout';

import { DashboardPageLoaderResponse } from '../../../layouts/Dashboard.layout';

const LogoutContainer = styled.div`
   width: 100%;
   height: 100%;
   display: grid;
   place-content: center;
`;

const CardWrapper = styled.div`
   padding: 20px;
   background-color: #fffffff0;
   border: 2px solid var(--color-black-50);
   border-radius: 20px;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 25px 20px -20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
   width: 375px;

   .img-wrapper {
      img {
         width: 250px;
      }
   }

   .back-to-dashboard {
      width: 100%;
   }
`;

export default function LogoutPage() {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;
   const navigate = useNavigate();
   const { signout } = useSignout();

   const [isLoading, setIsLoading] = useState(false);

   const onSignoutClick = () => {
      setIsLoading(true);
      setTimeout(() => {
         signout();
         setIsLoading(false);
      }, 1000);
   };

   const backToDashboard = () => navigate('/dashboard');

   return (
      <LogoutContainer>
         <CardWrapper>
            <div className="img-wrapper">
               <img
                  src="/images/illustrations/message-in-a-bottle.svg"
                  alt="message-in-a-bottle"
               />
            </div>
            <Button
               borderRadius="lg"
               variant="danger"
               onClickHandler={onSignoutClick}
               disabled={isLoading}
               expanded
            >
               Yes, Log me out
            </Button>
            <Button
               borderRadius="lg"
               variant="black"
               onClickHandler={backToDashboard}
               disabled={isLoading}
               outline
               expanded
            >
               No, Back to Dashboard
            </Button>

            <span className="last-login-time">last Login: {}</span>
         </CardWrapper>
      </LogoutContainer>
   );
}
