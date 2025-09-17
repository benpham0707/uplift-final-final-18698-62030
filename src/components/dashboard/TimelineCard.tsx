import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Users } from 'lucide-react';

interface TimelineEvent {
  title: string;
  description: string;
  date: string;
  location?: string;
  participants?: string;
  impact?: string;
}

interface TimelineCardProps {
  events: TimelineEvent[];
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  events,
  variant = 'default',
  className
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary/20';
      case 'secondary':
        return 'border-secondary/20';
      default:
        return 'border-border';
    }
  };

  const getAccentColor = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-accent text-accent-foreground';
    }
  };

  return (
    <Card className={cn(
      'hover-lift transition-all duration-300 shadow-soft',
      getVariantClasses(),
      className
    )}>
      <CardContent className="p-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-8 bottom-0 w-px bg-border" />
          
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className={cn(
                  'flex-shrink-0 w-3 h-3 rounded-full mt-2 relative z-10',
                  getAccentColor()
                )} />
                
                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    
                    <h4 className="font-semibold text-foreground leading-tight">
                      {event.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  
                  {/* Additional details */}
                  <div className="flex flex-wrap gap-2">
                    {event.location && (
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </Badge>
                    )}
                    {event.participants && (
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {event.participants}
                      </Badge>
                    )}
                  </div>
                  
                  {event.impact && (
                    <div className={cn(
                      'text-xs p-3 rounded-lg',
                      variant === 'primary' ? 'bg-primary/10 text-primary' :
                      variant === 'secondary' ? 'bg-secondary/10 text-secondary' :
                      'bg-accent/10 text-accent-foreground'
                    )}>
                      <strong>Impact:</strong> {event.impact}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};