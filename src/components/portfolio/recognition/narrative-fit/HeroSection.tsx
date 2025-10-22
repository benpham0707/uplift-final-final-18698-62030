import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PenTool } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

export const HeroSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b shadow-soft">
      <div className="max-w-5xl mx-auto p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-medium">
            <PenTool className="w-6 h-6 text-primary-foreground" />
          </div>
          <GradientText className="text-3xl font-bold">
            Narrative Fit Workshop
          </GradientText>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          How to use this workshop
        </button>
        
        {isExpanded && (
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="font-semibold text-base mb-4">Transform your recognition description into an officer-ready narrative:</p>
            <div className="grid gap-3 text-sm leading-relaxed">
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-primary-foreground">1</span>
                </div>
                <span className="pt-0.5">Review your draft and overall score</span>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-primary-foreground">2</span>
                </div>
                <span className="pt-0.5">Expand rubric dimensions to see specific issues</span>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-primary-foreground">3</span>
                </div>
                <span className="pt-0.5">Click issues to see analysis and edit suggestions</span>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-primary-foreground">4</span>
                </div>
                <span className="pt-0.5">Apply edits and watch your scores improve in real-time</span>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-primary-foreground">5</span>
                </div>
                <span className="pt-0.5">Use undo/redo to experiment with different approaches</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
