import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ImpactScoreHeroProps {
  score: number;
  assessment: string;
}

export const ImpactScoreHero: React.FC<ImpactScoreHeroProps> = ({ score, assessment }) => {
  const getScoreConfig = (score: number) => {
    if (score >= 9.0) {
      return {
        label: 'EXCELLENT IMPACT',
        gradient: 'from-amber-400 to-yellow-600',
        textColor: 'text-amber-900',
        bgColor: 'bg-amber-50/50',
        borderColor: 'border-amber-200'
      };
    } else if (score >= 7.5) {
      return {
        label: 'STRONG IMPACT',
        gradient: 'from-emerald-400 to-green-600',
        textColor: 'text-emerald-900',
        bgColor: 'bg-emerald-50/50',
        borderColor: 'border-emerald-200'
      };
    } else if (score >= 6.0) {
      return {
        label: 'DEVELOPING IMPACT',
        gradient: 'from-blue-400 to-indigo-600',
        textColor: 'text-blue-900',
        bgColor: 'bg-blue-50/50',
        borderColor: 'border-blue-200'
      };
    } else {
      return {
        label: 'EMERGING IMPACT',
        gradient: 'from-orange-400 to-red-500',
        textColor: 'text-orange-900',
        bgColor: 'bg-orange-50/50',
        borderColor: 'border-orange-200'
      };
    }
  };

  const config = getScoreConfig(score);

  return (
    <div className={`p-8 rounded-lg border-2 ${config.borderColor} ${config.bgColor}`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className={`relative w-32 h-32 flex-shrink-0 rounded-full bg-gradient-to-br ${config.gradient} p-1 shadow-lg`}>
          <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${config.textColor}`}>
              {score.toFixed(1)}
            </div>
            <div className={`text-sm font-medium ${config.textColor} opacity-70`}>
              / 10
            </div>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <Badge 
            variant="outline" 
            className={`mb-3 ${config.textColor} border-current`}
          >
            {config.label}
          </Badge>
          <p className="text-base leading-relaxed text-muted-foreground">
            {assessment}
          </p>
        </div>
      </div>
    </div>
  );
};
