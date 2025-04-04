import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import Button from '../../../../commons/buttons';
import { Project } from '../../../../types';

interface ProjectListProps {
  projects: Project[];
}

const Categories = ['All', 'Web', 'Mobile', 'Design'];

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'All' | 'Web' | 'Mobile' | 'Design'
  >('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) =>
          project.categories.includes(
            selectedCategory.toLowerCase() as 'web' | 'mobile' | 'design'
          )
        );

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex gap-2 md:gap-6 mb-8 overflow-x-auto scroll-bar-small pb-4">
        {Categories.map((category) => (
          <Button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category as 'All' | 'Web' | 'Mobile' | 'Design'
              )
            }
            variant={`${
              selectedCategory === category ? 'primary' : 'outlined'
            }`}
            title={category}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-none gap-10 lg:grid-cols-2 lg:gap-16">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            date={project.date}
            media={project.media}
            servicesRendered={project.servicesRendered}
            tools={project.tools}
            githubUrl={project.githubUrl}
            liveDemoUrl={project.liveDemoUrl}
            categories={project.categories} // Updated to categories
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
