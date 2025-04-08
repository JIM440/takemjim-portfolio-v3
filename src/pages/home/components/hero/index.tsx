import Section from '../../../../commons/sections/Section';
import takemjim from '../../../../assets/images/takem-jim.jpg';
import Button from '../../../../commons/buttons';
import { ArrowRight } from 'react-bootstrap-icons';
import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';

const Hero = () => {
  return (
    <Section id="home">
      <div className="grid grid-cols-none gap-8 items-center min-[780px]:grid-cols-2 min-[780px]:gap-12 lg:gap-16  lg:mt-[-40px]">
        <ScrollReveal>
          <div className="flex flex-col gap-3 md:gap-4">
            <h1>Transforming Ideas into Functional Products</h1>
            <p className="text-justify">
              As a Full Stack Developer, I specialize in building responsive,
              user-friendly applications that deliver both functionality and
              great design.
            </p>
            <a href="#projects" className="mt-1 self-start">
              <Button
                title={`What I've Built`}
                icon={
                  <ArrowRight
                    size={16}
                    className="ml-2 text-inherit self-baseline"
                  />
                }
              />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div>
            <img
              src={takemjim}
              width={'100%'}
              height={400}
              className="bg-neutral h-auto min-h-[200px]"
              alt="Takem Jim"
              aria-label="takem jim"
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
};

export default Hero;
