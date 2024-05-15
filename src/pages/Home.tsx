import React, {Fragment} from 'react'

// @ts-ignore
import Header from '@components/home/Header.home.tsx';
import Main from '@components/home/Main.tsx'
import Footer from '@components/home/Footer.home.tsx';

export default function Home(): React.JSX.Element {
    return (
        <Fragment>
            <Header/>
            <Main/>
            <Footer/>
        </Fragment>
    )
}










