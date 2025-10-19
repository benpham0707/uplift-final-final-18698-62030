import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Users, Calendar, Target, DollarSign, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Initiative {
  id: string;
  name: string;
  beneficiary: {
    who: string;
    demographics?: string;
  };
  timeSpan: {
    start: string;
    end?: string;
    duration: string;
  };
  outcome: {
    primary: string;
    secondary?: string[];
    evidence: string[];
  };
  resources: {
    funding?: string;
    partners: string[];
    volunteers?: number;
  };
  durability: {
    status: 'ongoing' | 'handed-off' | 'completed';
    successor?: string;
  };
}

interface ImpactLedgerProps {
  initiatives: Initiative[];
}

const statusConfig = {
  'ongoing': { label: 'Ongoing', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  'handed-off': { label: 'Handed Off', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  'completed': { label: 'Completed', color: 'bg-muted text-muted-foreground border-border' },
};

export const ImpactLedger: React.FC<ImpactLedgerProps> = ({ initiatives }) => {
  const [openInitiatives, setOpenInitiatives] = useState<Record<string, boolean>>({});

  const toggleInitiative = (id: string) => {
    setOpenInitiatives(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Impact Ledger</h2>
        <div className="text-sm text-muted-foreground">
          {initiatives.length} {initiatives.length === 1 ? 'initiative' : 'initiatives'}
        </div>
      </div>

      <div className="space-y-3">
        {initiatives.map((initiative) => {
          const isOpen = openInitiatives[initiative.id];
          const statusStyle = statusConfig[initiative.durability.status];

          return (
            <Card key={initiative.id} className="border-primary/20">
              <CardContent className="p-0">
                <Collapsible open={isOpen} onOpenChange={() => toggleInitiative(initiative.id)}>
                  {/* Collapsed View */}
                  <CollapsibleTrigger className="w-full">
                    <div className="p-5 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 text-left space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-foreground">
                              {initiative.name}
                            </h3>
                            <Badge className={cn("text-xs", statusStyle.color)}>
                              {statusStyle.label}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Users className="w-4 h-4" />
                              <span>{initiative.beneficiary.who}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <span>{initiative.timeSpan.duration}</span>
                            </div>
                          </div>
                          <div className="text-sm text-foreground font-medium">
                            {initiative.outcome.primary}
                          </div>
                        </div>
                        <ChevronDown className={cn(
                          "w-5 h-5 flex-shrink-0 transition-transform",
                          isOpen && "rotate-180"
                        )} />
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  {/* Expanded View */}
                  <CollapsibleContent>
                    <div className="px-5 pb-5 space-y-5 border-t pt-5">
                      {/* Beneficiary Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Users className="w-4 h-4" />
                          Beneficiaries
                        </div>
                        <div className="pl-6 space-y-1">
                          <div className="text-sm text-foreground">{initiative.beneficiary.who}</div>
                          {initiative.beneficiary.demographics && (
                            <div className="text-sm text-muted-foreground">
                              {initiative.beneficiary.demographics}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Calendar className="w-4 h-4" />
                          Timeline
                        </div>
                        <div className="pl-6 flex items-center gap-2 text-sm">
                          <span className="text-foreground">{initiative.timeSpan.start}</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="text-foreground">
                            {initiative.timeSpan.end || 'Present'}
                          </span>
                          <span className="text-muted-foreground">
                            ({initiative.timeSpan.duration})
                          </span>
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Target className="w-4 h-4" />
                          Outcomes
                        </div>
                        <div className="pl-6 space-y-2">
                          <div className="text-sm text-foreground font-medium">
                            {initiative.outcome.primary}
                          </div>
                          {initiative.outcome.secondary && initiative.outcome.secondary.length > 0 && (
                            <ul className="space-y-1">
                              {initiative.outcome.secondary.map((outcome, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-green-500" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {initiative.outcome.evidence.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {initiative.outcome.evidence.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link}
                                  className="text-xs text-primary hover:underline"
                                  target={link.startsWith('http') ? '_blank' : '_self'}
                                  rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                  Evidence {idx + 1} →
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Resources */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <DollarSign className="w-4 h-4" />
                          Resources
                        </div>
                        <div className="pl-6 space-y-1 text-sm text-muted-foreground">
                          {initiative.resources.funding && (
                            <div>Funding: {initiative.resources.funding}</div>
                          )}
                          <div>Partners: {initiative.resources.partners.join(', ')}</div>
                          {initiative.resources.volunteers && (
                            <div>Volunteers: {initiative.resources.volunteers}</div>
                          )}
                        </div>
                      </div>

                      {/* Durability */}
                      {initiative.durability.successor && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Clock className="w-4 h-4" />
                            Sustainability
                          </div>
                          <div className="pl-6 text-sm text-muted-foreground">
                            {initiative.durability.successor}
                          </div>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
