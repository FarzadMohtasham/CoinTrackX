import {screen, render} from '@testing-library/react'
import Heading from "./Heading.tsx";

test('Heading UI Component Test', () => {
    render(
        <Heading>
            Another Heading
        </Heading>
    )
    const textElement = screen.findByText(/Another Heading/)
    expect(textElement).toBeInTheDocument()
})