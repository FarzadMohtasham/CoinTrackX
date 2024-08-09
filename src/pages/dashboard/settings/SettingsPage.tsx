import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import { User } from '@supabase/supabase-js';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const SettingsContainer = styled.div``;

export default function SettingsPage(): JSX.Element {
   return (
      <SettingsContainer>
         <Outlet />
      </SettingsContainer>
   );
}

export type SettingsPageLoaderResponse = {
   user: User | null;
};

export const SettingsLoader = async (): Promise<SettingsPageLoaderResponse> => {
   const user = await supabaseClient.auth.getUser();

   return { user: user.data.user };
};
