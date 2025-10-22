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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-sm">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            Suggested Fix
          </span>
        </div>
        <div className="flex items-center gap-2">
          {suggestions.length > 1 && (
            <>
              {suggestions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-green-600 dark:bg-green-400 w-6'
                      : 'bg-green-200 dark:bg-green-900'
                  }`}
                />
              ))}
            </>
          )}
          <span className="text-xs px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-semibold ml-2">
            {currentIndex + 1} / {suggestions.length}
          </span>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/20 border-2 border-green-300 dark:border-green-700 shadow-medium">
        <p className="text-base font-medium leading-relaxed text-foreground">
          {currentSuggestion.text}
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border-l-4 border-primary">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              Why This Works
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {currentSuggestion.rationale}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          onClick={() => onApply(currentSuggestion.text, currentSuggestion.type)}
          size="lg"
          className="flex-1 min-w-[160px] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-medium hover:shadow-strong transition-all gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Apply This Edit
        </Button>
        {currentIndex < suggestions.length - 1 && (
          <Button
            onClick={onNext}
            variant="outline"
            size="lg"
            className="gap-2 hover:bg-accent hover:border-primary transition-all"
          >
            Next Suggestion ({currentIndex + 2}/{suggestions.length})
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
