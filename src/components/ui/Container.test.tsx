import {render, screen} from '@testing-library/react'
import Container from "./Container.tsx";

test('Container UI Component Test', () => {
    render(
        <Container>
            A Container
        </Container>
    )
    const textElement = screen.findByText(/A Container/)
    expect(textElement).toBeInTheDocument()
})