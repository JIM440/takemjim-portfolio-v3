import Section from '../../../../commons/sections/Section';
import SectionHeaderAndDescription from '../../../../commons/sections/SectionHeaderAndDescription';
import ToolsList from './ToolsList';
import useTheme from '../../../../hooks/useTheme';
import HTML from '../../../../assets/icons/tools-light/Html5.svg';
import HTMLDark from '../../../../assets/icons/tools-dark/Html5.svg';
import CSS from '../../../../assets/icons/tools-light/CSS3.svg';
import CSSDark from '../../../../assets/icons/tools-dark/CSS3.svg';
import JavaScript from '../../../../assets/icons/tools-light/JavaScript.svg';
import JavaScriptDark from '../../../../assets/icons/tools-dark/JavaScript.svg';
import React from '../../../../assets/icons/tools-light/React.svg';
import ReactDark from '../../../../assets/icons/tools-dark/React.svg';
import Tailwind from '../../../../assets/icons/tools-light/TailwindCSS.svg';
import TailwindDark from '../../../../assets/icons/tools-dark/TailwindCSS.svg';
import SASS from '../../../../assets/icons/tools-light/Sass.svg';
import SASSDark from '../../../../assets/icons/tools-dark/Sass.svg';
import Ionic from '../../../../assets/icons/tools-light/Ionic.svg';
import IonicDark from '../../../../assets/icons/tools-dark/Ionic.svg';
import ReactNative from '../../../../assets/icons/tools-light/ReactNative.svg';
import ReactNativeDark from '../../../../assets/icons/tools-dark/ReactNative.svg';
import NodeJs from '../../../../assets/icons/tools-light/NodeJs.svg';
import NodeJsDark from '../../../../assets/icons/tools-dark/NodeJs.svg';
import ExpressJs from '../../../../assets/icons/tools-light/ExpressJs.svg';
import ExpressJsDark from '../../../../assets/icons/tools-dark/ExpressJs.svg';
import MongoDB from '../../../../assets/icons/tools-light/MongoDB.svg';
import MongoDBDark from '../../../../assets/icons/tools-dark/MongoDB.svg';
import MySQL from '../../../../assets/icons/tools-light/MySQL.svg';
import MySQLDark from '../../../../assets/icons/tools-dark/MySQL.svg';

const ToolsLight = [
  {
    id: 'html-id',
    name: 'HTML',
    imageUrl: HTML,
  },
  {
    id: 'css-id',
    name: 'CSS',
    imageUrl: CSS,
  },
  {
    id: 'javascript-id',
    name: 'JavaScript',
    imageUrl: JavaScript,
  },
  {
    id: 'react-id',
    name: 'React',
    imageUrl: React,
  },
  {
    id: 'tailwind-id',
    name: 'Tailwind',
    imageUrl: Tailwind,
  },
  {
    id: 'sass-id',
    name: 'SASS',
    imageUrl: SASS,
  },
  {
    id: 'reactnative-id',
    name: 'ReactNative',
    imageUrl: ReactNative,
  },
  {
    id: 'nodejs-id',
    name: 'NodeJs',
    imageUrl: NodeJs,
  },
  {
    id: 'ionic-id',
    name: 'Ionic',
    imageUrl: Ionic,
  },
  {
    id: 'expressjs-id',
    name: 'ExpressJs',
    imageUrl: ExpressJs,
  },
  {
    id: 'mongodb-id',
    name: 'MongoDB',
    imageUrl: MongoDB,
  },
  {
    id: 'mysql-id',
    name: 'MySQL',
    imageUrl: MySQL,
  },
];

const ToolsDark = [
  {
    id: 'html-dark-id',
    name: 'HTML',
    imageUrl: HTMLDark,
  },
  {
    id: 'css-dark-id',
    name: 'CSS',
    imageUrl: CSSDark,
  },
  {
    id: 'javascript-dark-id',
    name: 'JavaScript',
    imageUrl: JavaScriptDark,
  },
  {
    id: 'react-dark-id',
    name: 'React',
    imageUrl: ReactDark,
  },
  {
    id: 'tailwind-dark-id',
    name: 'Tailwind',
    imageUrl: TailwindDark,
  },
  {
    id: 'sass-dark-id',
    name: 'SASS',
    imageUrl: SASSDark,
  },
  {
    id: 'ionic-dark-id',
    name: 'Ionic',
    imageUrl: IonicDark,
  },
  {
    id: 'reactnative-dark-id',
    name: 'ReactNative',
    imageUrl: ReactNativeDark,
  },
  {
    id: 'nodejs-dark-id',
    name: 'NodeJs',
    imageUrl: NodeJsDark,
  },
  {
    id: 'expressjs-dark-id',
    name: 'ExpressJs',
    imageUrl: ExpressJsDark,
  },
  {
    id: 'mongodb-dark-id',
    name: 'MongoDB',
    imageUrl: MongoDBDark,
  },
  {
    id: 'mysql-dark-id',
    name: 'MySQL',
    imageUrl: MySQLDark,
  },
];

const Tools = () => {
  const { theme } = useTheme();
  return (
    <Section id="tools">
      <div className="flex flex-col gap-10 lg:gap-16">
        <SectionHeaderAndDescription
          title="My Toolkit"
          description="Here are the list of tools I use to craft my solutions."
        />
        <ToolsList tools={theme === 'dark' ? ToolsDark : ToolsLight} />
      </div>
    </Section>
  );
};

export default Tools;
