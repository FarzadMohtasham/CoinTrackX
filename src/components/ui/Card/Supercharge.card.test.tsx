import {render, screen} from '@testing-library/react'
import SuperchargeCard from './Supercharge.card.tsx'

test('Supercharge UI Component Test', () => {
    render(
        <SuperchargeCard imgSrc={''}
                         title={'supercharge card title'}
                         desc={'supercharge card desc'}/>
    )
    const cardTitle = screen.findByText('supercharge card title')
    const cardDesc = screen.findByText('supercharge card desc')
    expect(cardTitle).toBeInTheDocument()
    expect(cardDesc).toBeInTheDocument()
})