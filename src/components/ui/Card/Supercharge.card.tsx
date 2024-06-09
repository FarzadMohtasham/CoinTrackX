import {JSX} from 'react'
import {styled} from 'styled-components'

import Heading from '@components/ui/Heading.tsx'

type SuperchargePropsType = {
    imgSrc: string;
    title: string;
    desc: string;
}

const SuperChargedStyled = styled.div`
  padding: 4.8rem;
  border-radius: 2.4rem;
  -webkit-box-shadow: 0 0 80px 0 rgba(82, 53, 232, 0.1);
  -moz-box-shadow: 0 0 80px 0 rgba(82, 53, 232, 0.1);
  box-shadow: 0 0 80px 0 rgba(82, 53, 232, 0.1);
  border: #EFEDFD .2rem solid;

  img {
    width: 100%;
    border-radius: 2.4rem;
    margin-bottom: 3.2rem;
  }

  .card-heading {
    margin-bottom: 1.6rem;
  }
`

export default function SuperchargeCard(props: SuperchargePropsType): JSX.Element {
    const {
        imgSrc = '',
        title = '',
        desc = ''
    }: SuperchargePropsType = props

    return (
        <SuperChargedStyled>
            <img src={imgSrc}
                 alt={title}/>
            <Heading fontWeight={'500'}
                     className={'card-heading'}
                     headingType={'h4'}>{title}</Heading>
            <p>{desc}</p>
        </SuperChargedStyled>
    )
}