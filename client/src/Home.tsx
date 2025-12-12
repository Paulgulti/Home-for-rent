import { Link } from 'react-router';
import { ContainerScroll } from './components/ui/container-scroll-animation'
import { FlipWords } from './components/ui/flip-words';
import { NoiseBackground } from './components/ui/noise-background';
import heroImage from "../src/assets/hero-property.jpg";
import { Button } from './components/ui/button';
import Features from './LandingComponents/Features';
import Stats from './LandingComponents/Stats';
import HowItWorks from './LandingComponents/HowItWorks';
import CTA from './LandingComponents/Cta';
import Footer from './LandingComponents/Footer';
import Navbar from './LandingComponents/Navbar';
import AnimatedTestimonialsDemo from './LandingComponents/Testimonials';
import Testimonial from './LandingComponents/Testimonials';

const Home = () => {

  const words = ["Hassel free", "Safe", "Cost-saving", "Modern"];

  return (
    <div>
      <div className='flex justify-center items-center h-screen w-full'>
        <div className="h-160 flex justify-center items-center px-4">
          <div className='flex flex-col gap-10 '>
            <div className="text-center text-xl md:text-4xl mx-auto font-extrabold text-neutral-600 dark:text-neutral-400">
              <FlipWords words={words} /> <br />
              <p>Homes with <span className=''>Akeray</span></p>
            </div>
            <NoiseBackground
              containerClassName="w-fit p-2 rounded-full mx-auto"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}
            >
              <Link to={'/properties'}>
                <p className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
                  Properties &rarr;
                </p>
              </Link>
            </NoiseBackground>
          </div>
        </div>
      </div>
      <Features />
      <HowItWorks/>
      <Testimonial/>
      <CTA/>
      <Footer/>
    </div>


  )
}

export default Home
