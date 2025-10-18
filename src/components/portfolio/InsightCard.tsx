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
  collapsed?: boolean;
  onExpand?: () => void;
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
  collapsed = false,
  onExpand,
}) => {
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(!collapsed);
  
  const config = INSIGHT_CONFIG[type];
  const priorityConfig = PRIORITY_CONFIG[priority];
  const Icon = config.icon;

  const handleCardClick = () => {
    if (collapsed && !isCardExpanded) {
      setIsCardExpanded(true);
      onExpand?.();
    }
  };

  // Minimal collapsed view
  if (collapsed && !isCardExpanded) {
    return (
      <Card 
        className={cn(
          'group cursor-pointer hover:border-primary/40 transition-all duration-300',
          'border',
          config.borderClass,
          className
        )}
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={cn('p-2 rounded-lg', config.bgClass)}>
                <Icon className={cn('h-4 w-4', config.colorClass)} />
              </div>
              <h3 className="font-semibold text-base leading-tight text-foreground truncate">
                {headline}
              </h3>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full expanded view
  return (
    <Card 
      className={cn(
        'group transition-all duration-300 overflow-hidden',
        priority === 'critical' ? 'border-l-4 border-l-destructive' : 'border-l-4',
        priority === 'high' ? 'border-l-primary' : '',
        priority === 'critical' && 'shadow-lg',
        className
      )}
    >
      <CardContent className="p-7 md:p-8 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={cn(
              'p-2.5 rounded-xl flex-shrink-0',
              config.bgClass
            )}>
              <Icon className={cn('h-5 w-5', config.colorClass)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                'font-extrabold leading-tight text-foreground',
                priority === 'critical' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
              )}>
                {headline}
              </h3>
            </div>
          </div>
          
          {priority === 'critical' && impactScore && (
            <Badge variant="destructive" className="font-mono flex-shrink-0">
              Impact: {impactScore}/10
            </Badge>
          )}
        </div>

        {/* Main Insight */}
        <div className={cn(
          'p-4 rounded-lg border',
          config.bgClass,
          config.borderClass
        )}>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground">
            {insight}
          </p>
        </div>

        {/* Significance */}
        <div className="space-y-2">
          <p className="text-base font-semibold uppercase tracking-wide text-muted-foreground">
            Why This Matters
          </p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
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
            onClick={() => setIsEvidenceExpanded(!isEvidenceExpanded)}
            className="w-full justify-between px-0 hover:bg-transparent"
          >
            <span className="text-base font-semibold uppercase tracking-wide text-muted-foreground">
              Evidence ({evidence.length})
            </span>
            {isEvidenceExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {isEvidenceExpanded && (
            <div className="flex flex-wrap gap-2 pt-2 animate-accordion-down">
              {evidence.map((item, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm"
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-1" />}
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
              variant={priority === 'critical' ? 'default' : 'outline'}
              className="w-full text-lg py-6"
            >
              {action.label}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
