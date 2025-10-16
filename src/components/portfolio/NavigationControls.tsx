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
    <div className={`inline-flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        disabled={current === 0}
        className="h-7 w-7 hover:bg-primary/10"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium text-foreground px-2 min-w-[4rem] text-center">
        {current + 1} of {total}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={current === total - 1}
        className="h-7 w-7 hover:bg-primary/10"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
