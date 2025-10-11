import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InsightHeroProps {
  icon: LucideIcon;
  headline: string;
  insight: string;
  action: {
    label: string;
    onClick: () => void;
  };
  colorClass: string;
  bgClass: string;
}

export const InsightHero: React.FC<InsightHeroProps> = ({
  icon: Icon,
  headline,
  insight,
  action,
  colorClass,
  bgClass,
}) => {
  return (
    <Card className="border-2 border-destructive/30 shadow-xl overflow-hidden">
      <CardContent className="p-8 md:p-12 text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className={cn(
            'p-4 rounded-2xl',
            bgClass
          )}>
            <Icon className={cn('h-12 w-12', colorClass)} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="text-sm font-bold uppercase tracking-wider text-destructive">
              Most Important Action
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground leading-tight">
            {headline}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {insight}
          </p>
        </div>

        {/* Action */}
        <div className="pt-4">
          <Button
            onClick={action.onClick}
            size="lg"
            className="text-lg px-8"
          >
            {action.label}
          </Button>
        </div>

        {/* Progress Indicator */}
        <p className="text-sm text-muted-foreground pt-2">
          Critical insight 1 of 2
        </p>
      </CardContent>
    </Card>
  );
};
