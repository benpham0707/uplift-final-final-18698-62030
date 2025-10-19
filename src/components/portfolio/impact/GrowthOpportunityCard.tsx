import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Clock, Zap } from 'lucide-react';

interface GrowthOpportunityCardProps {
  category: 'scale' | 'evidence' | 'recognition' | 'depth' | 'systems' | 'sustainability';
  title: string;
  rationale: string;
  steps: string[];
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export const GrowthOpportunityCard: React.FC<GrowthOpportunityCardProps> = ({
  category,
  title,
  rationale,
  steps,
  effort,
  impact
}) => {
  const categoryConfig = {
    scale: { icon: '🚀', label: 'SCALE', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    evidence: { icon: '📊', label: 'EVIDENCE', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    recognition: { icon: '🏆', label: 'RECOGNITION', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    depth: { icon: '💎', label: 'DEPTH', color: 'text-teal-600 bg-teal-50 border-teal-200' },
    systems: { icon: '⚙️', label: 'SYSTEMS', color: 'text-gray-600 bg-gray-50 border-gray-200' },
    sustainability: { icon: '🌱', label: 'SUSTAINABILITY', color: 'text-green-600 bg-green-50 border-green-200' }
  };

  const effortConfig = {
    low: { stars: 1, label: 'Low effort' },
    medium: { stars: 2, label: 'Medium effort' },
    high: { stars: 3, label: 'High effort' }
  };

  const impactConfig = {
    low: { stars: 1, label: 'Low impact' },
    medium: { stars: 2, label: 'Medium impact' },
    high: { stars: 3, label: 'High impact' }
  };

  const config = categoryConfig[category];
  const effortStars = effortConfig[effort];
  const impactStars = impactConfig[impact];

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Badge 
          variant="outline" 
          className={`${config.color} font-semibold`}
        >
          {config.icon} {config.label}
        </Badge>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
      </div>

      <h4 className="font-semibold text-lg mb-3 text-foreground">
        {title}
      </h4>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            WHY IT MATTERS:
          </p>
          <p className="text-sm leading-relaxed text-foreground/90">
            {rationale}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            HOW TO DO IT:
          </p>
          <ol className="space-y-1.5 text-sm">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-2">
                <span className="font-semibold text-muted-foreground shrink-0">
                  {index + 1}.
                </span>
                <span className="text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center gap-4 pt-2 border-t">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {effortStars.label}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {impactStars.label}
            </span>
            {impact === 'high' && <span className="text-amber-500">⭐⭐⭐</span>}
            {impact === 'medium' && <span className="text-amber-500">⭐⭐</span>}
            {impact === 'low' && <span className="text-amber-500">⭐</span>}
          </div>
        </div>
      </div>
    </Card>
  );
};
