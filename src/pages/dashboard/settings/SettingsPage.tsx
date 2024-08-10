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
