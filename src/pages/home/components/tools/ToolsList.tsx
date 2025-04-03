import React from 'react';
import ToolCard from './ToolCard';

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
    <div className="flex flex-wrap gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} name={tool.name} imageUrl={tool.imageUrl} />
      ))}
    </div>
  );
};

export default ToolsList;
