import React from 'react';
import ToolCard from './ToolCard';
import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';

interface Tool {
  id: string;
  name: string;
  imageUrl: string;
}

interface ToolsListProps {
  tools: Tool[];
}

const ToolsList: React.FC<ToolsListProps> = ({ tools }) => {
  return (
    <ScrollReveal>
      <div className="flex flex-wrap gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} name={tool.name} imageUrl={tool.imageUrl} />
        ))}
      </div>
    </ScrollReveal>
  );
};

export default ToolsList;
