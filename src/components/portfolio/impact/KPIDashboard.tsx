import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export interface KPI {
  id: string;
  value: string | number;
  label: string;
  context: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    change: string;
  };
  significance: string;
}

interface KPIDashboardProps {
  kpis: KPI[];
}

export const KPIDashboard: React.FC<KPIDashboardProps> = ({ kpis }) => {
  const [openKpis, setOpenKpis] = useState<Record<string, boolean>>({});

  const toggleKpi = (id: string) => {
    setOpenKpis(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">Key Outcomes</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                Critical metrics showing real-world impact. Click any metric for full context.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <Collapsible open={openKpis[kpi.id]} onOpenChange={() => toggleKpi(kpi.id)}>
                <div className="space-y-3">
                  {/* Value and Label */}
                  <div className="space-y-1">
                    <div className="text-4xl md:text-5xl font-extrabold text-primary">
                      {kpi.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
                      {kpi.label}
                    </div>
                  </div>

                  {/* Trend */}
                  {kpi.trend && (
                    <div className="flex items-center gap-2 text-sm">
                      {getTrendIcon(kpi.trend.direction)}
                      <span className="text-muted-foreground">{kpi.trend.change}</span>
                    </div>
                  )}

                  {/* Collapsible Context */}
                  <CollapsibleTrigger className="w-full">
                    <div className="text-xs text-primary hover:underline cursor-pointer text-left">
                      {openKpis[kpi.id] ? 'Hide context' : 'Show context'}
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-2 pt-2 border-t">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {kpi.context}
                    </p>
                    <div className="mt-2 p-3 bg-primary/5 rounded-md">
                      <div className="text-xs font-semibold text-foreground mb-1">
                        Why This Matters
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {kpi.significance}
                      </p>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
