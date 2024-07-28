import { Fragment, JSX } from 'react';

// @typings-ignore
import Header from '@/Components/Home/Header.home';
import Main from '@/Components/Home/Main';
import Footer from '@/Components/Home/Footer.home';

export default function HomePage(): JSX.Element {
   return (
      <Fragment>
         <Header />
         <Main />
         <Footer />
      </Fragment>
   );
}
