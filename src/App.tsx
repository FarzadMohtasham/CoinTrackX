import {JSX} from 'react'
import './App.css'
import Tip from "./components/ui/Tip.tsx";

function App(): JSX.Element {
    return (
        <div className={'app'} style={{padding: '1rem'}}>
            <Tip>
                Learn to Invest daily, weekly, or monthly
            </Tip>
        </div>
    )
}

export default App
