import React from 'react';
import { Badge } from '@/components/ui/badge';
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
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 9.0) return 'from-amber-500 to-amber-600 text-white';
    if (score >= 7.0) return 'from-green-500 to-green-600 text-white';
    if (score >= 5.0) return 'from-blue-500 to-blue-600 text-white';
    return 'from-orange-500 to-orange-600 text-white';
  };

  const getBorderColor = (score: number) => {
    if (score >= 9.0) return 'border-amber-500/50';
    if (score >= 7.0) return 'border-green-500/50';
    if (score >= 5.0) return 'border-blue-500/50';
    return 'border-orange-500/50';
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br border-2",
        getScoreColor(score),
        getBorderColor(score)
      )}>
        <span className="text-lg font-bold">{score.toFixed(1)}</span>
        <div className="absolute inset-0 rounded-full bg-white/10"></div>
      </div>
      {isRecommended && (
        <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
          Recommended
        </Badge>
      )}
    </div>
  );
};
