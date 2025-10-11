import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react';

interface ComparisonItem {
  label: string;
  yourValue: number;
  averageValue: number;
  unit?: string;
  max: number;
}

interface ComparisonVisualizationProps {
  items: ComparisonItem[];
  className?: string;
}

export const ComparisonVisualization: React.FC<ComparisonVisualizationProps> = ({
  items,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        You vs. Peer Average
      </p>
      
      {items.map((item, index) => {
        const yourPercent = (item.yourValue / item.max) * 100;
        const avgPercent = (item.averageValue / item.max) * 100;
        const diff = item.yourValue - item.averageValue;
        const diffPercent = ((diff / item.averageValue) * 100).toFixed(0);
        
        const TrendIcon = diff > 0 ? TrendingUp : diff < 0 ? TrendingDown : Minus;
        const trendColor = diff > 0 ? 'text-success' : diff < 0 ? 'text-destructive' : 'text-muted-foreground';

        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-foreground">
                  {item.yourValue}{item.unit}
                </span>
                <TrendIcon className={cn('h-4 w-4', trendColor)} />
                <span className={cn('text-xs font-semibold', trendColor)}>
                  {diff > 0 ? '+' : ''}{diffPercent}%
                </span>
              </div>
            </div>
            
            {/* Bar comparison */}
            <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
              {/* Average bar */}
              <div 
                className="absolute inset-y-0 left-0 bg-muted-foreground/30 flex items-center justify-end pr-2"
                style={{ width: `${avgPercent}%` }}
              >
                <span className="text-xs font-medium text-muted-foreground">
                  Avg: {item.averageValue}{item.unit}
                </span>
              </div>
              
              {/* Your bar */}
              <div 
                className={cn(
                  'absolute inset-y-0 left-0 flex items-center justify-end pr-2 transition-all duration-500',
                  diff > 0 ? 'bg-success/40' : diff < 0 ? 'bg-destructive/40' : 'bg-primary/40'
                )}
                style={{ width: `${yourPercent}%` }}
              >
                <span className="text-xs font-semibold text-foreground">
                  You
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
