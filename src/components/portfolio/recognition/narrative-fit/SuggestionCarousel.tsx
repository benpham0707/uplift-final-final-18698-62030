import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Wand2, MessageCircle } from 'lucide-react';
import { EditSuggestion } from './types';

interface SuggestionCarouselProps {
  suggestions: EditSuggestion[];
  currentIndex: number;
  onNext: () => void;
  onApply: (suggestionText: string, type: 'replace' | 'insert_before' | 'insert_after') => void;
}

export const SuggestionCarousel: React.FC<SuggestionCarouselProps> = ({
  suggestions,
  currentIndex,
  onNext,
  onApply
}) => {
  const currentSuggestion = suggestions[currentIndex];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">
          Suggested Fix
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
          {currentIndex + 1} / {suggestions.length}
        </span>
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
          {currentSuggestion.rationale}
        </p>
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          onClick={() => onApply(currentSuggestion.text, currentSuggestion.type)}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Wand2 className="w-4 h-4" />
          Apply This Edit
        </Button>
        {currentIndex < suggestions.length - 1 && (
          <Button
            onClick={onNext}
            variant="outline"
            className="gap-2"
          >
            Next ({currentIndex + 2}/{suggestions.length})
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
