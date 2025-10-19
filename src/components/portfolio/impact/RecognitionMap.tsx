import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Newspaper, Building, GitBranch, ExternalLink, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface RecognitionItem {
  id: string;
  type: 'award' | 'partnership' | 'media' | 'institutional' | 'peer';
  tier?: 'national' | 'state' | 'regional' | 'local';
  name: string;
  issuer: string;
  selectivity?: {
    accepted: number;
    applicants: number;
    description: string;
  };
  date: string;
  significance: string;
  link?: string;
}

interface RecognitionMapProps {
  recognitions: RecognitionItem[];
}

const typeConfig = {
  award: { icon: Award, label: 'Awards', color: 'text-amber-500' },
  partnership: { icon: Users, label: 'Partnerships', color: 'text-blue-500' },
  media: { icon: Newspaper, label: 'Media', color: 'text-purple-500' },
  institutional: { icon: Building, label: 'Institutional', color: 'text-green-500' },
  peer: { icon: GitBranch, label: 'Peer', color: 'text-cyan-500' },
};

const tierConfig = {
  national: { label: 'National', gradient: 'from-amber-500 to-yellow-400', bgColor: 'bg-amber-500/10' },
  state: { label: 'State', gradient: 'from-blue-500 to-cyan-400', bgColor: 'bg-blue-500/10' },
  regional: { label: 'Regional', gradient: 'from-orange-500 to-amber-400', bgColor: 'bg-orange-500/10' },
  local: { label: 'Local', gradient: 'from-green-500 to-emerald-400', bgColor: 'bg-green-500/10' },
};

export const RecognitionMap: React.FC<RecognitionMapProps> = ({ recognitions }) => {
  const [groupBy, setGroupBy] = useState<'tier' | 'type'>('tier');

  const groupedByTier = () => {
    const groups: Record<string, RecognitionItem[]> = {
      national: [],
      state: [],
      regional: [],
      local: [],
    };
    recognitions.forEach((item) => {
      if (item.tier) {
        groups[item.tier].push(item);
      }
    });
    return groups;
  };

  const groupedByType = () => {
    const groups: Record<string, RecognitionItem[]> = {
      award: [],
      partnership: [],
      media: [],
      institutional: [],
      peer: [],
    };
    recognitions.forEach((item) => {
      groups[item.type].push(item);
    });
    return groups;
  };

  const renderRecognitionItem = (item: RecognitionItem) => {
    const config = typeConfig[item.type];
    const Icon = config.icon;
    const tierStyle = item.tier ? tierConfig[item.tier] : null;

    return (
      <Card key={item.id} className="border-primary/20 hover:border-primary/40 transition-colors">
        <CardContent className="p-5 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1">
              <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.color)} />
              <div className="flex-1 space-y-1">
                <h3 className="text-base font-bold text-foreground leading-tight">
                  {item.name}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {item.issuer}
                </div>
              </div>
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4 text-primary hover:text-primary/80" />
              </a>
            )}
          </div>

          {/* Tier Badge */}
          {tierStyle && (
            <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold", tierStyle.bgColor)}>
              <div className={cn("w-2 h-2 rounded-full bg-gradient-to-r", tierStyle.gradient)} />
              {tierStyle.label}
            </div>
          )}

          {/* Selectivity */}
          {item.selectivity && (
            <div className="p-3 bg-primary/5 rounded-md">
              <div className="text-sm font-bold text-primary">
                {item.selectivity.description}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.selectivity.accepted} selected from {item.selectivity.applicants} applicants
              </div>
            </div>
          )}

          {/* Significance */}
          <div className="text-sm text-muted-foreground leading-relaxed">
            {item.significance}
          </div>

          {/* Date */}
          <div className="text-xs text-muted-foreground pt-2 border-t">
            {item.date}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-foreground">Recognition Map</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  Validation sources include competitive awards, institutional partnerships, 
                  media coverage, official recognition, and peer adoption.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs value={groupBy} onValueChange={(v) => setGroupBy(v as 'tier' | 'type')} className="w-auto">
          <TabsList>
            <TabsTrigger value="tier">By Tier</TabsTrigger>
            <TabsTrigger value="type">By Type</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {groupBy === 'tier' ? (
        <div className="space-y-6">
          {Object.entries(groupedByTier()).map(([tier, items]) => {
            if (items.length === 0) return null;
            const tierStyle = tierConfig[tier as keyof typeof tierConfig];
            return (
              <div key={tier} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r", tierStyle.gradient)} />
                  <h3 className="text-lg font-bold text-foreground">
                    {tierStyle.label} ({items.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map(renderRecognitionItem)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByType()).map(([type, items]) => {
            if (items.length === 0) return null;
            const config = typeConfig[type as keyof typeof typeConfig];
            const Icon = config.icon;
            return (
              <div key={type} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className={cn("w-5 h-5", config.color)} />
                  <h3 className="text-lg font-bold text-foreground">
                    {config.label} ({items.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map(renderRecognitionItem)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
