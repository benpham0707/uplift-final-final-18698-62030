import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  current,
  total,
  onPrev,
  onNext,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1 border border-border/50 rounded-md px-1 py-0.5 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        disabled={current === 0}
        className="h-5 w-5 hover:bg-accent/50"
      >
        <ChevronLeft className="h-3 w-3" />
      </Button>
      <span className="text-[10px] text-muted-foreground px-1 min-w-[2.5rem] text-center">
        {current + 1} of {total}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={current === total - 1}
        className="h-5 w-5 hover:bg-accent/50"
      >
        <ChevronRight className="h-3 w-3" />
      </Button>
    </div>
  );
};
