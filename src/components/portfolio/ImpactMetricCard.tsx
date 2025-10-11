import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ImpactMetricCardProps {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  icon: LucideIcon;
  color: string;
  sparklineData: Array<{ value: number }>;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  onUpdate?: () => void;
}

export function ImpactMetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  icon: Icon,
  color,
  sparklineData,
  verificationStatus,
}: ImpactMetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  
  const verificationConfig = {
    verified: { 
      icon: CheckCircle2, 
      color: 'hsl(var(--success))', 
      label: 'Verified',
      tooltip: 'This metric has been verified with supporting evidence'
    },
    pending: { 
      icon: Clock, 
      color: 'hsl(var(--warning))', 
      label: 'Pending Review',
      tooltip: 'Evidence submitted and awaiting verification'
    },
    unverified: { 
      icon: AlertCircle, 
      color: 'hsl(var(--muted-foreground))', 
      label: 'Add Evidence',
      tooltip: 'Submit supporting documentation to verify this metric'
    },
  };

  const verification = verificationConfig[verificationStatus];
  const VerificationIcon = verification.icon;

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-accent/50">
            <Icon className="h-4 w-4" style={{ color }} />
          </div>
          <span className="text-xs font-medium text-foreground">{label}</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 cursor-help">
                <VerificationIcon className="h-3 w-3" style={{ color: verification.color }} />
                <span className="text-[10px] text-muted-foreground">{verification.label}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{verification.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main Display */}
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">
            {value.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
          {TrendIcon && (
            <Badge 
              variant="secondary" 
              className={cn(
                "ml-auto text-xs",
                trend === 'up' && "text-green-600 dark:text-green-400",
                trend === 'down' && "text-red-600 dark:text-red-400"
              )}
            >
              <TrendIcon className="h-3 w-3 mr-0.5" />
              {trendValue}
            </Badge>
          )}
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-12 px-2 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
