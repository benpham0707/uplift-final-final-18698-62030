import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GuidanceInsight {
  id: string;
  type: 'strength' | 'opportunity' | 'consideration' | 'strategy';
  headline: string;
  detail: string;
  actionable?: string;
}

interface StorytellingGuidanceProps {
  insights: GuidanceInsight[];
}

const typeConfig = {
  'strength': {
    icon: TrendingUp,
    label: 'Strength',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  'opportunity': {
    icon: Lightbulb,
    label: 'Opportunity',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  'consideration': {
    icon: AlertCircle,
    label: 'Consider',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  'strategy': {
    icon: Target,
    label: 'Strategy',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
};

export const StorytellingGuidance: React.FC<StorytellingGuidanceProps> = ({ insights }) => {
  const [openInsights, setOpenInsights] = React.useState<Record<string, boolean>>({});

  const toggleInsight = (id: string) => {
    setOpenInsights(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="border-primary/20">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Strategic Storytelling Guidance
          </h3>
          <p className="text-sm text-muted-foreground">
            Recommendations based on your impact data to help you frame your narrative effectively.
          </p>
        </div>

        <div className="space-y-3">
          {insights.map((insight) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            const isOpen = openInsights[insight.id];

            return (
              <Collapsible 
                key={insight.id} 
                open={isOpen} 
                onOpenChange={() => toggleInsight(insight.id)}
              >
                <div 
                  className={cn(
                    "rounded-lg border-2",
                    config.bgColor,
                    config.borderColor
                  )}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="p-4 hover:opacity-80 transition-opacity">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 text-left">
                          <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.color)} />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                {config.label}
                              </span>
                            </div>
                            <h4 className="font-semibold text-foreground leading-snug">
                              {insight.headline}
                            </h4>
                          </div>
                        </div>
                        <ChevronDown 
                          className={cn(
                            "w-5 h-5 flex-shrink-0 transition-transform text-muted-foreground",
                            isOpen && "rotate-180"
                          )} 
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                      <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                        {insight.detail}
                      </p>
                      
                      {insight.actionable && (
                        <div className="pl-8 pt-2">
                          <div className="p-3 rounded-md bg-background/50 border border-border/50">
                            <div className="text-xs font-semibold text-foreground mb-1">
                              ✨ Action Step
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {insight.actionable}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
