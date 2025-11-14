import ProjectList from './ProjectList';
import Section from '../../../../commons/sections/Section';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';
import { Project } from '../../../../types';
import FetSpace from '../../../../assets/images/fet-space.png';
import Internship from '../../../../assets/images/internship-platform.png';
import CostEstimate from '../../../../assets/images/cost-estimate.png';
import Medik from '../../../../assets/images/medik.png';
import TechExplorer from '../../../../assets/images/tech-explorer.png';
import ReliefRadar from '../../../../assets/images/relief-radar.png';
import CSSLibrary from '../../../../assets/images/css-library.png';
import AGM from '../../../../assets/images/agm.png';
import ASEND from '../../../../assets/images/asend.png';
import DataWarehouse from '../../../../assets/images/data-warehouse.png';
import NoteLoom from '../../../../assets/images/note-loom.webp';

const projects: Project[] = [
  {
    id: 17,
    name: 'Note Loom – Personal Knowledge Workspace',
    description:
      'A note-taking mobile application that allows users to capture, organize, and refine their thoughts using a rich blog-style editor. Includes smart folder organization, favorites, and an intelligent search powered by SQLite.',
    media: [NoteLoom],
    servicesRendered: [
      'Mobile Development',
      'UI/UX Design',
      'Offline-First Architecture',
    ],
    tools: ['React Native', 'Expo', 'SQLite'],
    categories: ['mobile'],
    date: '2024-11-01 – 2025-02-10',
    liveDemoUrl: 'https://note-loom-landing-page.vercel.app/',
  },
  {
    id: 8,
    name: 'FET SPACE - School Management System',
    description:
      'An integrated system for FET that enhances school management with features like assignment submission and faculty announcements, offering a mobile app for students and a web app for teachers.',
    media: [FetSpace],
    servicesRendered: [
      'UI/UX Design',
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
    // githubUrl: 'https://github.com/username/fet-space',
    // liveDemoUrl: 'https://fet-space.example.com',
  },
  {
    id: 7,
    name: 'Internship Management System',
    description:
      'A platform to manage and streamline the internship process for a start up called InchTechs.',
    media: [Internship],
    servicesRendered: [
      'UI/UX Design',
      'Full-Stack Web Development',
      'API Integration',
    ],
    tools: ['React', 'MUI', 'MySQL', 'Express Js', 'socket.io'],
    categories: ['web'],
    date: '2024-08-05 - 2024-12-15',
    // githubUrl: 'https://github.com/username/internship-management-system',
    // liveDemoUrl: 'https://internship-management-system.example.com',
  },
  {
    id: 11,
    name: 'Cost Estimate',
    description:
      'A mobile application for calculating building estimates for various components or from foundation to roofing.',
    media: [CostEstimate],
    servicesRendered: ['Mobile Development', 'UI/UX Design'],
    tools: ['React', 'React Native'],
    categories: ['mobile'],
    date: '2024-03-20 - 2024-06-20',
    // githubUrl: 'https://github.com/username/cost-estimate',
    // liveDemoUrl: 'https://cost-estimate.example.com',
  },
  {
    id: 9,
    name: 'Medik - Telemedicine Application',
    description:
      'A Telemedicine Application where users can book appointments with doctors and also receive consultation results and tests.',
    media: [Medik],
    servicesRendered: ['UI/UX Design', 'Prototyping'],
    tools: ['Figma'],
    categories: ['design'],
    date: '2023-03-20 - 2023-06-20',
  },
  {
    id: 10,
    name: 'Tech Explorer',
    description:
      'A mobile application to showcase tech startups, student clubs, and events in BUEA.',
    media: [TechExplorer],
    servicesRendered: ['UI/UX Design', 'Design Thinking'],
    tools: ['Figma', 'Figjam', 'Google Docs'],
    categories: ['design'],
    date: '2024-05-20 - 2024-06-20',
  },
  {
    id: 12,
    name: 'Relief Radar',
    description:
      'A mobile app for disaster management system, where users can report disasters, request for help, and also connect with emergency responders around the globe.',
    media: [ReliefRadar],
    servicesRendered: ['Mobile Development', 'Web Development'],
    tools: ['Ionic', 'React', 'CSS'],
    categories: ['web', 'mobile'],
    date: '2024-03-20 - 2024-06-20',
    // githubUrl: 'https://github.com/username/relief-radar',
    // liveDemoUrl: 'https://relief-radar.example.com',
  },
  {
    id: 13,
    name: 'CSS LIBRARY',
    description:
      'This is a light weight CSS library, similar to Tailwind CSS, where users can design websites using utility classes.',
    media: [CSSLibrary],
    servicesRendered: ['Frontend Web Development'],
    tools: ['HTML', 'CSS', 'JS', 'SASS'],
    categories: ['web'],
    date: '2023-09-15',
    githubUrl: 'https://github.com/JIM440/CSS-Library-with-SASS',
    liveDemoUrl: 'https://jim440.github.io/CSS-Library-with-SASS/',
  },
  {
    id: 14,
    name: 'AGM WEBSITE',
    description: 'A multipage website for the Apostolic Gospel Mission Kumba.',
    media: [AGM],
    servicesRendered: ['Frontend Web Development'],
    tools: ['React', 'SASS'],
    categories: ['web'],
    date: '2024-02-15',
    githubUrl: 'https://github.com/JIM440/AGM-Website',
    liveDemoUrl: 'https://agm-website-react.vercel.app/',
  },
  {
    id: 15,
    name: 'ASEND WEBSITE',
    description:
      'A multipage website for a prep group that prepares students for professional exams.',
    media: [ASEND],
    servicesRendered: ['Frontend Web Development'],
    tools: ['React', 'SASS'],
    categories: ['web'],
    date: '2023-09-15',
    githubUrl: 'https://github.com/JIM440/ASEND-Website',
    liveDemoUrl: 'https://asend-website.vercel.app/',
  },
  {
    id: 16,
    name: 'Three Tier Application and Data Warehouse',
    description:
      'A data warehouse used to analyze data from a chat application. Key features include: authentication, realtime communication, data cleaning etc.',
    media: [DataWarehouse],
    servicesRendered: [
      'Full-Stack Development',
      'Data Analysis and Cleaning',
      'Database Design',
    ],
    tools: ['HTML', 'CSS', 'Chart JS', 'Node.js', 'Express', 'MongoDB'],
    categories: ['web'],
    date: '2023-09-15',
    githubUrl: 'https://github.com/JIM440/Data-Analysis-Projects',
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
