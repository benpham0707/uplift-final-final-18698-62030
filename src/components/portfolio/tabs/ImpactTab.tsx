import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ImpactSnapshot } from '@/components/portfolio/impact/ImpactSnapshot';
import { KPIDashboard } from '@/components/portfolio/impact/KPIDashboard';
import { ImpactFramePicker } from '@/components/portfolio/impact/ImpactFramePicker';
import { ProofStrip } from '@/components/portfolio/impact/ProofStrip';
import { ImpactLedger } from '@/components/portfolio/impact/ImpactLedger';
import { ImpactQualityCheck } from '@/components/portfolio/impact/ImpactQualityCheck';
import { StorytellingGuidance } from '@/components/portfolio/impact/StorytellingGuidance';
import { InsightSection } from '@/components/portfolio/InsightSection';
import { OverarchingInsight } from '@/components/portfolio/portfolioInsightsData';

interface ImpactTabProps {
  overarchingInsight: OverarchingInsight;
}

export const ImpactTab: React.FC<ImpactTabProps> = ({ overarchingInsight }) => {
  const insight = overarchingInsight as any;
  const [expandAllSections, setExpandAllSections] = useState(false);

  // HARD-CODED DATA: These section states would be driven by user preferences in production
  const [sectionStates, setSectionStates] = useState({
    kpis: false,
    initiatives: false,
    quality: false,
    guidance: false,
  });

  const toggleAllSections = () => {
    const newState = !expandAllSections;
    setExpandAllSections(newState);
    setSectionStates({
      kpis: newState,
      initiatives: newState,
      quality: newState,
      guidance: newState,
    });
  };

  return (
    <div className="space-y-8">
      {/* Section 1: Impact Snapshot - Always Visible */}
      {insight.snapshotSummary && insight.snapshotMetrics && (
        <ImpactSnapshot 
          summary={insight.snapshotSummary}
          metrics={insight.snapshotMetrics}
        />
      )}

      {/* Section 2: Frame Your Story - Interactive Frame Picker */}
      {insight.impactFrames && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Frame Your Story
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose different lenses to view and present your impact. Each frame emphasizes different aspects of your work.
            </p>
          </div>
          <ImpactFramePicker frames={insight.impactFrames} />
        </div>
      )}

      {/* Expand/Collapse All Control */}
      {(insight.kpis || insight.initiatives || insight.impactQuality || insight.storytellingGuidance) && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAllSections}
            className="gap-2"
          >
            {expandAllSections ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Expand All
              </>
            )}
          </Button>
        </div>
      )}

      {/* Section 3: Key Outcomes - Expandable */}
      {insight.kpis && (
        <InsightSection
          title="Key Outcomes"
          count={insight.kpis.length}
          defaultExpanded={sectionStates.kpis}
          variant="high"
        >
          <KPIDashboard kpis={insight.kpis} />
        </InsightSection>
      )}

      {/* Section 4: Initiative Breakdown - Expandable Accordion */}
      {insight.initiatives && (
        <InsightSection
          title="Initiative Breakdown"
          count={insight.initiatives.length}
          defaultExpanded={sectionStates.initiatives}
          variant="high"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Detailed view of each initiative showing beneficiaries, outcomes, resources, and sustainability. Click any initiative to expand full details.
            </p>
            <ImpactLedger initiatives={insight.initiatives} />
          </div>
        </InsightSection>
      )}

      {/* Section 5: Evidence Locker - Horizontal Scroll */}
      {insight.artifacts && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Evidence Locker
            </h2>
            <p className="text-sm text-muted-foreground">
              Supporting documentation, testimonials, media coverage, and data artifacts that validate your impact.
            </p>
          </div>
          <ProofStrip artifacts={insight.artifacts} />
        </div>
      )}

      {/* Section 6: Impact Quality Check - Expandable Assessment */}
      {insight.impactQuality && (
        <InsightSection
          title="Impact Quality Assessment"
          count={insight.impactQuality.dimensions.length}
          defaultExpanded={sectionStates.quality}
          variant="medium"
        >
          <ImpactQualityCheck 
            dimensions={insight.impactQuality.dimensions}
            overallAssessment={insight.impactQuality.overallAssessment}
          />
        </InsightSection>
      )}

      {/* Section 7: Storytelling Guidance - Expandable Tips */}
      {insight.storytellingGuidance && (
        <InsightSection
          title="Strategic Storytelling Guidance"
          count={insight.storytellingGuidance.length}
          defaultExpanded={sectionStates.guidance}
          variant="medium"
        >
          <StorytellingGuidance insights={insight.storytellingGuidance} />
        </InsightSection>
      )}
    </div>
  );
};
