import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface QualityDimension {
  id: string;
  name: string;
  score: number; // 0-10
  explanation: string;
  suggestion?: string;
  status: 'strong' | 'good' | 'needs-work';
}

interface ImpactQualityCheckProps {
  dimensions: QualityDimension[];
  overallAssessment: string;
}

const statusConfig = {
  'strong': { 
    icon: CheckCircle, 
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  'good': { 
    icon: Info, 
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  'needs-work': { 
    icon: AlertCircle, 
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
};

export const ImpactQualityCheck: React.FC<ImpactQualityCheckProps> = ({ 
  dimensions, 
  overallAssessment 
}) => {
  return (
    <Card className="border-primary/20">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Impact Quality Assessment
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {overallAssessment}
          </p>
        </div>

        {/* Dimensions */}
        <div className="space-y-4">
          {dimensions.map((dimension) => {
            const StatusIcon = statusConfig[dimension.status].icon;
            const percentage = (dimension.score / 10) * 100;
            
            return (
              <div 
                key={dimension.id} 
                className={cn(
                  "p-4 rounded-lg border-2",
                  statusConfig[dimension.status].bgColor,
                  statusConfig[dimension.status].borderColor
                )}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <StatusIcon className={cn("w-5 h-5", statusConfig[dimension.status].color)} />
                      <h4 className="font-semibold text-foreground">{dimension.name}</h4>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="text-lg font-bold text-foreground">
                            {dimension.score}/10
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">{dimension.explanation}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Progress Bar */}
                  <Progress value={percentage} className="h-2" />

                  {/* Explanation */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dimension.explanation}
                  </p>

                  {/* Suggestion */}
                  {dimension.suggestion && (
                    <div className="pt-2 border-t border-border/50">
                      <div className="text-xs font-semibold text-foreground mb-1">
                        💡 Suggestion
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {dimension.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
