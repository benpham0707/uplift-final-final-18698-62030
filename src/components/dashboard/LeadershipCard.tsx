import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Crown, Users, Target, Lightbulb, ArrowUpRight } from 'lucide-react';

interface LeadershipEvolution {
  phase: string;
  timeframe: string;
  leadershipStyle: string;
  situationHandled: string;
  keyDecision: string;
  outcome: string;
  skillsDeveloped: string[];
}

interface TeamFormationStory {
  challenge: string;
  teamBuilding: string;
  conflictResolution: string;
  results: string;
  teamGrowth: string[];
}

interface LeadershipCardProps {
  evolution: LeadershipEvolution[];
  teamFormation: TeamFormationStory;
  decisionFramework: {
    principle: string;
    application: string;
    example: string;
  }[];
  impactMetrics: {
    teamsLed: number;
    peopleInfluenced: number;
    initiativesLaunched: number;
    conflictsResolved: number;
  };
  className?: string;
}

export const LeadershipCard: React.FC<LeadershipCardProps> = ({
  evolution,
  teamFormation,
  decisionFramework,
  impactMetrics,
  className
}) => {
  return (
    <Card className={cn(
      'overflow-hidden bg-gradient-to-br from-background via-yellow/5 to-orange/5 border-yellow/20',
      className
    )}>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            Leadership Evolution Journey
          </h3>
          <p className="text-sm text-muted-foreground">
            Strategic leadership development with situational adaptation and team impact
          </p>
        </div>

        {/* Leadership Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700">{impactMetrics.teamsLed}</div>
            <div className="text-xs text-yellow-600">Teams Led</div>
          </div>
          <div className="text-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">{impactMetrics.peopleInfluenced}</div>
            <div className="text-xs text-orange-600">People Influenced</div>
          </div>
          <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{impactMetrics.initiativesLaunched}</div>
            <div className="text-xs text-green-600">Initiatives Launched</div>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{impactMetrics.conflictsResolved}</div>
            <div className="text-xs text-blue-600">Conflicts Resolved</div>
          </div>
        </div>

        {/* Leadership Evolution Timeline */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-green-600" />
            Leadership Style Evolution
          </h4>
          
          <div className="relative">
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-yellow-400 via-orange-400 to-red-400" />
            
            <div className="space-y-6">
              {evolution.map((phase, index) => (
                <div key={index} className="relative flex gap-6">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-300 relative z-10 mt-2" />
                  
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-yellow-800">{phase.phase}</h5>
                        <Badge variant="outline" className="border-yellow-300 text-yellow-700 text-xs">
                          {phase.timeframe}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs font-medium text-yellow-600 mb-1">Leadership Style:</p>
                          <p className="text-sm text-yellow-700">{phase.leadershipStyle}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-yellow-600 mb-1">Situation Handled:</p>
                          <p className="text-sm text-yellow-700">{phase.situationHandled}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs font-medium text-yellow-600 mb-1">Key Decision:</p>
                        <p className="text-sm text-yellow-700 italic">"{phase.keyDecision}"</p>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs font-medium text-yellow-600 mb-1">Outcome:</p>
                        <p className="text-sm text-yellow-700">{phase.outcome}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-yellow-600 mb-1">Skills Developed:</p>
                        <div className="flex flex-wrap gap-1">
                          {phase.skillsDeveloped.map((skill, i) => (
                            <Badge key={i} variant="outline" className="border-yellow-300 text-yellow-700 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Formation Case Study */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            Team Formation & Conflict Resolution
          </h4>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">CHALLENGE</p>
                <p className="text-sm text-blue-700 leading-relaxed">{teamFormation.challenge}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">TEAM BUILDING</p>
                <p className="text-sm text-blue-700 leading-relaxed">{teamFormation.teamBuilding}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">CONFLICT RESOLUTION</p>
                <p className="text-sm text-blue-700 leading-relaxed">{teamFormation.conflictResolution}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">RESULTS</p>
                <p className="text-sm text-blue-700 leading-relaxed">{teamFormation.results}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-blue-600 mb-2">Team Growth Indicators:</p>
              <div className="flex flex-wrap gap-2">
                {teamFormation.teamGrowth.map((growth, i) => (
                  <Badge key={i} variant="outline" className="border-blue-300 text-blue-700 text-xs">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    {growth}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decision-Making Framework */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Decision-Making Framework
          </h4>
          
          <div className="space-y-3">
            {decisionFramework.map((framework, index) => (
              <div key={index} className="p-3 bg-white/50 rounded-lg border border-purple-100">
                <h5 className="font-medium text-purple-700 mb-2">{framework.principle}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium text-purple-600 mb-1">Application:</p>
                    <p className="text-sm text-purple-700">{framework.application}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-purple-600 mb-1">Example:</p>
                    <p className="text-sm text-purple-700 italic">"{framework.example}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};