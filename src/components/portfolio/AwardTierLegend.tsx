import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TierDefinition {
  tier: string;
  description: string;
  percentile: string;
  colorClass: string;
}

interface AwardTierLegendProps {
  tiers: TierDefinition[];
}

export const AwardTierLegend: React.FC<AwardTierLegendProps> = ({ tiers }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="shadow-sm border-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="p-5">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-foreground">
                  What do these recognition tiers mean?
                </h3>
              </div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-muted-foreground transition-transform',
                  isOpen && 'rotate-180'
                )}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mt-4 space-y-3">
              {tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-accent/30 border border-border/50"
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-2 h-2 rounded-full mt-1.5 bg-gradient-to-br',
                      tier.colorClass
                    )}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm text-foreground">
                        {tier.tier}
                      </span>
                      <span className="text-xs text-primary font-medium">
                        {tier.percentile}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};
