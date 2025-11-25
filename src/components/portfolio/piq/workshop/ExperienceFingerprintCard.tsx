/**
 * Experience Fingerprint Card
 *
 * Anti-Convergence System - Shows what makes this essay irreplaceable
 * Displays:
 * - Uniqueness dimensions (6 types)
 * - Anti-pattern warnings
 * - Divergence requirements
 * - Quality anchors to preserve
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Fingerprint, Star, AlertTriangle, CheckCircle, ChevronDown, ChevronUp,
  Sparkles, Heart, Lightbulb, Eye, Users, Globe
} from 'lucide-react';
import type { ExperienceFingerprintData } from '@/components/portfolio/extracurricular/workshop/backendTypes';

interface ExperienceFingerprintCardProps {
  experienceFingerprint: ExperienceFingerprintData;
}

export const ExperienceFingerprintCard: React.FC<ExperienceFingerprintCardProps> = ({
  experienceFingerprint,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('uniqueness');

  // Count how many uniqueness dimensions are present
  const uniquenessDimensions = [
    experienceFingerprint.unusualCircumstance,
    experienceFingerprint.unexpectedEmotion,
    experienceFingerprint.contraryInsight,
    experienceFingerprint.specificSensoryAnchor,
    experienceFingerprint.uniqueRelationship,
    experienceFingerprint.culturalSpecificity,
  ].filter(Boolean).length;

  // Count anti-pattern flags
  const antiPatternCount = [
    experienceFingerprint.antiPatternFlags?.followsTypicalArc,
    experienceFingerprint.antiPatternFlags?.hasGenericInsight,
    experienceFingerprint.antiPatternFlags?.hasManufacturedBeat,
    experienceFingerprint.antiPatternFlags?.hasCrowdPleaser,
  ].filter(Boolean).length;

  const hasAntiPatterns = antiPatternCount > 0;

  return (
    <Card className={`p-6 ${
      hasAntiPatterns
        ? 'bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-300 dark:border-orange-800'
        : 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-300 dark:border-emerald-800'
    }`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              hasAntiPatterns
                ? 'bg-orange-100 dark:bg-orange-900/30'
                : 'bg-emerald-100 dark:bg-emerald-900/30'
            }`}>
              <Fingerprint className={`w-5 h-5 ${
                hasAntiPatterns
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Experience Fingerprint</h3>
              <p className="text-sm text-muted-foreground">Anti-Convergence Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={hasAntiPatterns ? "destructive" : "default"} className="gap-1">
              {hasAntiPatterns ? (
                <AlertTriangle className="w-3 h-3" />
              ) : (
                <CheckCircle className="w-3 h-3" />
              )}
              {uniquenessDimensions}/6 Unique
            </Badge>
            <Badge variant="outline">
              Confidence: {experienceFingerprint.confidenceScore}/10
            </Badge>
          </div>
        </div>

        {/* Anti-Pattern Warnings (if any) */}
        {hasAntiPatterns && (
          <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-700">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                  ⚠️ Convergence Risks Detected
                </h4>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Your essay may be following common patterns. Stand out by addressing these:
                </p>
                <ul className="text-sm space-y-1">
                  {experienceFingerprint.antiPatternFlags?.followsTypicalArc && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                      Follows typical narrative arc (be more unconventional)
                    </li>
                  )}
                  {experienceFingerprint.antiPatternFlags?.hasGenericInsight && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                      Has generic insights (make them more specific to you)
                    </li>
                  )}
                  {experienceFingerprint.antiPatternFlags?.hasManufacturedBeat && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                      Contains manufactured moments (focus on real experiences)
                    </li>
                  )}
                  {experienceFingerprint.antiPatternFlags?.hasCrowdPleaser && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                      Includes crowd-pleaser elements (be more authentic)
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Uniqueness Dimensions */}
        <div className="space-y-2">
          <button
            onClick={() => setExpandedSection(expandedSection === 'uniqueness' ? null : 'uniqueness')}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Uniqueness Dimensions ({uniquenessDimensions}/6)</span>
            </div>
            {expandedSection === 'uniqueness' ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {expandedSection === 'uniqueness' && (
            <div className="space-y-3 pl-6 pr-3 pb-2">
              {/* Unusual Circumstance */}
              {experienceFingerprint.unusualCircumstance && (
                <UniqueDimensionCard
                  icon={<Star className="w-4 h-4 text-yellow-600" />}
                  title="Unusual Circumstance"
                  description={experienceFingerprint.unusualCircumstance.description}
                  detail={experienceFingerprint.unusualCircumstance.specificDetail}
                  whyItMatters={experienceFingerprint.unusualCircumstance.whyItMatters}
                />
              )}

              {/* Unexpected Emotion */}
              {experienceFingerprint.unexpectedEmotion && (
                <UniqueDimensionCard
                  icon={<Heart className="w-4 h-4 text-red-600" />}
                  title="Unexpected Emotion"
                  description={`${experienceFingerprint.unexpectedEmotion.emotion} when ${experienceFingerprint.unexpectedEmotion.trigger}`}
                  detail={`Counters expectation: ${experienceFingerprint.unexpectedEmotion.counterExpectation}`}
                />
              )}

              {/* Contrary Insight */}
              {experienceFingerprint.contraryInsight && (
                <UniqueDimensionCard
                  icon={<Lightbulb className="w-4 h-4 text-amber-600" />}
                  title="Contrary Insight"
                  description={experienceFingerprint.contraryInsight.insight}
                  detail={`Against: ${experienceFingerprint.contraryInsight.againstWhat}`}
                  whyItMatters={experienceFingerprint.contraryInsight.whyAuthentic}
                />
              )}

              {/* Specific Sensory Anchor */}
              {experienceFingerprint.specificSensoryAnchor && (
                <UniqueDimensionCard
                  icon={<Eye className="w-4 h-4 text-purple-600" />}
                  title="Sensory Anchor"
                  description={experienceFingerprint.specificSensoryAnchor.sensory}
                  detail={`Context: ${experienceFingerprint.specificSensoryAnchor.context}`}
                  whyItMatters={experienceFingerprint.specificSensoryAnchor.emotionalWeight}
                />
              )}

              {/* Unique Relationship */}
              {experienceFingerprint.uniqueRelationship && (
                <UniqueDimensionCard
                  icon={<Users className="w-4 h-4 text-blue-600" />}
                  title="Unique Relationship"
                  description={`${experienceFingerprint.uniqueRelationship.person} - ${experienceFingerprint.uniqueRelationship.dynamic}`}
                  detail={`Unexpected: ${experienceFingerprint.uniqueRelationship.unexpectedAspect}`}
                />
              )}

              {/* Cultural Specificity */}
              {experienceFingerprint.culturalSpecificity && (
                <UniqueDimensionCard
                  icon={<Globe className="w-4 h-4 text-teal-600" />}
                  title="Cultural Specificity"
                  description={experienceFingerprint.culturalSpecificity.element}
                  detail={`Connection: ${experienceFingerprint.culturalSpecificity.connection}`}
                  whyItMatters={experienceFingerprint.culturalSpecificity.universalBridge}
                />
              )}

              {uniquenessDimensions === 0 && (
                <div className="text-sm text-muted-foreground italic p-3 bg-slate-100 dark:bg-slate-900 rounded-lg">
                  No unique dimensions detected. Consider adding specific details that make your experience irreplaceable.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divergence Requirements */}
        {experienceFingerprint.divergenceRequirements && (
          <div className="space-y-2">
            <button
              onClick={() => setExpandedSection(expandedSection === 'divergence' ? null : 'divergence')}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Divergence Requirements</span>
              </div>
              {expandedSection === 'divergence' ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedSection === 'divergence' && (
              <div className="space-y-3 pl-6 pr-3 pb-2">
                <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-4 space-y-3">
                  {/* Must Include */}
                  {experienceFingerprint.divergenceRequirements.mustInclude && experienceFingerprint.divergenceRequirements.mustInclude.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                        ✅ Must Include:
                      </h5>
                      <ul className="text-sm space-y-1">
                        {experienceFingerprint.divergenceRequirements.mustInclude.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Must Avoid */}
                  {experienceFingerprint.divergenceRequirements.mustAvoid && experienceFingerprint.divergenceRequirements.mustAvoid.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                        ❌ Must Avoid:
                      </h5>
                      <ul className="text-sm space-y-1">
                        {experienceFingerprint.divergenceRequirements.mustAvoid.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Unique Angle */}
                  {experienceFingerprint.divergenceRequirements.uniqueAngle && (
                    <div>
                      <h5 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                        Your Unique Angle:
                      </h5>
                      <p className="text-sm bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                        {experienceFingerprint.divergenceRequirements.uniqueAngle}
                      </p>
                    </div>
                  )}

                  {/* Authentic Tension */}
                  {experienceFingerprint.divergenceRequirements.authenticTension && (
                    <div>
                      <h5 className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-1">
                        Authentic Tension:
                      </h5>
                      <p className="text-sm bg-purple-50 dark:bg-purple-950/30 p-2 rounded">
                        {experienceFingerprint.divergenceRequirements.authenticTension}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quality Anchors */}
        {experienceFingerprint.qualityAnchors && experienceFingerprint.qualityAnchors.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={() => setExpandedSection(expandedSection === 'anchors' ? null : 'anchors')}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold">Quality Anchors ({experienceFingerprint.qualityAnchors.length})</span>
              </div>
              {expandedSection === 'anchors' ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedSection === 'anchors' && (
              <div className="space-y-2 pl-6 pr-3 pb-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Preserve these excellent elements as you revise:
                </p>
                {experienceFingerprint.qualityAnchors.map((anchor, idx) => (
                  <div key={idx} className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge
                        variant={
                          anchor.preservationPriority === 'critical' ? 'destructive' :
                          anchor.preservationPriority === 'high' ? 'default' :
                          'secondary'
                        }
                        className="text-xs"
                      >
                        {anchor.preservationPriority}
                      </Badge>
                      <p className="text-sm italic flex-1">"{anchor.sentence}"</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ✨ {anchor.whyItWorks}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

// Helper component for unique dimension cards
interface UniqueDimensionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail?: string;
  whyItMatters?: string;
}

const UniqueDimensionCard: React.FC<UniqueDimensionCardProps> = ({
  icon,
  title,
  description,
  detail,
  whyItMatters,
}) => {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 space-y-2">
      <div className="flex items-start gap-2">
        {icon}
        <div className="flex-1">
          <h5 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            {title}
          </h5>
          <p className="text-sm text-emerald-800 dark:text-emerald-200 mt-1">
            {description}
          </p>
          {detail && (
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
              {detail}
            </p>
          )}
          {whyItMatters && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 italic">
              💡 {whyItMatters}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
