import {JSX} from 'react'
import './App.css'
import Button from "./ui/Button.tsx";

function App(): JSX.Element {
    return (
        <div className={'app'} style={{ padding: '1rem' }}>
            <Button
                type={'primary'}
                borderRadius={'lg'}
                outline
                size={'sm'}>
                Hello
            </Button>
        </div>
    )
}

export default App
