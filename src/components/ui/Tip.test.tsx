import {render, screen} from "@testing-library/react";
import Tip from "./Tip.tsx";

test('Tip UI Component Test', () => {
    render(<Tip>This is a tip</Tip>)
    const tipElement = screen.findByText(/This is a tip/)
    expect(tipElement).toBeInTheDocument()
})