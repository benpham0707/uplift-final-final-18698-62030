import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Lightbulb, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationInsightCardProps {
  title: string;
  priority: 'high' | 'medium' | 'low';
  impact?: string;
  timeline?: string;
  rationale?: string;
  category?: string;
  categoryIcon?: LucideIcon;
  className?: string;
}

export const RecommendationInsightCard: React.FC<RecommendationInsightCardProps> = ({
  title,
  priority,
  impact,
  timeline,
  rationale,
  category,
  categoryIcon: CategoryIcon,
  className
}) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return '#ef4444'; // red-500
      case 'medium':
        return '#f59e0b'; // amber-500
      case 'low':
        return '#3b82f6'; // blue-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const getPriorityBadgeVariant = (): 'destructive' | 'default' | 'secondary' => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getPriorityLabel = () => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Priority';
    }
  };

  return (
    <Card 
      className={cn(
        "bg-white border-2 transition-all duration-300 hover:shadow-lg border-l-4",
        className
      )}
      style={{ borderLeftColor: getPriorityColor() }}
    >
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm leading-tight mb-2">{title}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getPriorityBadgeVariant()} className="text-xs">
                {getPriorityLabel()}
              </Badge>
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
            </div>
          </div>
          {CategoryIcon && (
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${getPriorityColor()}, ${getPriorityColor()}dd)` }}
            >
              <CategoryIcon className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Impact */}
        {impact && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              Impact Analysis
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="text-muted-foreground">{impact}</span>
            </div>
          </div>
        )}
        
        {/* Timeline */}
        {timeline && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Implementation Timeline
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="text-muted-foreground">{timeline}</span>
            </div>
          </div>
        )}

        {/* Rationale */}
        {rationale && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs font-semibold text-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5" />
              Strategic Rationale
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="text-muted-foreground leading-relaxed">{rationale}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
