import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Newspaper, Building, GitBranch, ChevronDown, ExternalLink } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export interface CredibilitySource {
  category: 'awards' | 'partners' | 'press' | 'institutional' | 'peer';
  items: Array<{
    name: string;
    selectivity?: string;
    date: string;
    link?: string;
  }>;
  weight: number;
}

interface CredibilityRollupProps {
  overallScore: number;
  breakdown: CredibilitySource[];
  explanation: string;
}

const categoryConfig = {
  awards: { icon: Award, label: 'Competitive Awards', color: 'text-amber-500' },
  partners: { icon: Users, label: 'Institutional Partners', color: 'text-blue-500' },
  press: { icon: Newspaper, label: 'Media Coverage', color: 'text-purple-500' },
  institutional: { icon: Building, label: 'Official Recognition', color: 'text-green-500' },
  peer: { icon: GitBranch, label: 'Peer Adoption', color: 'text-cyan-500' },
};

export const CredibilityRollup: React.FC<CredibilityRollupProps> = ({
  overallScore,
  breakdown,
  explanation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-400';
    if (score >= 60) return 'from-blue-500 to-cyan-400';
    if (score >= 40) return 'from-yellow-500 to-amber-400';
    return 'from-orange-500 to-red-400';
  };

  return (
    <Card className="border-primary/20 shadow-md">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-6">
          {/* Header with Score */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Score Badge */}
            <div className="relative flex-shrink-0">
              <div className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center",
                "bg-gradient-to-br shadow-lg",
                getScoreColor(overallScore)
              )}>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-white">
                    {overallScore}
                  </div>
                  <div className="text-xs text-white/90 font-semibold">
                    / 100
                  </div>
                </div>
              </div>
            </div>

            {/* Title and Summary */}
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
                Credibility Score
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Composite validation from competitive selection, institutional partnerships, 
                media coverage, official recognition, and peer adoption.
              </p>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {breakdown.map((source) => {
              const config = categoryConfig[source.category];
              const Icon = config.icon;
              return (
                <div key={source.category} className="text-center space-y-1">
                  <Icon className={cn("w-5 h-5 mx-auto", config.color)} />
                  <div className="text-xs font-semibold text-foreground">
                    {source.items.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {config.label.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expandable Breakdown */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="text-sm font-semibold text-foreground">
                  View Detailed Breakdown
                </span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  isOpen && "rotate-180"
                )} />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4 space-y-4">
              {/* Explanation */}
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {explanation}
                </p>
              </div>

              {/* Category Details */}
              {breakdown.map((source) => {
                const config = categoryConfig[source.category];
                const Icon = config.icon;
                return (
                  <div key={source.category} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("w-4 h-4", config.color)} />
                      <span className="text-sm font-semibold text-foreground">
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({source.weight}% weight)
                      </span>
                    </div>
                    <div className="pl-6 space-y-2">
                      {source.items.map((item, idx) => (
                        <div key={idx} className="text-sm space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-foreground">{item.name}</span>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0"
                              >
                                <ExternalLink className="w-3 h-3 text-primary hover:text-primary/80" />
                              </a>
                            )}
                          </div>
                          {item.selectivity && (
                            <div className="text-xs text-primary font-medium">
                              {item.selectivity}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {item.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};
