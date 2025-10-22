import React from 'react';
import { Card } from '@/components/ui/card';
import { WritingIssue } from './types';
import { SuggestionCarousel } from './SuggestionCarousel';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Loader2, Quote, AlertOctagon, Lightbulb } from 'lucide-react';

interface IssueCardProps {
  issue: WritingIssue;
  onToggle: () => void;
  onApplySuggestion: (issueId: string, suggestionText: string, type: 'replace' | 'insert_before' | 'insert_after') => void;
  onNextSuggestion: (issueId: string) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  onToggle,
  onApplySuggestion,
  onNextSuggestion
}) => {
  const getStatusIcon = (status: WritingIssue['status']) => {
    switch (status) {
      case 'fixed': return CheckCircle2;
      case 'in_progress': return Loader2;
      default: return Circle;
    }
  };

  const getStatusColor = (status: WritingIssue['status']) => {
    switch (status) {
      case 'fixed': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950/30';
      case 'in_progress': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950/30';
      default: return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/30';
    }
  };

  const StatusIcon = getStatusIcon(issue.status);

  if (issue.status === 'fixed') {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10 border-l-4 border-l-green-500 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{issue.title}</h4>
            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5 font-medium">Issue resolved</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!issue.expanded) {
    return (
      <Card 
        className="bg-background/70 backdrop-blur-sm border-l-4 border-l-primary p-4 cursor-pointer hover:shadow-medium hover:bg-background transition-all"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getStatusColor(issue.status)}`}>
              <StatusIcon className={`w-4 h-4 ${issue.status === 'in_progress' ? 'animate-spin' : ''}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">{issue.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {issue.suggestions.length} suggestion{issue.suggestions.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-background border-2 border-primary/30 shadow-strong">
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getStatusColor(issue.status)}`}>
              <StatusIcon className={`w-5 h-5 ${issue.status === 'in_progress' ? 'animate-spin' : ''}`} />
            </div>
            <h4 className="text-lg font-bold pt-1">{issue.title}</h4>
          </div>
          <button 
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 -mt-1 -mr-2 rounded-lg hover:bg-muted"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <Quote className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                From Your Draft
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-l-4 border-l-primary shadow-inner">
              <p className="text-sm italic leading-relaxed text-foreground/90">
                {issue.excerpt.replace(/"/g, '')}
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                The Problem
              </p>
            </div>
            <p className="text-sm leading-relaxed pl-4 border-l-2 border-red-200 dark:border-red-900">
              {issue.analysis}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Why It Matters
              </p>
            </div>
            <p className="text-sm leading-relaxed pl-4 border-l-2 border-blue-200 dark:border-blue-900">
              {issue.impact}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <SuggestionCarousel
            suggestions={issue.suggestions}
            currentIndex={issue.currentSuggestionIndex}
            onNext={() => onNextSuggestion(issue.id)}
            onApply={(text, type) => onApplySuggestion(issue.id, text, type)}
          />
        </div>
      </div>
    </Card>
  );
};
