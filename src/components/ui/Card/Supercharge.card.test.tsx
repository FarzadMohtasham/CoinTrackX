import {render, screen} from '@testing-library/react'
import SuperchargeCard from './Supercharge.card.tsx'

test('Supercharge UI Component Test', (): void => {
    render(
        <SuperchargeCard imgSrc={''}
                         title={'supercharge card title'}
                         desc={'supercharge card desc'}/>
    )
    const cardTitle: Promise<HTMLElement> = screen.findByText('supercharge card title')
    const cardDesc: Promise<HTMLElement> = screen.findByText('supercharge card desc')
    expect(cardTitle).toBeInTheDocument()
    expect(cardDesc).toBeInTheDocument()
})