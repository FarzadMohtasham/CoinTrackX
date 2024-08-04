import { JSX } from 'react';
import { css, styled } from 'styled-components';

import Container from '@components/ui/stuff/Container.tsx';
import HeadingBox from '@components/ui/stuff/HeadingBox.tsx';
import Review from '@components/ui/stuff/Review.tsx';

import { Review as ReviewType } from '@typings/components/Review.type.ts';

const reviewsList: ReviewType[] = [
   {
      numberOfStars: 5,
      quote: '“Cool crypto currency, fast withdrawals and deposits, way better, than any wallet.”',
      author: {
         imgSrc: '/images/review1.author.home.png',
         name: 'Abel Sheldon',
         job: 'Entrepreneur',
      },
   },
   {
      numberOfStars: 5,
      quote: '“It’s worth it, very intuitive and easy to learn about cryptocurrencies.”',
      author: {
         imgSrc: '/images/review2.author.home.png',
         name: 'John Clayton',
         job: 'Investor',
      },
   },
   {
      numberOfStars: 4,
      quote: '“Best customer service so far. Amazing in.html all areas best centralized exchange.”',
      author: {
         imgSrc: '/images/review3.author.home.png',
         name: 'Savanna Bridgers',
         job: 'Founder',
      },
   },
];

const TestimonialsWrapper = styled.div.attrs({
   id: 'testimonials',
})`
   padding: 100px 0;
   display: flex;
   flex-direction: column;

   .reviews {
      display: flex;
      justify-content: space-between;
      gap: 32px;

      .review {
      }
   }

   /*Very Small devices (landscape phones, 768px and down)*/
   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      .reviews {
         flex-direction: column;
      }
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      .reviews {
         flex-direction: row;
      }
   }
`;

export default function Testimonials(): JSX.Element {
   return (
      <Container
         backgroundStyle={css`
            background: linear-gradient(to top, #f7f6fe, #ffffff);
         `}
      >
         <TestimonialsWrapper>
            <HeadingBox
               label={'TESTIMONIALS'}
               heading={'Trusted by more than 100K+ people'}
               desc={
                  'Hear what they say about us and why you should choose Coinbank'
               }
            />

            <div className={'reviews'}>
               {reviewsList.map((review, index) => {
                  return (
                     <Review {...review} key={review.author.name + index} />
                  );
               })}
            </div>
         </TestimonialsWrapper>
      </Container>
   );
}
