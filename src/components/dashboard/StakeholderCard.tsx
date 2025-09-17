import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Users, Heart, Lightbulb, Shield, Network } from 'lucide-react';

interface StakeholderGroup {
  type: 'beneficiaries' | 'mentors' | 'partners' | 'challengers';
  title: string;
  members: string[];
  relationship: string;
  impact: string;
  keyInsight: string;
}

interface StakeholderCardProps {
  stakeholderGroups: StakeholderGroup[];
  conflictResolution?: {
    situation: string;
    approach: string;
    outcome: string;
  };
  className?: string;
}

const getStakeholderIcon = (type: StakeholderGroup['type']) => {
  switch (type) {
    case 'beneficiaries': return <Heart className="h-4 w-4" />;
    case 'mentors': return <Lightbulb className="h-4 w-4" />;
    case 'partners': return <Users className="h-4 w-4" />;
    case 'challengers': return <Shield className="h-4 w-4" />;
    default: return <Network className="h-4 w-4" />;
  }
};

const getStakeholderColor = (type: StakeholderGroup['type']) => {
  switch (type) {
    case 'beneficiaries': return 'text-green-600 bg-green-50 border-green-200';
    case 'mentors': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'partners': return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'challengers': return 'text-orange-600 bg-orange-50 border-orange-200';
    default: return 'text-muted-foreground bg-muted border-border';
  }
};

export const StakeholderCard: React.FC<StakeholderCardProps> = ({
  stakeholderGroups,
  conflictResolution,
  className
}) => {
  return (
    <Card className={cn(
      'overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-accent/5 border-secondary/20',
      className
    )}>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <Network className="h-5 w-5 text-secondary" />
            Stakeholder Ecosystem Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Mapping relationships, influence patterns, and collaborative dynamics
          </p>
        </div>

        {/* Stakeholder Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {stakeholderGroups.map((group, index) => (
            <div key={index} className={cn(
              'p-4 rounded-lg border',
              getStakeholderColor(group.type)
            )}>
              <div className="flex items-center gap-2 mb-3">
                {getStakeholderIcon(group.type)}
                <h4 className="font-semibold">{group.title}</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium opacity-80 mb-1">Key Members:</p>
                  <div className="flex flex-wrap gap-1">
                    {group.members.map((member, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium opacity-80 mb-1">Relationship:</p>
                  <p className="text-xs leading-relaxed">{group.relationship}</p>
                </div>
                
                <div>
                  <p className="text-xs font-medium opacity-80 mb-1">Impact:</p>
                  <p className="text-xs leading-relaxed">{group.impact}</p>
                </div>
                
                <div className="bg-white/30 rounded-md p-2 border-l-2 border-current">
                  <p className="text-xs">
                    <strong>Key Insight:</strong> {group.keyInsight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conflict Resolution Showcase */}
        {conflictResolution && (
          <div className="p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg border border-secondary/20">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-secondary" />
              Conflict Resolution Case Study
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">SITUATION</p>
                <p className="text-sm leading-relaxed">{conflictResolution.situation}</p>
              </div>
              
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">APPROACH</p>
                <p className="text-sm leading-relaxed">{conflictResolution.approach}</p>
              </div>
              
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">OUTCOME</p>
                <p className="text-sm leading-relaxed">{conflictResolution.outcome}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};