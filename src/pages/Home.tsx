import {JSX, Fragment} from 'react'

// @ts-ignore
import Header from '@components/home/Header.home.tsx'
import Main from '@components/home/Main.tsx'
import Footer from '@components/home/Footer.home.tsx'

export default function Home(): JSX.Element {
    return (
        <Fragment>
            <Header/>
            <Main/>
            <Footer/>
        </Fragment>
    )
}










