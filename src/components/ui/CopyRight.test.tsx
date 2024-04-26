import { render, screen } from '@testing-library/react'
import CopyRight from "./CopyRight.tsx";

test('CopyRight UI Component Test', () => {
    render(<CopyRight/>)
    const textElement = screen.findByText(/Copyright 2024 © CoinTrackX/)
    expect(textElement).toBeInTheDocument()
})