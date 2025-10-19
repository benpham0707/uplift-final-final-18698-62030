import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface TimelineItem {
  date: string;
  initiative: string;
  metric: string;
  status: 'ongoing' | 'completed' | 'planned';
}

interface ImpactTimelineProps {
  outcomes: TimelineItem[];
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  ongoing: {
    icon: Circle,
    label: 'Ongoing',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  planned: {
    icon: Clock,
    label: 'Planned',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
};

export const ImpactTimeline: React.FC<ImpactTimelineProps> = ({ outcomes }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Card className="shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">
                Impact Timeline
              </h3>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-muted-foreground transition-transform',
                  isOpen && 'rotate-180'
                )}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="space-y-4">
              {outcomes.map((item, idx) => {
                const config = statusConfig[item.status];
                const Icon = config.icon;
                const isLast = idx === outcomes.length - 1;

                return (
                  <div key={idx} className="relative">
                    {/* Timeline connector line */}
                    {!isLast && (
                      <div className="absolute left-[11px] top-8 w-0.5 h-full bg-border" />
                    )}

                    {/* Timeline item */}
                    <div className="flex gap-4">
                      {/* Timeline dot */}
                      <div className={cn('relative flex-shrink-0 mt-1')}>
                        <Icon className={cn('w-5 h-5', config.color)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-foreground">
                                {item.initiative}
                              </h4>
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-xs',
                                  config.bgColor,
                                  config.borderColor,
                                  config.color
                                )}
                              >
                                {config.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.metric}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};
