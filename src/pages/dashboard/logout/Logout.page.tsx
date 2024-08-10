import Button from '@/components/ui/stuff/Button';
import Heading from '@/components/ui/stuff/Heading';
import useSignout from '@/libs/hooks/useSignout';
import useAuth from '@/libs/hooks/useSignout';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
   const { signout } = useSignout();

   const onSignoutClick = () => signout();

   return (
      <LogoutContainer>
         <CardWrapper>
            <div className="img-wrapper">
               <img
                  src="/images/illustrations/message-in-a-bottle.svg"
                  alt=""
               />
            </div>
            <Button
               borderRadius="lg"
               variant="black"
               onClickHandler={onSignoutClick}
               expanded
            >
               Logout
            </Button>
            <Link to={'/dashboard'} className="back-to-dashboard">
               <Button borderRadius="lg" variant="black" outline expanded>
                  Back to Dashboard
               </Button>
            </Link>
         </CardWrapper>
      </LogoutContainer>
   );
}
