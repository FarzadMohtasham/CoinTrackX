import { JSX } from 'react';

import BuyCrypto from '@Components/Home/Main-BuyCrypto.home.tsx';
import Coins from '@Components/Home/Main-Coins.home.tsx';
import Hero from '@Components/Home/Main-Hero.home.tsx';
import Numbers from '@Components/Home/Main-Numbers.home.tsx';
import Partners from '@Components/Home/Main-Partners.home.tsx';
import Testimonials from '@Components/Home/Main-Testimonials.home.tsx';
import Platform from '@Components/Home/Main-Platform.home.tsx';

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
