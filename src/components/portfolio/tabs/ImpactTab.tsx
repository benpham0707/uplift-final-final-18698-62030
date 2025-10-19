import React from 'react';
import { ImpactHeroSection } from '@/components/portfolio/ImpactHeroSection';
import { RecognitionTierBadges } from '@/components/portfolio/RecognitionTierBadges';
import { ProofChipsRow } from '@/components/portfolio/ProofChipsRow';
import { ImpactTimeline } from '@/components/portfolio/ImpactTimeline';
import { AwardTierLegend } from '@/components/portfolio/AwardTierLegend';
import { ImpactData, RecognitionData } from '@/components/portfolio/portfolioInsightsData';

interface ImpactTabProps {
  impactData: ImpactData;
  recognitionData: RecognitionData;
}

export const ImpactTab: React.FC<ImpactTabProps> = ({
  impactData,
  recognitionData,
}) => {
  return (
    <div className="space-y-6">
      {/* Above the Fold Section */}
      <div className="space-y-6">
        {/* Hero Impact Section */}
        <ImpactHeroSection
          primaryMetric={impactData.primaryMetric}
          secondaryMetrics={impactData.secondaryMetrics}
          description={impactData.description}
        />

        {/* Recognition Mix Summary */}
        <RecognitionTierBadges
          summary={recognitionData.summary}
          tiers={recognitionData.tiers}
        />

        {/* Proof Chips Row */}
        <ProofChipsRow proofLinks={impactData.proofLinks} />
      </div>

      {/* Detail Panel (Drilldown) */}
      <div className="space-y-6 pt-4">
        {/* Award Tier Legend */}
        <AwardTierLegend tiers={recognitionData.tierDefinitions} />

        {/* Impact Timeline */}
        <ImpactTimeline outcomes={impactData.timeline} />
      </div>
    </div>
  );
};
