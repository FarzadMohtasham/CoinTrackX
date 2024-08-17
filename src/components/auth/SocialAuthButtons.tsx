import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../ui/stuff/Button';

const Container = styled.div`
   display: flex;
   gap: 15px;
`;

const app_mode = import.meta.env.MODE;
let redirectToUrlAfterAuth: string = '';
if (app_mode === 'development')
   redirectToUrlAfterAuth = 'http://localhost:3000/dashboard';
else redirectToUrlAfterAuth = 'https://coin-track-x.vercel.app/dashboard';

export default function SocialAuthButtons() {
   const { mutateAsync: githubLoginMutation, isPaused: githubIsPending } =
      useMutation({
         mutationFn: async () => {
            await supabaseClient.auth.signInWithOAuth({
               provider: 'github',
               options: {
                  redirectTo: redirectToUrlAfterAuth,
               },
            });
         },
         onError: () => {
            toast.error('Failed to login with Github, Please try again.');
         },
      });

   const { mutateAsync: googleLoginMutation, isPending: googleIsPending } =
      useMutation({
         mutationFn: async () => {
            await supabaseClient.auth.signInWithOAuth({
               provider: 'google',
               options: {
                  redirectTo: redirectToUrlAfterAuth,
               },
            });
         },
         onError: () => {
            toast.error('Failed to login with Google, Please try again.');
         },
      });

   return (
      <Container>
         <Button
            borderRadius={'lg'}
            onClickHandler={githubLoginMutation}
            icon={'github-logo.svg'}
            variant={'black'}
            disabled={githubIsPending}
            expanded
            outline
         >
            Github
         </Button>
         <Button
            borderRadius={'lg'}
            onClickHandler={googleLoginMutation}
            icon={'google-logo.png'}
            variant={'black'}
            disabled={googleIsPending}
            expanded
            outline
         >
            Google
         </Button>
      </Container>
   );
}
