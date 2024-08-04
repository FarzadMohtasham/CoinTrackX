import { JSX } from 'react';

import BuyCrypto from '@components/home/Main-BuyCrypto.home.tsx';
import Coins from '@components/home/Main-Coins.home.tsx';
import Hero from '@components/home/Main-Hero.home.tsx';
import Numbers from '@components/home/Main-Numbers.home.tsx';
import Partners from '@components/home/Main-Partners.home.tsx';
import Testimonials from '@components/home/Main-Testimonials.home.tsx';
import Platform from '@components/home/Main-Platform.home.tsx';

export default function Main(): JSX.Element {
   return (
      <div>
         <Hero />
         <Numbers />
         <Partners />
         <Platform />
         <Coins />
         <BuyCrypto />
         <Testimonials />
      </div>
   );
}
