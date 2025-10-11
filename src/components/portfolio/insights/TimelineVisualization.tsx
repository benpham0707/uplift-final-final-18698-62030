import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TimelineEvent {
  date: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  description?: string;
}

interface TimelineVisualizationProps {
  events: TimelineEvent[];
  className?: string;
}

export const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({
  events,
  className,
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        Growth Timeline
      </p>
      <div className="relative pl-8 space-y-6">
        {/* Vertical line */}
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
        
        {events.map((event, index) => {
          const Icon = event.status === 'completed' 
            ? CheckCircle2 
            : event.status === 'current' 
            ? Clock 
            : Circle;
          
          const iconColor = event.status === 'completed'
            ? 'text-success'
            : event.status === 'current'
            ? 'text-primary'
            : 'text-muted-foreground';
            
          const bgColor = event.status === 'completed'
            ? 'bg-success/10'
            : event.status === 'current'
            ? 'bg-primary/10'
            : 'bg-muted';

          return (
            <div key={index} className="relative">
              {/* Icon */}
              <div className={cn(
                'absolute -left-8 p-1 rounded-full',
                bgColor
              )}>
                <Icon className={cn('h-4 w-4', iconColor)} />
              </div>
              
              {/* Content */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {event.date}
                  </span>
                  <span className={cn(
                    'text-sm font-semibold',
                    event.status === 'current' && 'text-primary'
                  )}>
                    {event.label}
                  </span>
                </div>
                {event.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
