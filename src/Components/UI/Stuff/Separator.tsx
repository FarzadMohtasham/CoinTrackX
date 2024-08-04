import { JSX } from 'react';
import { styled } from 'styled-components';

type SeparatorProps = {
   title: string;
};

const VerticalLine = styled.div`
   background-color: var(--color-black-100);
   width: 100%;
   height: 1px;
   border-radius: 100px;
`;

const SeparatorContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;

   span {
      color: var(--color-black-200);
      font-weight: 500;
   }
`;

export default function Separator(props: SeparatorProps): JSX.Element {
   return (
      <SeparatorContainer>
         <VerticalLine />
         <span>{props.title}</span>
         <VerticalLine />
      </SeparatorContainer>
   );
}
