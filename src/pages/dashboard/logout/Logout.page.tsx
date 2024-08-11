import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { format } from 'date-fns';

import Button from '@/components/ui/stuff/Button';
import Heading from '@/components/ui/stuff/Heading';

import useSignout from '@/libs/hooks/useSignout';

import { DashboardPageLoaderResponse } from '@layouts/Dashboard.layout';

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

   .last-login-time {
      text-align: center;
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
      setTimeout(async () => {
         const { error } = await signout();
         if (error) setIsLoading(false);
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
            <Heading className="title" tagName="h5" fontWeight="bold">
               Oh, Do you want to logout?
            </Heading>
            <br />
            <Button
               borderRadius="lg"
               variant="danger"
               onClickHandler={onSignoutClick}
               disabled={isLoading}
               expanded
            >
               Yes, Log me out please
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

            <span className="last-login-time">
               Last login: {format(String(user?.last_sign_in_at), 'PPPPp')}
            </span>
         </CardWrapper>
      </LogoutContainer>
   );
}
