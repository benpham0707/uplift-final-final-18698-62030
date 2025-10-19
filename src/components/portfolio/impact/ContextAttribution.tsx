import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, AlertCircle, DollarSign, User, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export interface ContextData {
  beneficiaries: {
    primary: string;
    demographics: string[];
    quotes?: string[];
  };
  counterfactual: {
    description: string;
    evidence: string;
  };
  resources: {
    funding: string[];
    partners: string[];
    volunteers: number;
    timeCommitment: string;
  };
  attribution: {
    yourRole: string;
    collaborators?: string[];
    clarity: string;
  };
}

interface ContextAttributionProps {
  context: ContextData;
}

export const ContextAttribution: React.FC<ContextAttributionProps> = ({ context }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    beneficiaries: true,
    counterfactual: false,
    resources: false,
    attribution: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Context & Attribution</h2>

      <div className="space-y-3">
        {/* Beneficiaries */}
        <Card className="border-primary/20">
          <CardContent className="p-0">
            <Collapsible open={openSections.beneficiaries} onOpenChange={() => toggleSection('beneficiaries')}>
              <CollapsibleTrigger className="w-full p-5 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Beneficiaries</h3>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform",
                    openSections.beneficiaries && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 space-y-3">
                <div className="text-base font-semibold text-foreground">
                  {context.beneficiaries.primary}
                </div>
                <ul className="space-y-1 pl-4">
                  {context.beneficiaries.demographics.map((demo, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground list-disc">
                      {demo}
                    </li>
                  ))}
                </ul>
                {context.beneficiaries.quotes && context.beneficiaries.quotes.length > 0 && (
                  <div className="space-y-2 pt-3 border-t">
                    {context.beneficiaries.quotes.map((quote, idx) => (
                      <div key={idx} className="p-3 bg-primary/5 rounded-md italic text-sm text-muted-foreground">
                        "{quote}"
                      </div>
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Counterfactual */}
        <Card className="border-primary/20">
          <CardContent className="p-0">
            <Collapsible open={openSections.counterfactual} onOpenChange={() => toggleSection('counterfactual')}>
              <CollapsibleTrigger className="w-full p-5 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Counterfactual</h3>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform",
                    openSections.counterfactual && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {context.counterfactual.description}
                </p>
                <div className="p-3 bg-primary/5 rounded-md">
                  <div className="text-xs font-semibold text-foreground mb-1">Evidence</div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    {context.counterfactual.evidence}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="border-primary/20">
          <CardContent className="p-0">
            <Collapsible open={openSections.resources} onOpenChange={() => toggleSection('resources')}>
              <CollapsibleTrigger className="w-full p-5 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Resources</h3>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform",
                    openSections.resources && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 space-y-3">
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-foreground">Funding</div>
                  <ul className="space-y-1 pl-4">
                    {context.resources.funding.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-foreground">Partners</div>
                  <ul className="space-y-1 pl-4">
                    {context.resources.partners.map((partner, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground list-disc">
                        {partner}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Volunteers</div>
                    <div className="text-2xl font-bold text-primary">{context.resources.volunteers}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Time Commitment</div>
                    <div className="text-2xl font-bold text-primary">{context.resources.timeCommitment}</div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Attribution */}
        <Card className="border-primary/20">
          <CardContent className="p-0">
            <Collapsible open={openSections.attribution} onOpenChange={() => toggleSection('attribution')}>
              <CollapsibleTrigger className="w-full p-5 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Your Role</h3>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform",
                    openSections.attribution && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 space-y-3">
                <div className="p-3 bg-primary/5 rounded-md">
                  <div className="text-sm font-semibold text-primary mb-2">Your Role</div>
                  <p className="text-sm text-foreground">
                    {context.attribution.yourRole}
                  </p>
                </div>
                {context.attribution.collaborators && context.attribution.collaborators.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-foreground">Collaborators</div>
                    <ul className="space-y-1 pl-4">
                      {context.attribution.collaborators.map((collab, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground list-disc">
                          {collab}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-3 border-t">
                  <div className="text-sm font-semibold text-foreground mb-2">Clarity of Contribution</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {context.attribution.clarity}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
