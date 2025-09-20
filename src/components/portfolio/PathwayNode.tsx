import { Check, Lock } from 'lucide-react';
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
  position?: string;
}

const PathwayNode = ({ section, onClick }: PathwayNodeProps) => {
  const { title, description, icon: Icon, progress, status, unlockThreshold } = section;

  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          borderColor: 'border-success',
          bgColor: 'bg-success/10',
          textColor: 'text-success',
          iconBg: 'bg-success',
          iconColor: 'text-white',
          clickable: true
        };
      case 'in-progress':
        return {
          borderColor: 'border-primary',
          bgColor: 'bg-primary/10',
          textColor: 'text-primary',
          iconBg: 'bg-primary',
          iconColor: 'text-white',
          clickable: true
        };
      case 'available':
        return {
          borderColor: 'border-secondary',
          bgColor: 'bg-secondary/10',
          textColor: 'text-secondary',
          iconBg: 'bg-secondary',
          iconColor: 'text-white',
          clickable: true
        };
      case 'locked':
        return {
          borderColor: 'border-muted',
          bgColor: 'bg-muted/10',
          textColor: 'text-muted-foreground',
          iconBg: 'bg-muted',
          iconColor: 'text-muted-foreground',
          clickable: false
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div 
      className={cn(
        "relative w-96 p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
        config.borderColor,
        config.bgColor,
        config.clickable && "hover:shadow-lg hover:scale-[1.02]",
        !config.clickable && "opacity-60 cursor-not-allowed"
      )}
      onClick={config.clickable ? onClick : undefined}
    >
      {/* Progress Ring */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="relative w-16 h-16">
          {/* Background Ring */}
          <div className={cn("w-16 h-16 rounded-full border-4 border-muted/20", config.iconBg)} />
          
          {/* Progress Ring */}
          {progress > 0 && (
            <svg className="absolute inset-0 w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 176} 176`}
                strokeLinecap="round"
                className={cn("transition-all duration-500", config.textColor)}
              />
            </svg>
          )}
          
          {/* Center Icon */}
          <div className={cn("absolute inset-2 w-12 h-12 rounded-full flex items-center justify-center", config.iconBg)}>
            {status === 'completed' ? (
              <Check className={cn("h-6 w-6", config.iconColor)} />
            ) : status === 'locked' ? (
              <Lock className={cn("h-5 w-5", config.iconColor)} />
            ) : (
              <Icon className={cn("h-6 w-6", config.iconColor)} />
            )}
          </div>
          
          {/* Progress Percentage */}
          {progress > 0 && progress < 100 && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className={cn("px-2 py-1 rounded-full text-xs font-bold text-white", config.iconBg)}>
                {progress}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 text-center">
        <h3 className={cn("font-bold text-lg mb-2", config.textColor)}>
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className={cn("h-2 w-2 rounded-full", 
            status === 'completed' && "bg-success",
            status === 'in-progress' && "bg-primary",
            status === 'available' && "bg-secondary", 
            status === 'locked' && "bg-muted-foreground"
          )} />
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {status === 'in-progress' ? 'In Progress' : status.replace('-', ' ')}
          </span>
        </div>

        {/* Unlock Message */}
        {status === 'locked' && unlockThreshold && (
          <div className="mt-4 text-xs text-muted-foreground bg-muted/20 px-3 py-2 rounded-lg">
            {unlockThreshold}
          </div>
        )}
      </div>
    </div>
  );
};

export default PathwayNode;