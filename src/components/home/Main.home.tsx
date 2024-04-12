import BuyCrypto from './Main-BuyCrypto.home.tsx'
import Coins from './Main-Coins.home.tsx'
import Hero from './Main-Hero.home.tsx'
import Features from './Main-Features.home.tsx'
import Numbers from './Main-Numbers.home.tsx'
import Partners from './Main-Partners.home.tsx'
import Testimonials from './Main-Testimonials.home.tsx'
import Platform from './Main-Platform.home.tsx'


export default function Main() {
    return (
        <div>
            <Hero/>
            <Numbers/>
            <Partners/>
            <Platform/>
            <Coins/>
            <BuyCrypto/>
            <Features/>
            <Testimonials/>
        </div>
    )
}