import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreIndicatorProps {
  score: number;
  isRecommended?: boolean;
  className?: string;
}

export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ 
  score, 
  isRecommended = false,
  className = ''
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">
        Score: <span className="font-semibold text-foreground">{score.toFixed(1)}</span>
      </span>
      {isRecommended && (
        <span className="text-xs text-amber-600 dark:text-amber-500">
          ★ Top pick
        </span>
      )}
    </div>
  );
};
