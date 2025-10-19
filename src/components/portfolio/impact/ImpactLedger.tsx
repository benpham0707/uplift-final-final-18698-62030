import React, { useState } from 'react';
import { InitiativeCard } from './InitiativeCard';
import { InitiativeModal } from './InitiativeModal';

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
  
  // Initiative-specific analysis for deep reflection
  impactScore?: {
    overall: number; // 0-10
    assessment: string;
    dimensions: Array<{
      id: string;
      name: string;
      score: number; // 0-10
      status: 'strong' | 'developing' | 'opportunity';
      assessment: string;
      evidence: string;
    }>;
  };
  
  // Sophisticated reframing
  reframing?: {
    whatYouActuallyBuilt: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  // Leadership & strategic thinking
  leadershipSkills?: Array<{
    skill: string;
    description: string;
  }>;
  
  // Lessons learned
  lessonsLearned?: Array<{
    lesson: string;
    description: string;
  }>;
  
  // Impressive angles
  impressiveAngles?: Array<{
    lens: string;
    description: string;
  }>;
  
  // Retrospective wisdom
  retrospective?: {
    whatToKeep: string[];
    whatToAdd: string[];
    whatToDoDifferently: string[];
  };
  
  // Growth opportunities
  growthOpportunities?: Array<{
    id: string;
    category: 'scale' | 'evidence' | 'recognition' | 'depth' | 'systems' | 'sustainability';
    title: string;
    rationale: string;
    steps: string[];
    effort: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
  }>;
}

interface ImpactLedgerProps {
  initiatives: Initiative[];
}

export const ImpactLedger: React.FC<ImpactLedgerProps> = ({ initiatives }) => {
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initiatives.map((initiative) => (
          <InitiativeCard
            key={initiative.id}
            initiative={initiative}
            onOpenModal={setSelectedInitiative}
          />
        ))}
      </div>

      <InitiativeModal
        initiative={selectedInitiative}
        isOpen={!!selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
      />
    </>
  );
};