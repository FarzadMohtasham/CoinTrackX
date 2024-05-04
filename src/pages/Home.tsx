import {Fragment, JSX} from 'react'

import Header from '../components/home/Header.home.tsx';
import Main from '../components/home/Main.home.tsx'
import Footer from '../components/home/Footer.home.tsx';

export default function Home(): JSX.Element {
    return (
        <Fragment>

            <Header/>
            <Main/>
            <Footer/>
        </Fragment>
    )
}










