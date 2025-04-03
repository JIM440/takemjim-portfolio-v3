import Button from '../../../../commons/buttons';
import Section from '../../../../commons/sections/Section';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';

const About = () => {
  return (
    <Section id="about">
      <div className="grid grid-cols-none gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeaderAndDescription
          title="A Little About Me"
          description="Hi, I’m Takem Jim – Software Developer & UI Designer"
        />
        <div className="flex flex-col gap-3 lg: gap-4">
          <p className="text-justify">
            A software developer, who turns ideas into digital products and
            solutions, bringing them to life through thoughtful code and
            engaging interfaces. Currently pursuing a Bachelor's in Software
            Engineering, I’m constantly learning and refining my skills to stay
            ahead in the fast-evolving tech landscape.
          </p>
          <div className="flex lg:justify-end items-center gap-2">
            <a href="#contact">
              <Button title="Contact Me" />
            </a>
            <Button title="Download CV" variant="outlined" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
