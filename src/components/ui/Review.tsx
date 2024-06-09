import {styled} from 'styled-components'

import {Review as ReviewProps} from '@ts/type/Review.type.ts'
import Heading from './Heading.tsx'
import {JSX} from "react";

const FILLED_STAR_ICON_URL = '/icons/star-filled.svg'
const UNFILLED_STAR_ICON_URL = '/icons/star-unfilled.svg'

const ReviewStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 1.6rem;
  padding: 4.8rem;

  .stars {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    gap: 1.2rem;
    margin-bottom: 4.8rem;

    img {
      width: 1.8rem;
    }

  }

  .quote {
    text-align: center;
    margin-bottom: 4.2rem;
  }

  .review-author {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    img {
      width: 4rem;
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
`

export default function Review(props: ReviewProps): JSX.Element {
    const {numberOfStars, quote, author} = props

    return (
        <ReviewStyled className={'review'}>
            <div className="stars">
                {
                    [...Array((5 - numberOfStars) + numberOfStars).keys()].map((_: unknown, index: number): JSX.Element => {
                        return (
                            (index + 1) <= numberOfStars ?
                                <img src={FILLED_STAR_ICON_URL}
                                     alt={'filled star'}
                                     key={'star-filled-' + index}/>
                                :
                                <img src={UNFILLED_STAR_ICON_URL}
                                     alt={'filled star'}
                                     key={'star-filled-' + index}/>
                        )
                    })
                }
            </div>

            <Heading className={'quote'} headingType={'h6'}>
                {quote}
            </Heading>

            <div className="review-author">
                <img src={author.imgSrc} alt=""/>

                <div className="author-info">
                    <span className="name">
                        {author.name}
                    </span>

                    <span className="job">
                        {author.job}
                    </span>
                </div>
            </div>
        </ReviewStyled>
    )
}