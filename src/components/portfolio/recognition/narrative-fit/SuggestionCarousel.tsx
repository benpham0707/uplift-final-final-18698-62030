import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, ChevronDown, ChevronUp } from 'lucide-react';
import { EditSuggestion } from './types';
import { NavigationControls } from '../../NavigationControls';

interface SuggestionCarouselProps {
  suggestions: EditSuggestion[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onApply: (suggestionText: string, type: 'replace' | 'insert_before' | 'insert_after') => void;
}

export const SuggestionCarousel: React.FC<SuggestionCarouselProps> = ({
  suggestions,
  currentIndex,
  onNext,
  onPrev,
  onApply
}) => {
  const currentSuggestion = suggestions[currentIndex];
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
  }, [currentIndex]);

  const shouldTruncate = currentSuggestion.rationale.length > 150;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">
          Suggested Fix
        </span>
        <NavigationControls
          current={currentIndex}
          total={suggestions.length}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>

      <div className="p-4 rounded-lg bg-primary/5 border-l-4 border-primary">
        <p className="text-sm leading-relaxed text-foreground">
          {currentSuggestion.text}
        </p>
      </div>

      <div className="pl-3 border-l-2 border-primary/30">
        <p className="text-xs font-semibold text-primary mb-1">
          Why This Works
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isExpanded || !shouldTruncate
            ? currentSuggestion.rationale
            : `${currentSuggestion.rationale.slice(0, 150)}...`}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm transition-all text-xs font-medium text-purple-900 dark:text-purple-100"
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                View more
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          onClick={() => onApply(currentSuggestion.text, currentSuggestion.type)}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Wand2 className="w-4 h-4" />
          Apply This Edit
        </Button>
      </div>
    </div>
  );
};
