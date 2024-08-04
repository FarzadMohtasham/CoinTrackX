import { JSX } from 'react';
import { styled } from 'styled-components';

import Heading from './Heading.tsx';

import { Review as ReviewProps } from '@typings/components/Review.type.ts';

const FILLED_STAR_ICON_URL = '/icons/star-filled.svg';
const UNFILLED_STAR_ICON_URL = '/icons/star-unfilled.svg';

const ReviewStyled = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   background: white;
   border-radius: 16px;
   padding: 48px;

   .stars {
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      gap: 12px;
      margin-bottom: 48px;

      img {
         width: 18px;
      }
   }

   .quote {
      text-align: center;
      margin-bottom: 42px;
   }

   .review-author {
      display: flex;
      align-items: center;
      gap: 16px;

      img {
         width: 40px;
      }

      .author-info {
         display: flex;
         flex-direction: column;

         .name {
            font-size: var(--font-size-body-sm);
            font-weight: bold;
         }

         .job {
            font-size: var(--font-size-body-xsm);
         }
      }
   }
`;

export default function Review(props: ReviewProps): JSX.Element {
   const { numberOfStars, quote, author } = props;

   return (
      <ReviewStyled className={'review'}>
         <div className="stars">
            {[...Array(5 - numberOfStars + numberOfStars).keys()].map(
               (_: unknown, index: number): JSX.Element => {
                  return index + 1 <= numberOfStars ? (
                     <img
                        src={FILLED_STAR_ICON_URL}
                        alt={'filled star'}
                        key={'star-filled-' + index}
                     />
                  ) : (
                     <img
                        src={UNFILLED_STAR_ICON_URL}
                        alt={'filled star'}
                        key={'star-filled-' + index}
                     />
                  );
               },
            )}
         </div>

         <Heading className={'quote'} tagName={'h6'}>
            {quote}
         </Heading>

         <div className="review-author">
            <img src={author.imgSrc} alt="" />

            <div className="author-info">
               <span className="name">{author.name}</span>

               <span className="job">{author.job}</span>
            </div>
         </div>
      </ReviewStyled>
   );
}
