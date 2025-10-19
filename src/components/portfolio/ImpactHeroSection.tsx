import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImpactHeroSectionProps {
  primaryMetric: {
    value: number;
    label: string;
    unit: string;
  };
  secondaryMetrics: Array<{
    value: number | string;
    label: string;
  }>;
  description: string;
}

export const ImpactHeroSection: React.FC<ImpactHeroSectionProps> = ({
  primaryMetric,
  secondaryMetrics,
  description,
}) => {
  return (
    <Card className="relative overflow-hidden shadow-md border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <CardContent className="relative p-8 md:p-10">
        <div className="space-y-6">
          {/* Icon and Header */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Impact Footprint
            </h2>
          </div>

          {/* Primary Metric */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl md:text-6xl font-extrabold text-primary">
                {primaryMetric.value}
              </span>
              <span className="text-lg text-muted-foreground">
                {primaryMetric.label}
              </span>
            </div>
          </div>

          {/* Secondary Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {secondaryMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-base text-foreground/90 leading-relaxed pt-4 border-t">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
