import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SnapshotMetric {
  value: string | number;
  label: string;
  icon: 'users' | 'target' | 'trending';
}

interface ImpactSnapshotProps {
  summary: string;
  metrics: SnapshotMetric[];
}

const iconMap = {
  users: Users,
  target: Target,
  trending: TrendingUp,
};

export const ImpactSnapshot: React.FC<ImpactSnapshotProps> = ({ summary, metrics }) => {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
      <CardContent className="p-6 md:p-8 space-y-6">
        {/* Summary Statement */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-primary uppercase tracking-wider">
            Impact at a Glance
          </div>
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = iconMap[metric.icon];
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-primary/10"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
