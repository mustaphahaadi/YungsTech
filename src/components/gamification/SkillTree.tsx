import React from 'react';
import { SkillTreeNode } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Lock, Check, Star } from 'lucide-react';
import { getIconComponent } from '../../data/mockData';

interface SkillTreeProps {
  nodes: SkillTreeNode[];
  onNodeClick: (nodeId: string) => void;
}

const SkillTree: React.FC<SkillTreeProps> = ({ nodes, onNodeClick }) => {
  const renderNode = (node: SkillTreeNode) => {
    const IconComponent = getIconComponent(node.icon);
    
    return (
      <div
        key={node.id}
        className={`relative ${node.unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={() => node.unlocked && onNodeClick(node.id)}
      >
        <Card
          className={`transition-all ${
            node.completed
              ? 'bg-emerald-50 border-emerald-200'
              : node.unlocked
              ? 'hover:shadow-lg'
              : 'bg-gray-50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${
              node.completed
                ? 'bg-emerald-500 text-white'
                : node.unlocked
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}>
              <IconComponent className="h-6 w-6" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{node.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{node.description}</p>
                </div>
                {!node.unlocked && <Lock className="h-4 w-4 text-gray-400" />}
                {node.completed && <Check className="h-4 w-4 text-emerald-500" />}
              </div>

              {node.abilities && node.abilities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {node.abilities.map((ability, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {ability}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-gray-600">Level {node.level} Required</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {nodes.map(renderNode)}
    </div>
  );
};

export default SkillTree;