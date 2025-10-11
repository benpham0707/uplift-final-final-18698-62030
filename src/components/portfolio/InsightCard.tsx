import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Brain, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Target, 
  GitMerge, 
  Scale,
  ChevronDown,
  ChevronUp,
  LucideIcon
} from 'lucide-react';

export type InsightType = 'pattern' | 'comparison' | 'gap' | 'strength' | 'trajectory' | 'correlation' | 'opportunity' | 'risk';
export type InsightPriority = 'critical' | 'high' | 'medium' | 'low';

interface EvidenceItem {
  label: string;
  icon?: LucideIcon;
}

interface ActionConfig {
  label: string;
  onClick: () => void;
}

export interface InsightCardProps {
  type: InsightType;
  headline: string;
  insight: string;
  significance: string;
  evidence: EvidenceItem[];
  visualization?: React.ReactNode;
  action?: ActionConfig;
  priority: InsightPriority;
  impactScore?: number;
  className?: string;
}

const INSIGHT_CONFIG: Record<InsightType, {
  icon: LucideIcon;
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}> = {
  pattern: {
    icon: Brain,
    label: 'Pattern Recognition',
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/20',
  },
  gap: {
    icon: AlertTriangle,
    label: 'Gap Analysis',
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
    borderClass: 'border-warning/20',
  },
  strength: {
    icon: Sparkles,
    label: 'Hidden Strength',
    colorClass: 'text-success',
    bgClass: 'bg-success/10',
    borderClass: 'border-success/20',
  },
  trajectory: {
    icon: TrendingUp,
    label: 'Growth Trajectory',
    colorClass: 'text-accent',
    bgClass: 'bg-accent/10',
    borderClass: 'border-accent/20',
  },
  risk: {
    icon: AlertCircle,
    label: 'Risk Alert',
    colorClass: 'text-destructive',
    bgClass: 'bg-destructive/10',
    borderClass: 'border-destructive/20',
  },
  opportunity: {
    icon: Target,
    label: 'Strategic Opportunity',
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary/10',
    borderClass: 'border-secondary/20',
  },
  correlation: {
    icon: GitMerge,
    label: 'Cross-Domain Connection',
    colorClass: 'text-primary-dark',
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/20',
  },
  comparison: {
    icon: Scale,
    label: 'Comparative Analysis',
    colorClass: 'text-secondary-light',
    bgClass: 'bg-secondary/10',
    borderClass: 'border-secondary/20',
  },
};

const PRIORITY_CONFIG: Record<InsightPriority, {
  badgeVariant: 'default' | 'secondary' | 'outline' | 'destructive';
  label: string;
  sizeClass: string;
}> = {
  critical: {
    badgeVariant: 'destructive',
    label: 'Critical',
    sizeClass: 'col-span-full',
  },
  high: {
    badgeVariant: 'default',
    label: 'High Priority',
    sizeClass: 'md:col-span-2',
  },
  medium: {
    badgeVariant: 'secondary',
    label: 'Medium',
    sizeClass: 'md:col-span-1',
  },
  low: {
    badgeVariant: 'outline',
    label: 'For Review',
    sizeClass: 'md:col-span-1',
  },
};

export const InsightCard: React.FC<InsightCardProps> = ({
  type,
  headline,
  insight,
  significance,
  evidence,
  visualization,
  action,
  priority,
  impactScore,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const config = INSIGHT_CONFIG[type];
  const priorityConfig = PRIORITY_CONFIG[priority];
  const Icon = config.icon;

  return (
    <Card 
      className={cn(
        'group hover-lift transition-all duration-300 overflow-hidden',
        'border-2',
        config.borderClass,
        priorityConfig.sizeClass,
        priority === 'critical' && 'shadow-large',
        className
      )}
    >
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={cn(
              'p-2.5 rounded-xl flex-shrink-0',
              config.bgClass,
              'transition-transform duration-300 group-hover:scale-110'
            )}>
              <Icon className={cn('h-5 w-5', config.colorClass)} />
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="mb-2">
                {config.label}
              </Badge>
              <h3 className="font-bold text-xl leading-tight text-foreground">
                {headline}
              </h3>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <Badge variant={priorityConfig.badgeVariant}>
              {priorityConfig.label}
            </Badge>
            {impactScore && (
              <Badge variant="outline" className="font-mono">
                {impactScore}/10
              </Badge>
            )}
          </div>
        </div>

        {/* Main Insight */}
        <div className={cn(
          'p-4 rounded-lg border',
          config.bgClass,
          config.borderClass
        )}>
          <p className="text-base font-medium leading-relaxed text-foreground">
            {insight}
          </p>
        </div>

        {/* Significance */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Why This Matters
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {significance}
          </p>
        </div>

        {/* Visualization */}
        {visualization && (
          <div className="pt-4 border-t border-border">
            {visualization}
          </div>
        )}

        {/* Evidence Section (Collapsible) */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between px-0 hover:bg-transparent"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Evidence Trail ({evidence.length})
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {isExpanded && (
            <div className="flex flex-wrap gap-2 pt-2 animate-accordion-down">
              {evidence.map((item, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {item.icon && <item.icon className="h-3 w-3 mr-1" />}
                  {item.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        {action && (
          <div className="pt-2">
            <Button
              onClick={action.onClick}
              className={cn(
                'w-full',
                config.colorClass
              )}
              variant="outline"
            >
              {action.label}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
