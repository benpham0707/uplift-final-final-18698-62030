import React from 'react';
import { KPIDashboard, KPI } from '@/components/portfolio/impact/KPIDashboard';
import { CredibilityRollup } from '@/components/portfolio/impact/CredibilityRollup';
import { ImpactFramePicker } from '@/components/portfolio/impact/ImpactFramePicker';
import { ProofStrip } from '@/components/portfolio/impact/ProofStrip';
import { ImpactLedger } from '@/components/portfolio/impact/ImpactLedger';
import { RecognitionMap } from '@/components/portfolio/impact/RecognitionMap';
import { TrajectoryView } from '@/components/portfolio/impact/TrajectoryView';
import { DurabilityReplication } from '@/components/portfolio/impact/DurabilityReplication';
import { ContextAttribution } from '@/components/portfolio/impact/ContextAttribution';
import { OverarchingInsight } from '@/components/portfolio/portfolioInsightsData';

interface ImpactTabProps {
  overarchingInsight: OverarchingInsight;
}

export const ImpactTab: React.FC<ImpactTabProps> = ({ overarchingInsight }) => {
  const insight = overarchingInsight as any; // Access extended data

  return (
    <div className="space-y-8">
      {/* Above the Fold - Quick Orientation (5 seconds) */}
      <div className="space-y-6">
        <KPIDashboard kpis={insight.kpis || []} />
        <CredibilityRollup 
          overallScore={insight.credibilityRollup?.overallScore || 0}
          breakdown={insight.credibilityRollup?.breakdown || []}
          explanation={insight.credibilityRollup?.explanation || ''}
        />
        <ImpactFramePicker frames={insight.impactFrames || []} />
        <ProofStrip artifacts={insight.artifacts || []} />
      </div>

      {/* Below the Fold - Deep Dive (2 minutes) */}
      <div className="space-y-8 pt-8 border-t-2">
        <ImpactLedger initiatives={insight.initiatives || []} />
        <RecognitionMap recognitions={insight.recognitions || []} />
        <TrajectoryView points={insight.trajectory || []} />
        <DurabilityReplication evidence={insight.durabilityEvidence || []} />
        <ContextAttribution context={insight.contextData || {}} />
      </div>
    </div>
  );
};
