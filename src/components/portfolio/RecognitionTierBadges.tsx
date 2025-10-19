import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Trophy, Medal, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RecognitionTier {
  tier: 'national' | 'state' | 'regional' | 'school';
  count: number;
  awards: Array<{
    name: string;
    date: string;
    issuer: string;
    link?: string;
  }>;
}

interface RecognitionTierBadgesProps {
  summary: string;
  tiers: RecognitionTier[];
}

const tierConfig = {
  national: {
    icon: Trophy,
    label: 'National',
    gradient: 'from-amber-500 to-yellow-400',
    textColor: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-gradient-to-br from-amber-500/10 to-yellow-400/10',
  },
  state: {
    icon: Award,
    label: 'State',
    gradient: 'from-blue-500 to-cyan-400',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-400/10',
  },
  regional: {
    icon: Medal,
    label: 'Regional',
    gradient: 'from-orange-500 to-amber-400',
    textColor: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-gradient-to-br from-orange-500/10 to-amber-400/10',
  },
  school: {
    icon: Star,
    label: 'School',
    gradient: 'from-green-500 to-emerald-400',
    textColor: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-gradient-to-br from-green-500/10 to-emerald-400/10',
  },
};

export const RecognitionTierBadges: React.FC<RecognitionTierBadgesProps> = ({
  summary,
  tiers,
}) => {
  return (
    <Card className="relative overflow-hidden shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-5">
          {/* Header */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              Recognition Mix
            </h2>
            <p className="text-base text-muted-foreground">{summary}</p>
          </div>

          {/* Tier Badges */}
          <TooltipProvider>
            <div className="flex flex-wrap gap-3">
              {tiers.map((tier) => {
                const config = tierConfig[tier.tier];
                const Icon = config.icon;

                return (
                  <Tooltip key={tier.tier}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          'flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all cursor-help hover:scale-105 hover:shadow-md',
                          config.bgColor,
                          'border-current/20'
                        )}
                      >
                        <Icon className={cn('w-5 h-5', config.textColor)} />
                        <div className="flex items-baseline gap-1.5">
                          <span className={cn('text-2xl font-bold', config.textColor)}>
                            {tier.count}
                          </span>
                          <span className={cn('text-sm font-medium', config.textColor)}>
                            {config.label}
                          </span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">{config.label} Awards:</p>
                        <ul className="space-y-1 text-xs">
                          {tier.awards.map((award, idx) => (
                            <li key={idx}>
                              <span className="font-medium">{award.name}</span>
                              <span className="text-muted-foreground"> • {award.date}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};
