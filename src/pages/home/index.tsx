import Navbar from '../../commons/layout/navbar';
import Hero from './components/hero';
import About from './components/about';
import Services from './components/services';
import Tools from './components/tools';
import Projects from './components/projects';
import Testimonial from './components/testimonials';
import Contact from './components/contact';
import Footer from '../../commons/layout/footer';
import ScrollToTop from '../../commons/scroll/ScrollToTop';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Tools />
      <Projects />
      <Testimonial />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default HomePage;
