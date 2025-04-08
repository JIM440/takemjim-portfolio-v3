import React from 'react';
import Button from '../../../../commons/buttons';
import { BoxArrowUpRight, Github } from 'react-bootstrap-icons';
import { Project } from '../../../../types';
import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';

const ProjectCard: React.FC<Project> = ({
  media,
  name,
  date,
  description,
  servicesRendered,
  tools,
  githubUrl,
  liveDemoUrl,
}) => {
  // Check if at least one of githubUrl or liveDemoUrl exists
  const hasLinks = githubUrl || liveDemoUrl;

  return (
    <ScrollReveal>
      <div className="flex flex-col gap-6 border border-neutral h-auto">
        {/* Display the first image from the media array */}
        <img
          src={media[0]}
          alt={name}
          width="100%"
          height={300}
          className="w-full min-h-[190px] object-cover md:object-contain border-b-1 border-neutral"
          aria-label={name}
          loading="lazy"
        />
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-2">
            <h3>{name}</h3>
            <p className="text-justify">{description}</p>
            {/* Services Rendered */}
            <div className="mt-2">
              <p className="text-sm font-semibold">Skills applied:</p>
              <ul className="flex flex-wrap gap-2">
                {servicesRendered.map((stuff, index) => (
                  <li key={index} className="text-xs py-1 px-2 bg-neutral">
                    {stuff}
                  </li>
                ))}
              </ul>
            </div>
            {/* Tools (if available) */}
            {tools && tools.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-semibold">Tools:</p>
                <ul className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <li key={index} className="text-xs py-1 px-2 bg-neutral">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Conditionally render buttons if at least one link exists */}
          {hasLinks && (
            <div className="flex flex-col gap-2 min-[370px]:flex-row min-[370px]:gap-4 md:gap-6">
              {githubUrl && (
                <a
                  href={githubUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={!githubUrl ? 'pointer-events-none' : ''}
                >
                  <Button
                    title="GitHub"
                    icon={
                      <Github
                        size={14}
                        className="ml-2 text-inherit self-baseline"
                      />
                    }
                  />
                </a>
              )}
              {liveDemoUrl && (
                <a
                  href={liveDemoUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={!liveDemoUrl ? 'pointer-events-none' : ''}
                >
                  <Button
                    title="Live Demo"
                    variant="outlined"
                    icon={
                      <BoxArrowUpRight
                        size={14}
                        className="ml-2 text-inherit self-baseline"
                      />
                    }
                  />
                </a>
              )}
            </div>
          )}
          <p className="text-xs text-black-700 mt-[-8px]">{date}</p>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProjectCard;
