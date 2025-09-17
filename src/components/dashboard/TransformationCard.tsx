import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

interface TransformationStage {
  title: string;
  description: string;
  keyLearning: string;
  milestone?: string;
}

interface TransformationCardProps {
  title: string;
  progression: TransformationStage[];
  characterStrengths: string[];
  className?: string;
}

export const TransformationCard: React.FC<TransformationCardProps> = ({
  title,
  progression,
  characterStrengths,
  className
}) => {
  return (
    <Card className={cn(
      'overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5 border-primary/20',
      className
    )}>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {characterStrengths.map((strength, index) => (
              <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                <Star className="h-3 w-3 mr-1" />
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Progression timeline */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50" />
          
          <div className="space-y-6">
            {progression.map((stage, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Timeline node */}
                <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30 relative z-10 mt-2" />
                
                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-card/50 rounded-lg p-4 border border-border/50 backdrop-blur-sm">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      {stage.title}
                      {stage.milestone && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {stage.milestone}
                        </Badge>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {stage.description}
                    </p>
                    <div className="bg-accent/10 rounded-md p-3 border-l-4 border-accent">
                      <p className="text-sm text-accent-foreground">
                        <strong>Key Learning:</strong> {stage.keyLearning}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-primary">
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-medium">Character Development Arc Complete</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Demonstrates clear personal growth trajectory with evidence-based progression
          </p>
        </div>
      </CardContent>
    </Card>
  );
};