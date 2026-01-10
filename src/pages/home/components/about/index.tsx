import Button from '../../../../commons/buttons';
import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';
import Section from '../../../../commons/sections/Section';
import takemjimImage from '../../../../assets/images/takem-jim.png';

const About = () => {
  return (
    <Section id="about">
      {/* Mobile: Title → Image → Text | Desktop: Image (left) → Text (right) */}
      <div className="flex flex-col gap-8">
        {/* Title & Description - Only visible on mobile, appears first */}
        <ScrollReveal>
          <div className="flex flex-col gap-2 md:gap-3 min-[780px]:hidden">
            <h2>A Little About Me</h2>
            <p className="text-justify">Software Engineer with a passion for building scalable web and mobile applications.</p>
          </div>
        </ScrollReveal>

        {/* Image and Text Container - Grid on desktop, stacked on mobile */}
        <div className="flex flex-col gap-8 min-[780px]:grid min-[780px]:grid-cols-2 min-[780px]:gap-12 min-[780px]:items-center lg:gap-16">
          {/* Image - Second on mobile (after title), Left on desktop (order-1) */}
          <div className="min-[780px]:order-1">
            <ScrollReveal>
              <div>
                <img
                  src={takemjimImage}
                  alt="Takem Jim - Full Stack Developer & UI Designer"
                  className="bg-neutral w-[100%] h-auto min-h-[200px]"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Text Content - Third on mobile (after image), Right on desktop (order-2) */}
          <div className="min-[780px]:order-2">
            <ScrollReveal>
              <div className="flex flex-col gap-3 md:gap-4">
                {/* Title & Description - Only visible on desktop */}
                <div className="hidden min-[780px]:flex flex-col gap-2 md:gap-3">
                  <h2>A Little About Me</h2>
                  {/* <p className="text-justify">Software Engineer with a passion for building scalable web and mobile applications.</p> */}
                </div>
                <p className="text-justify">
                  Takem Jim is a Full Stack Developer and UI Designer from Cameroon, specializing in building scalable web and mobile applications. He holds a B.Eng in Software Engineering from the University of Buea, Cameroon, and currently works as a freelance software developer where he builds web and mobile applications, combining academic knowledge with hands-on experience to deliver solutions that are both technically robust and user-centered.
                </p>
                <p className="text-justify">
                  Takem is passionate about using technology to solve problems and empower businesses through innovative web and mobile applications.
                </p>
                <div className="flex justify-start items-center gap-2">
                  <a href="/#contact">
                    <Button title="Contact Me" />
                  </a>
                  <a href="/takem-jim-cv.pdf" target="_blank" rel="noopener noreferrer">
                    <Button title="Download CV" variant="outlined" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
