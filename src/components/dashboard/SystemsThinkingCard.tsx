import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GitBranch, Target, Zap, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface SystemsNode {
  id: string;
  label: string;
  type: 'root-cause' | 'symptom' | 'intervention' | 'outcome';
  description: string;
  connections?: string[];
}

interface FeedbackLoop {
  title: string;
  description: string;
  type: 'reinforcing' | 'balancing';
  impact: 'positive' | 'negative' | 'mixed';
}

interface SystemsThinkingCardProps {
  problemStatement: string;
  rootCauses: string[];
  systemsMap: SystemsNode[];
  feedbackLoops: FeedbackLoop[];
  beforeAfter: {
    before: string;
    after: string;
    keyChanges: string[];
  };
  className?: string;
}

const getNodeColor = (type: SystemsNode['type']) => {
  switch (type) {
    case 'root-cause': return 'bg-red-50 border-red-200 text-red-700';
    case 'symptom': return 'bg-orange-50 border-orange-200 text-orange-700';
    case 'intervention': return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'outcome': return 'bg-green-50 border-green-200 text-green-700';
    default: return 'bg-muted border-border text-muted-foreground';
  }
};

const getLoopIcon = (type: FeedbackLoop['type']) => {
  return type === 'reinforcing' ? <Zap className="h-3 w-3" /> : <RefreshCw className="h-3 w-3" />;
};

export const SystemsThinkingCard: React.FC<SystemsThinkingCardProps> = ({
  problemStatement,
  rootCauses,
  systemsMap,
  feedbackLoops,
  beforeAfter,
  className
}) => {
  const [expandedView, setExpandedView] = useState<'causes' | 'map' | 'loops' | null>(null);

  return (
    <Card className={cn(
      'overflow-hidden bg-gradient-to-br from-background via-accent/5 to-secondary/5 border-accent/20',
      className
    )}>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-accent" />
            Systems Thinking Analysis
          </h3>
          <p className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg border-l-4 border-accent">
            <strong>Problem Statement:</strong> {problemStatement}
          </p>
        </div>

        {/* Root Causes Analysis */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto"
            onClick={() => setExpandedView(expandedView === 'causes' ? null : 'causes')}
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-red-600" />
              <span className="font-medium">Root Causes Identification</span>
              <Badge variant="secondary">{rootCauses.length} identified</Badge>
            </div>
            {expandedView === 'causes' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedView === 'causes' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {rootCauses.map((cause, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 leading-relaxed">{cause}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Systems Map */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto"
            onClick={() => setExpandedView(expandedView === 'map' ? null : 'map')}
          >
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Systems Map & Connections</span>
              <Badge variant="secondary">{systemsMap.length} nodes</Badge>
            </div>
            {expandedView === 'map' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedView === 'map' && (
            <div className="mt-4 space-y-4">
              {['root-cause', 'symptom', 'intervention', 'outcome'].map((nodeType) => {
                const nodes = systemsMap.filter(node => node.type === nodeType);
                if (nodes.length === 0) return null;
                
                return (
                  <div key={nodeType}>
                    <h5 className="text-sm font-medium text-muted-foreground mb-2 capitalize">
                      {nodeType.replace('-', ' ')}s
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {nodes.map((node) => (
                        <div key={node.id} className={cn('p-3 rounded-lg border', getNodeColor(node.type))}>
                          <h6 className="font-medium mb-1">{node.label}</h6>
                          <p className="text-xs leading-relaxed">{node.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Feedback Loops */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto"
            onClick={() => setExpandedView(expandedView === 'loops' ? null : 'loops')}
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Feedback Loops Analysis</span>
              <Badge variant="secondary">{feedbackLoops.length} loops</Badge>
            </div>
            {expandedView === 'loops' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedView === 'loops' && (
            <div className="mt-4 space-y-3">
              {feedbackLoops.map((loop, index) => (
                <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getLoopIcon(loop.type)}
                    <h6 className="font-medium text-purple-700">{loop.title}</h6>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        'text-xs',
                        loop.impact === 'positive' ? 'border-green-300 text-green-700' :
                        loop.impact === 'negative' ? 'border-red-300 text-red-700' :
                        'border-yellow-300 text-yellow-700'
                      )}
                    >
                      {loop.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-600 leading-relaxed">{loop.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Before/After System State */}
        <div className="p-4 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg border border-accent/20">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-accent" />
            System Transformation
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <h5 className="text-sm font-medium text-red-700 mb-2">BEFORE STATE</h5>
              <p className="text-sm text-red-600 leading-relaxed">{beforeAfter.before}</p>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="text-sm font-medium text-green-700 mb-2">AFTER STATE</h5>
              <p className="text-sm text-green-600 leading-relaxed">{beforeAfter.after}</p>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-muted-foreground mb-2">Key System Changes:</h5>
            <div className="flex flex-wrap gap-2">
              {beforeAfter.keyChanges.map((change, index) => (
                <Badge key={index} variant="outline" className="border-accent/50 text-accent">
                  {change}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};