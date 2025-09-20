import { Check, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PathwaySection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  status: 'completed' | 'in-progress' | 'available' | 'locked';
  unlockThreshold?: string;
}

interface PathwayNodeProps {
  section: PathwaySection;
  onClick: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const PathwayNode = ({ section, onClick, isFirst, isLast }: PathwayNodeProps) => {
  const { title, description, icon: Icon, progress, status, unlockThreshold } = section;

  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          nodeClass: 'bg-gradient-to-br from-success to-success/80 border-success text-success-foreground shadow-medium hover:shadow-strong',
          ringClass: 'ring-2 ring-success/20',
          iconElement: <Check className="h-6 w-6" />,
          progressColor: 'text-success-foreground',
          clickable: true,
          glow: 'hover:shadow-[0_0_20px_hsl(var(--success)/0.4)]'
        };
      case 'in-progress':
        return {
          nodeClass: 'bg-gradient-to-br from-primary to-primary/80 border-primary text-primary-foreground shadow-medium hover:shadow-strong animate-glow-pulse',
          ringClass: 'ring-2 ring-primary/20',
          iconElement: <Icon className="h-6 w-6" />,
          progressColor: 'text-primary-foreground',
          clickable: true,
          glow: 'hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]'
        };
      case 'available':
        return {
          nodeClass: 'bg-card border-border hover:border-primary/50 shadow-soft hover:shadow-medium hover:bg-primary/5',
          ringClass: 'ring-2 ring-primary/10 hover:ring-primary/20',
          iconElement: <Icon className="h-6 w-6 text-primary" />,
          progressColor: 'text-muted-foreground',
          clickable: true,
          glow: 'hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]'
        };
      case 'locked':
        return {
          nodeClass: 'bg-muted/50 border-muted text-muted-foreground cursor-not-allowed',
          ringClass: 'ring-1 ring-muted/30',
          iconElement: <Lock className="h-5 w-5" />,
          progressColor: 'text-muted-foreground',
          clickable: false,
          glow: ''
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex items-center space-x-6 animate-fade-in">
      {/* Progress Ring & Node */}
      <div className="relative flex-shrink-0">
        {/* Outer Progress Ring */}
        <div className="relative w-20 h-20">
          {/* Background Circle */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-muted/20" />
          
          {/* Progress Ring */}
          {progress > 0 && (
            <svg className="absolute inset-0 w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 226.2} 226.2`}
                className={cn(
                  "transition-all duration-500",
                  status === 'completed' ? 'text-success' : 'text-primary'
                )}
              />
            </svg>
          )}
          
          {/* Center Node */}
          <Button
            onClick={statusConfig.clickable ? onClick : undefined}
            disabled={!statusConfig.clickable}
            className={cn(
              "absolute inset-2 w-16 h-16 rounded-full transition-all duration-300 p-0",
              statusConfig.nodeClass,
              statusConfig.ringClass,
              statusConfig.glow,
              statusConfig.clickable && "hover:scale-105 active:scale-95"
            )}
          >
            {statusConfig.iconElement}
          </Button>
        </div>

        {/* Progress Percentage */}
        {progress > 0 && progress < 100 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              {progress}%
            </div>
          </div>
        )}
      </div>

      {/* Content Card */}
      <Card 
        className={cn(
          "flex-1 transition-all duration-300 cursor-pointer hover:shadow-medium",
          statusConfig.clickable && "hover:border-primary/30",
          !statusConfig.clickable && "opacity-60 cursor-not-allowed"
        )}
        onClick={statusConfig.clickable ? onClick : undefined}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className={cn(
                  "font-semibold text-lg",
                  status === 'completed' && "text-success",
                  status === 'in-progress' && "text-primary",
                  status === 'locked' && "text-muted-foreground"
                )}>
                  {title}
                </h3>
                {status === 'completed' && (
                  <Check className="h-5 w-5 text-success" />
                )}
              </div>
              
              <p className="text-muted-foreground text-sm mb-3">
                {description}
              </p>

              {/* Progress Bar for in-progress sections */}
              {status === 'in-progress' && progress > 0 && progress < 100 && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Unlock requirement for locked sections */}
              {status === 'locked' && unlockThreshold && (
                <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
                  <Lock className="h-3 w-3 inline mr-1" />
                  {unlockThreshold}
                </div>
              )}

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  status === 'completed' && "bg-success",
                  status === 'in-progress' && "bg-primary animate-pulse",
                  status === 'available' && "bg-secondary",
                  status === 'locked' && "bg-muted-foreground"
                )} />
                <span className="text-xs font-medium capitalize text-muted-foreground">
                  {status === 'in-progress' ? 'In Progress' : status.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Action Arrow */}
            {statusConfig.clickable && (
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PathwayNode;