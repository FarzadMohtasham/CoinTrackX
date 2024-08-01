import { JSX } from 'react';
import { styled } from 'styled-components';

import Heading from '@/Components/UI/Stuff/Heading';

type SuperchargePropsType = {
   imgSrc: string;
   title: string;
   desc: string;
};

const SuperChargedStyled = styled.div`
   padding: 48px;
   border-radius: 24px;
   -webkit-box-shadow: 0 0 80px 0 rgba(82, 53, 232, 0.1);
   -moz-box-shadow: 0 0 80px 0 rgba(82, 53, 232, 0.1);
   box-shadow: 0 0 80px 0 rgba(82, 53, 232, 0.1);
   border: #efedfd 2px solid;

   img {
      width: 100%;
      border-radius: 24px;
      margin-bottom: 32px;
   }

   .card-heading {
      margin-bottom: 16px;
   }
`;

export default function SuperchargeCard(
   props: SuperchargePropsType,
): JSX.Element {
   const { imgSrc = '', title = '', desc = '' }: SuperchargePropsType = props;

   return (
      <SuperChargedStyled>
         <img src={imgSrc} alt={title} />
         <Heading fontWeight={'500'} className={'card-heading'} tagName={'h4'}>
            {title}
         </Heading>
         <p>{desc}</p>
      </SuperChargedStyled>
   );
}
