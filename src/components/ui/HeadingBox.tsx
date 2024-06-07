import {JSX} from 'react'
import {styled} from 'styled-components'

import {HeadingBoxType} from '@ts/type/HeadingBox.type.ts'

const HeadingBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 4.8rem;
`

const LabelStyled = styled.span`
  text-transform: uppercase;
  color: var(--color-primary);
  display: block;
  text-align: center;
`

const HeadingStyled = styled.h2`
  text-align: center;
  font-weight: 500;
`

const DescStyled = styled.p`
  text-align: center;
  color: var(--color-black-500);
  font-size: var(--font-size-body-md);
  font-weight: 500;
`

export default function HeadingBox(props: HeadingBoxType): JSX.Element {
    const {
        label = null,
        heading = null,
        desc = null,
        headingTag = 'h3',
    }: HeadingBoxType = props

    return (
        <HeadingBoxStyled>
            {label && <LabelStyled>{label}</LabelStyled>}
            {heading && <HeadingStyled as={headingTag}>{heading}</HeadingStyled>}
            {desc && <DescStyled>{desc}</DescStyled>}
        </HeadingBoxStyled>
    )
}