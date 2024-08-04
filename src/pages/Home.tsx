import { Fragment, JSX } from 'react';

// @typings-ignore
import Header from '@Components/Home/Header.home.tsx';
import Main from '@Components/Home/Main.tsx';
import Footer from '@Components/Home/Footer.home.tsx';

export default function HomePage(): JSX.Element {
   return (
      <Fragment>
         <Header />
         <Main />
         <Footer />
      </Fragment>
   );
}
