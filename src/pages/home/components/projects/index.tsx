import ProjectList from './ProjectList';
import Section from '../../../../commons/sections/Section';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';
import { Project } from '../../../../types';

const projects: Project[] = [
  {
    id: 7,
    name: 'Internship Management System',
    description:
      'A platform to manage and streamline the internship process for a start up called InchTechs.',
    media: [
      'https://example.com/internship-management-image1.jpg',
      'https://example.com/internship-management-image2.jpg',
    ],
    servicesRendered: ['Web Development', 'UI/UX Design', 'API Integration'],
    tools: ['React', 'MUI', 'MySQL', 'Express Js', 'socket.io'],
    categories: ['web'],
    date: '2024-08-05 - 2024-12-15',
    githubUrl: 'https://github.com/username/internship-management-system', // Added
    liveDemoUrl: 'https://internship-management-system.example.com', // Added
  },
  {
    id: 8,
    name: 'FET SPACE - School Management System',
    description:
      'An integrated system for FET that enhances school management with features like assignment submission and faculty announcements, offering a mobile app for students and a web app for teachers.',
    media: [
      'https://example.com/fet-space-image1.jpg',
      'https://example.com/fet-space-image2.jpg',
    ],
    servicesRendered: [
      'UI Design',
      'Full-Stack Development',
      'Mobile Development',
      'API Integration',
    ],
    tools: [
      'React',
      'React Native',
      'Apollo Client',
      'GraphQL',
      'Zustand',
      'socket.io',
      'Express Js',
      'PostgresSQL',
    ],
    categories: ['web', 'mobile'],
    date: '2025-04-01 - 2025-07-10',
    githubUrl: 'https://github.com/username/fet-space',
    liveDemoUrl: 'https://fet-space.example.com',
  },
  {
    id: 9,
    name: 'Medik - Telemedicine Application',
    description:
      'A Telemedicine Application where users can book appointments with doctors and also receive consultation results and tests.',
    media: [
      'https://example.com/medik-image1.jpg',
      'https://example.com/medik-image2.jpg',
    ],
    servicesRendered: ['UI/UX Design', 'Prototyping'],
    tools: ['Figma'],
    categories: ['design'],
    date: '2023-03-20 - 2023-06-20',
  },
  {
    id: 10,
    name: 'Tech Explorer',
    description:
      'A mobile application to showcase tech startups, student clubs, and events in BUEA. Includes calculation and guide screens.',
    media: [
      'https://example.com/tech-explorer-image1.jpg',
      'https://example.com/tech-explorer-image2.jpg',
      'https://example.com/tech-explorer-calculation.jpg',
      'https://example.com/tech-explorer-guide.jpg',
    ],
    servicesRendered: [
      'UI/UX Design',
      // 'Prototyping',
      // 'Wireframing',
      'Design Thinking',
    ],
    tools: ['Figma', 'Figjam', 'Google Docs'],
    categories: ['design'],
    date: '2024-05-20 - 2024-06-20',
  },
  {
    id: 11,
    name: 'Cost Estimate',
    description:
      'A mobile application for calculating building estimates for various components or from foundation to roofing. Includes calculation and guide screens.',
    media: [
      'https://example.com/cost-estimate-image1.jpg',
      'https://example.com/cost-estimate-image2.jpg',
      'https://example.com/cost-estimate-calculation.jpg',
      'https://example.com/cost-estimate-guide.jpg',
    ],
    servicesRendered: ['Mobile Development', 'UI/UX Design'],
    tools: ['React', 'React Native'],
    categories: ['mobile'],
    date: '2024-03-20 - 2024-06-20',
    githubUrl: 'https://github.com/username/cost-estimate',
    liveDemoUrl: 'https://cost-estimate.example.com',
  },
  {
    id: 12,
    name: 'Relief Radar',
    description:
      'A mobile app for disaster management system, where users can report disasters, request for help, and also connect with emergency responders around the globe. Includes reporting and guide screens.',
    media: [
      'https://example.com/relief-radar-image1.jpg',
      'https://example.com/relief-radar-image2.jpg',
      'https://example.com/relief-radar-reporting.jpg',
      'https://example.com/relief-radar-guide.jpg',
    ],
    servicesRendered: ['Mobile Development', 'Web Development'],
    tools: ['Ionic', 'React', 'CSS'],
    categories: ['web', 'mobile'],
    date: '2024-03-20 - 2024-06-20',
    githubUrl: 'https://github.com/username/relief-radar',
    liveDemoUrl: 'https://relief-radar.example.com',
  },
  {
    id: 13,
    name: 'CSS LIBRARY',
    description:
      'This is a light weight CSS library, similar to Tailwind CSS, where users can design websites using utility classes.',
    media: [
      'https://example.com/css-library-image1.jpg',
      'https://example.com/css-library-image2.jpg',
    ],
    servicesRendered: ['Frontend Development'],
    tools: ['HTML', 'CSS', 'JS', 'SASS'],
    categories: ['web'],
    date: '2023-09-15',
    githubUrl: 'https://github.com/username/css-library',
    liveDemoUrl: 'https://css-library.example.com',
  },
  {
    id: 14,
    name: 'AGM WEBSITE',
    description: 'A multipage website for the Apostolic Gospel Mission Kumba.',
    media: [
      'https://example.com/agm-website-image1.jpg',
      'https://example.com/agm-website-image2.jpg',
    ],
    servicesRendered: ['Web Development'],
    tools: ['React', 'SASS'],
    categories: ['web'],
    date: '2024-02-15',
    githubUrl: 'https://github.com/username/agm-website',
    liveDemoUrl: 'https://agm-website.example.com',
  },
  {
    id: 15,
    name: 'ASEND WEBSITE',
    description:
      'A multipage website for a prep group that prepares students for professional exams.',
    media: [
      'https://example.com/asend-website-image1.jpg',
      'https://example.com/asend-website-image2.jpg',
    ],
    servicesRendered: ['Web Development'],
    tools: ['React', 'SASS'],
    categories: ['web'],
    date: '2023-09-15',
    githubUrl: 'https://github.com/username/asend-website',
    liveDemoUrl: 'https://asend-website.example.com',
  },
  {
    id: 16,
    name: 'Three Tier Application and Data Warehouse',
    description:
      'A data warehouse used to analyze data from a chat application (auth | realtime communication | data cleaning and etc.).',
    media: [
      'https://example.com/three-tier-app-image1.jpg',
      'https://example.com/three-tier-app-image2.jpg',
    ],
    servicesRendered: [
      'Backend Development',
      'Data Analysis',
      'Database Design',
    ],
    tools: ['HTML', 'CSS', 'Chart JS', 'Node.js', 'Express', 'MongoDB'],
    categories: ['web'],
    date: '2023-09-15',
    githubUrl: 'https://github.com/username/three-tier-app',
    liveDemoUrl: 'https://three-tier-app.example.com',
  },
];

const Projects = () => {
  return (
    <Section id="projects">
      <div className="flex flex-col gap-10 lg:gap-16">
        <SectionHeaderAndDescription
          title="Solutions I’ve Crafted"
          description="Explore the projects where I’ve transformed ideas into reality, creating impactful solutions tailored to meet real-world needs."
        />
        <ProjectList projects={projects} />
      </div>
    </Section>
  );
};

export default Projects;
