import { JSX } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import useUserProfile from '@/queries/auth/useUserProfile.query';

type ProfileStyledProps = {
   $imgSrc: string;
   $userNameFirstLetter: string;
};

const ProfileStyled = styled.div<ProfileStyledProps>`
   width: 40px;
   height: 40px;
   background-image: url(${(props: any) => props.$imgSrc}),
      linear-gradient(to top, black, black);
   background-position: center center;
   background-size: 100% 100%;
   object-fit: cover;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   object-fit: cover;

   &::before {
      content: ${(props) => props.$userNameFirstLetter};
      color: white;
   }
`;

export default function Profile(): JSX.Element {
   const { data: userProfile } = useUserProfile();

   let userNameFirstLetter = '';
   if (userProfile?.last_name)
      userNameFirstLetter = userProfile.last_name.split('')[0];
   if (userProfile?.display_name)
      userNameFirstLetter = userProfile.display_name.split('')[0];
   if (userProfile?.first_name)
      userNameFirstLetter = userProfile.first_name.split('')[0];

   return (
      <Link to={'/dashboard/settings/profile'}>
         <ProfileStyled
            $imgSrc={
               userProfile?.profile_img_url ||
               'https://zwrleecsvygsftotatty.supabase.co/storage/v1/object/public/CoinTrackX/blank-profile.png?t=2024-07-19T12%3A39%3A44.706Z'
            }
            $userNameFirstLetter={userNameFirstLetter}
         />
      </Link>
   );
}
