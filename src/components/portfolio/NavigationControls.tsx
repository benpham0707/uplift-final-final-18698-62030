import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NavigationVariant = 'default' | 'purple';

interface NavigationControlsProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  variant?: NavigationVariant;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  current,
  total,
  onPrev,
  onNext,
  className = '',
  variant = 'default'
}) => {
  const isPurple = variant === 'purple';

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-1 rounded-lg px-2 py-1',
        isPurple 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 shadow-sm'
          : 'border border-border/50 rounded-md px-1 py-0.5',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        disabled={current === 0}
        className={cn(
          'h-5 w-5',
          isPurple 
            ? 'text-white/90 hover:text-white hover:bg-white/10 disabled:text-white/40' 
            : 'hover:bg-accent/50'
        )}
      >
        <ChevronLeft className="h-3 w-3" />
      </Button>
      <span 
        className={cn(
          'text-[10px] px-1 min-w-[2.5rem] text-center font-medium',
          isPurple ? 'text-white' : 'text-muted-foreground'
        )}
      >
        {current + 1} of {total}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={current === total - 1}
        className={cn(
          'h-5 w-5',
          isPurple 
            ? 'text-white/90 hover:text-white hover:bg-white/10 disabled:text-white/40' 
            : 'hover:bg-accent/50'
        )}
      >
        <ChevronRight className="h-3 w-3" />
      </Button>
    </div>
  );
};
