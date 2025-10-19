import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TrajectoryPoint {
  date: string;
  milestone: string;
  metric?: {
    label: string;
    value: number | string;
  };
  inflectionPoint?: boolean;
  description: string;
}

interface TrajectoryViewProps {
  points: TrajectoryPoint[];
}

export const TrajectoryView: React.FC<TrajectoryViewProps> = ({ points }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Growth Trajectory</h2>

      <Card className="border-primary/20">
        <CardContent className="p-6 md:p-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />

            {/* Timeline Points */}
            <div className="space-y-8">
              {points.map((point, idx) => (
                <div key={idx} className="relative flex gap-6">
                  {/* Timeline Dot */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center",
                        point.inflectionPoint
                          ? "bg-primary border-primary shadow-lg"
                          : "bg-background border-primary/40"
                      )}
                    >
                      {point.inflectionPoint ? (
                        <Zap className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8 space-y-2">
                    {/* Date */}
                    <div className="text-sm font-semibold text-primary">
                      {point.date}
                    </div>

                    {/* Milestone */}
                    <div className="text-lg font-bold text-foreground">
                      {point.milestone}
                    </div>

                    {/* Metric */}
                    {point.metric && (
                      <div className="inline-flex items-baseline gap-2 px-3 py-1.5 bg-primary/10 rounded-md">
                        <span className="text-xl font-bold text-primary">
                          {point.metric.value}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {point.metric.label}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
