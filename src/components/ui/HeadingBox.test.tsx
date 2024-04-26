import {screen, render} from '@testing-library/react'
import HeadingBox from "./HeadingBox.tsx";

test('HeadingBox UI Component Test', () => {
    render(
        <HeadingBox heading={'Heading'} label={'Heading Label'} desc={'Heading Desc'}/>
    )

    const headingTextElement = screen.findByText(/Heading/)
    const labelTextElement = screen.findByText(/Heading Label/)
    const descTextElement = screen.findByText(/Heading Desc/)

    expect(headingTextElement).toBeInTheDocument()
    expect(labelTextElement).toBeInTheDocument()
    expect(descTextElement).toBeInTheDocument()
})