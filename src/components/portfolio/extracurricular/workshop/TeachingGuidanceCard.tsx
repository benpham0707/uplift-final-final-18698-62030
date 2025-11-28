/**
 * Teaching Guidance Card - Phase 19
 *
 * Progressive disclosure UI for deep teaching guidance.
 * Shows hooks/previews by default, expands to full depth on "View More".
 *
 * Design philosophy:
 * - Non-cluttered: Hooks are compelling but brief (80-120 chars)
 * - Progressive: Full depth revealed only when student is hooked
 * - Conversational: Mentor-style guidance, not lecturing
 * - Validating: Makes students feel SEEN, HEARD, EMPOWERED
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
  Target,
  BookOpen,
  AlertCircle,
} from 'lucide-react';

import { TeachingGuidance } from './backendTypes';

// ============================================================================
// TYPES
// ============================================================================

export interface TeachingGuidanceCardProps {
  teaching: TeachingGuidance;
}

interface SectionProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  hook: string;
  fullContent: React.ReactNode;
  defaultExpanded?: boolean;
}

// ============================================================================
// EXPANDABLE SECTION COMPONENT
// ============================================================================

const ExpandableSection: React.FC<SectionProps> = ({
  title,
  icon: Icon,
  iconColor,
  hook,
  fullContent,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="space-y-2">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
      </div>

      {/* Hook - Always visible */}
      <div className="p-3 rounded-md bg-white/50 border border-border">
        <p className="text-sm text-foreground leading-relaxed font-medium">
          {hook}
        </p>
      </div>

      {/* View More Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-xs font-semibold text-primary hover:text-primary/80"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-3 h-3 mr-1" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="w-3 h-3 mr-1" />
            View More
          </>
        )}
      </Button>

      {/* Full Content - Shown on expand */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-3">
          {fullContent}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const TeachingGuidanceCard: React.FC<TeachingGuidanceCardProps> = ({
  teaching,
}) => {
  const getMagnitudeColor = (magnitude: string) => {
    switch (magnitude) {
      case 'surgical':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'structural':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMagnitudeLabel = (magnitude: string) => {
    switch (magnitude) {
      case 'surgical':
        return 'Quick Fix';
      case 'moderate':
        return 'Moderate Change';
      case 'structural':
        return 'Bigger Revision';
      default:
        return magnitude;
    }
  };

  return (
    <div className="p-5 rounded-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200 space-y-5">
      {/* Header with Magnitude Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-foreground mb-1">
              Teaching Guidance
            </h4>
            <p className="text-xs text-muted-foreground">
              Pass knowledge, not just fixes
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`${getMagnitudeColor(teaching.changeMagnitude)} border`}
        >
          {getMagnitudeLabel(teaching.changeMagnitude)}
        </Badge>
      </div>

      {/* Change Magnitude Guidance */}
      <div className="p-3 rounded-md bg-white/60 border border-purple-200">
        <p className="text-sm text-foreground/80">
          {teaching.magnitudeGuidance}
        </p>
      </div>

      {/* THE PROBLEM */}
      <ExpandableSection
        title="The Problem"
        icon={AlertCircle}
        iconColor="text-red-600"
        hook={teaching.problem.hook}
        fullContent={
          <>
            {/* Full Problem Description */}
            <div className="p-4 rounded-md bg-white border border-red-200">
              <p className="text-sm text-foreground leading-relaxed">
                {teaching.problem.description}
              </p>
            </div>

            {/* Why It Matters - Hook */}
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-xs font-semibold text-red-800 mb-1 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Why This Matters
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {teaching.problem.whyItMatters.preview}
              </p>
            </div>

            {/* Why It Matters - Full Explanation */}
            <div className="p-4 rounded-md bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
              <p className="text-xs font-semibold text-red-800 mb-2">
                Strategic Deep Dive
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {teaching.problem.whyItMatters.fullExplanation}
              </p>
            </div>
          </>
        }
      />

      {/* CRAFT PRINCIPLE */}
      <ExpandableSection
        title="The Magic Behind Great Writing"
        icon={Sparkles}
        iconColor="text-purple-600"
        hook={teaching.craftPrinciple.hook}
        fullContent={
          <>
            {/* Full Teaching */}
            <div className="p-4 rounded-md bg-white border border-purple-200">
              <p className="text-xs font-semibold text-purple-800 mb-2">
                How Professional Writers Do This
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {teaching.craftPrinciple.fullTeaching}
              </p>
            </div>

            {/* Real-World Example */}
            <div className="p-4 rounded-md bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
              <p className="text-xs font-semibold text-purple-800 mb-2 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                Concrete Example
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {teaching.craftPrinciple.realWorldExample}
              </p>
            </div>
          </>
        }
      />

      {/* APPLICATION STRATEGY */}
      <ExpandableSection
        title="How to Apply This"
        icon={Target}
        iconColor="text-green-600"
        hook={teaching.applicationStrategy.quickStart}
        fullContent={
          <>
            {/* Step-by-Step Process */}
            <div className="p-4 rounded-md bg-white border border-green-200">
              <p className="text-xs font-semibold text-green-800 mb-2">
                Step-by-Step Process
              </p>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {teaching.applicationStrategy.deepDive}
              </p>
            </div>

            {/* Transferability */}
            <div className="p-4 rounded-md bg-gradient-to-r from-green-50 to-teal-50 border border-green-200">
              <p className="text-xs font-semibold text-green-800 mb-2">
                Apply This Everywhere
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {teaching.applicationStrategy.transferability}
              </p>
            </div>
          </>
        }
      />

      {/* PERSONAL NOTE */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-2 border-amber-300">
        <p className="text-xs font-semibold text-amber-900 mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Personal Note
        </p>
        <p className="text-sm text-foreground font-medium leading-relaxed italic">
          {teaching.personalNote}
        </p>
      </div>
    </div>
  );
};
