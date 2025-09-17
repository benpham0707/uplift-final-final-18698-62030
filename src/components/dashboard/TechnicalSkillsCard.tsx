import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Code, Zap, TrendingUp, Award, Database, Cpu } from 'lucide-react';

interface SkillProgress {
  skill: string;
  category: 'programming' | 'systems' | 'tools' | 'frameworks';
  before: number;
  current: number;
  evidence: string[];
  keyProject: string;
}

interface TechnicalAchievement {
  title: string;
  description: string;
  technicalComplexity: number;
  innovation: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface TechnicalSkillsCardProps {
  skillProgression: SkillProgress[];
  majorAchievements: TechnicalAchievement[];
  technologyStack: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    systems: string[];
  };
  className?: string;
}

const getCategoryIcon = (category: SkillProgress['category']) => {
  switch (category) {
    case 'programming': return <Code className="h-4 w-4" />;
    case 'systems': return <Cpu className="h-4 w-4" />;
    case 'tools': return <Zap className="h-4 w-4" />;
    case 'frameworks': return <Database className="h-4 w-4" />;
    default: return <Code className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: SkillProgress['category']) => {
  switch (category) {
    case 'programming': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'systems': return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'tools': return 'text-green-600 bg-green-50 border-green-200';
    case 'frameworks': return 'text-orange-600 bg-orange-50 border-orange-200';
    default: return 'text-muted-foreground bg-muted border-border';
  }
};

export const TechnicalSkillsCard: React.FC<TechnicalSkillsCardProps> = ({
  skillProgression,
  majorAchievements,
  technologyStack,
  className
}) => {
  const calculateGrowth = (before: number, current: number) => {
    return Math.round(((current - before) / before) * 100);
  };

  return (
    <Card className={cn(
      'overflow-hidden bg-gradient-to-br from-background via-blue/5 to-purple/5 border-blue/20',
      className
    )}>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-600" />
            Technical Mastery Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Skill progression tracking with evidence-based competency development
          </p>
        </div>

        {/* Skill Progression */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Skill Development Journey
          </h4>
          
          <div className="space-y-4">
            {skillProgression.map((skill, index) => (
              <div key={index} className={cn(
                'p-4 rounded-lg border',
                getCategoryColor(skill.category)
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(skill.category)}
                    <h5 className="font-medium">{skill.skill}</h5>
                    <Badge variant="outline" className="text-xs">
                      +{calculateGrowth(skill.before, skill.current)}% growth
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{skill.current}%</div>
                    <div className="text-xs opacity-70">mastery</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Before: {skill.before}%</span>
                    <span>Current: {skill.current}%</span>
                  </div>
                  <Progress value={skill.current} className="h-2" />
                </div>
                
                <div className="mb-3">
                  <p className="text-xs font-medium opacity-80 mb-1">Key Project:</p>
                  <p className="text-sm">{skill.keyProject}</p>
                </div>
                
                <div>
                  <p className="text-xs font-medium opacity-80 mb-1">Evidence:</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.evidence.map((evidence, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {evidence}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Achievements */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-4 w-4 text-yellow-600" />
            Technical Achievements
          </h4>
          
          <div className="space-y-4">
            {majorAchievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h5 className="font-medium text-yellow-800">{achievement.title}</h5>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-yellow-600">Complexity:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={cn(
                          'w-2 h-2 rounded-full mr-1',
                          i < achievement.technicalComplexity ? 'bg-yellow-500' : 'bg-yellow-200'
                        )} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-yellow-700 mb-3 leading-relaxed">
                  {achievement.description}
                </p>
                
                <div className="mb-3">
                  <p className="text-xs font-medium text-yellow-600 mb-1">Innovation:</p>
                  <p className="text-sm text-yellow-700 italic">{achievement.innovation}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {achievement.metrics.map((metric, i) => (
                    <div key={i} className="text-center bg-white/50 rounded-md p-2">
                      <div className="text-lg font-bold text-yellow-800">{metric.value}</div>
                      <div className="text-xs text-yellow-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Technology Stack Mastery
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(technologyStack).map(([category, technologies]) => (
              <div key={category}>
                <h5 className="text-sm font-medium text-blue-700 mb-2 capitalize">
                  {category}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="border-blue-300 text-blue-700 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};