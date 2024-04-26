import { screen, render } from '@testing-library/react'
import Review from "./Review.tsx";

test('Review UI Component Test', () => {
    render(<Review numberOfStars={4}
                   quote={'This is a review quote'}
                   author={{job: 'react dev', name: 'farzad mohtasham', imgSrc: '/hello'}}/>)

    const quoteElement = screen.findByText(/This is a review quote/)
    const jobElement = screen.findByText(/react dev/)
    const nameElement = screen.findByText(/farzad mohtasham/)

    expect(quoteElement).toBeInTheDocument()
    expect(jobElement).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
})