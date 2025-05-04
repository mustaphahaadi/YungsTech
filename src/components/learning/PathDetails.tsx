import React, { useState } from 'react';
import { LearningPath, Module, Lesson } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Clock, Zap } from 'lucide-react';
import { getIconComponent } from '../../data/mockData';

interface PathDetailsProps {
  path: LearningPath;
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
}

const PathDetails: React.FC<PathDetailsProps> = ({ 
  path, 
  onBack,
  onStartLesson
}) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([path.modules[0]?.id || '']);
  
  const toggleModule = (moduleId: string) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const IconComponent = getIconComponent(path.icon);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack} 
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back
        </Button>
        <h2 className="text-2xl font-bold ml-4 text-gray-800">Learning Path: {path.title}</h2>
      </div>

      {/* Path Overview */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-xl text-white bg-gradient-to-br ${
            path.level === 'beginner' ? 'from-emerald-400 to-emerald-600' : 
            path.level === 'intermediate' ? 'from-amber-400 to-amber-600' : 
            'from-rose-400 to-rose-600'
          }`}>
            <IconComponent className="h-10 w-10" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-800">{path.title}</h3>
            <p className="text-gray-600 mt-2">{path.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant={path.level === 'beginner' ? 'success' : path.level === 'intermediate' ? 'warning' : 'danger'} size="md">
                {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
              </Badge>
              <Badge variant="info" size="md">
                Ages {path.ageRange}
              </Badge>
              <Badge variant="secondary" size="md">
                {path.modules.length} Modules
              </Badge>
              <Badge variant="primary" size="md">
                {path.modules.reduce((total, module) => total + module.lessons.length, 0)} Lessons
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Modules List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Modules</h3>
        
        {path.modules.map((module, index) => (
          <div key={module.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Module Header */}
            <div 
              className={`px-6 py-4 cursor-pointer flex items-center justify-between transition-colors ${
                expandedModules.includes(module.id) ? 'bg-indigo-50' : ''
              }`}
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700">
                  {index + 1}
                </div>
                <span className="font-semibold text-lg">{module.title}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                </span>
                {expandedModules.includes(module.id) ? 
                  <ChevronUp className="h-5 w-5 text-indigo-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                }
              </div>
            </div>
            
            {/* Module Lessons */}
            {expandedModules.includes(module.id) && (
              <div className="px-6 py-3 border-t border-gray-100">
                <p className="text-gray-600 mb-4">{module.description}</p>
                
                <div className="space-y-3">
                  {module.lessons.map((lesson, idx) => (
                    <LessonItem 
                      key={lesson.id} 
                      lesson={lesson} 
                      index={idx} 
                      onStart={() => onStartLesson(lesson.id)} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface LessonItemProps {
  lesson: Lesson;
  index: number;
  onStart: () => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, index, onStart }) => {
  const lessonTypeIcon = {
    'video': <BookOpen className="h-5 w-5 text-blue-500" />,
    'interactive': <Zap className="h-5 w-5 text-amber-500" />,
    'quiz': <BookOpen className="h-5 w-5 text-emerald-500" />,
    'project': <BookOpen className="h-5 w-5 text-purple-500" />
  }[lesson.type];

  const lessonTypeBadge = {
    'video': <Badge variant="primary">Video</Badge>,
    'interactive': <Badge variant="warning">Interactive</Badge>,
    'quiz': <Badge variant="success">Quiz</Badge>,
    'project': <Badge variant="secondary">Project</Badge>
  }[lesson.type];

  return (
    <div className="border border-gray-200 rounded-lg p-4 transition-all hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
            {index + 1}
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800">{lesson.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
            
            <div className="flex items-center gap-3 mt-2">
              {lessonTypeBadge}
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {lesson.duration} min
              </div>
              
              <div className="flex items-center text-sm text-indigo-600">
                <Zap className="h-3.5 w-3.5 mr-1" />
                {lesson.xpReward} XP
              </div>
            </div>
          </div>
        </div>
        
        <Button variant="primary" size="sm" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default PathDetails;