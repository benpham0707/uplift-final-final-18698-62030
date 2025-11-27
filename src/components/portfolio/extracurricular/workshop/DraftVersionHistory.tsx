/**
 * Draft Version History Modal
 * 
 * Simple version history viewer for essay drafts showing:
 * - Timeline of draft versions
 * - Score changes (for analyzed versions)
 * - "Not Reanalyzed" tag (for quick saves without analysis)
 * - Quick restore functionality
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, RotateCcw, FileEdit, Sparkles } from 'lucide-react';

interface DraftVersion {
  id: string;
  description: string;
  timestamp: number;
  score?: number; // Optional - undefined for 'save_draft' versions
  source?: 'analyze' | 'save_draft'; // Optional - indicates version type
  categories?: Array<{ name: string; score: number }>;
}

interface DraftVersionHistoryProps {
  versions: DraftVersion[];
  currentVersionId?: string;
  onRestore: (description: string) => void;
  onClose: () => void;
}

export function DraftVersionHistory({ 
  versions, 
  currentVersionId, 
  onRestore, 
  onClose 
}: DraftVersionHistoryProps) {
  if (versions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-4">No Version History</h2>
          <p className="text-muted-foreground mb-6">
            No saved versions yet. Make changes to your draft to create versions.
          </p>
          <Button onClick={onClose}>Close</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Simple Header */}
        <div className="p-6 pb-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold whitespace-nowrap">Version History</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Single-Column List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-3">
            {versions.map((version) => {
              const isCurrent = version.id === currentVersionId;
              const hasScore = version.score !== undefined && version.score !== null;
              const isAnalyzed = version.source === 'analyze' || hasScore;

              return (
                <Card
                  key={version.id}
                  className={`relative p-4 transition-all hover:shadow-md flex items-center gap-6 ${
                    isCurrent
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : isAnalyzed 
                        ? 'hover:border-primary/50' 
                        : 'hover:border-amber-500/50 bg-amber-50/30 dark:bg-amber-950/10'
                  }`}
                >
                  {/* Score or Not Reanalyzed indicator */}
                  <div className="flex-shrink-0 text-center min-w-[80px]">
                    {hasScore ? (
                      <>
                        <div className="text-4xl font-bold text-foreground">
                          {version.score}
                        </div>
                        <div className="text-sm text-muted-foreground">/100</div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <FileEdit className="w-6 h-6 text-amber-600 dark:text-amber-400 mb-1" />
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                          Draft
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Date and Type */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {isAnalyzed ? (
                        <Badge variant="secondary" className="text-xs gap-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          <Sparkles className="w-3 h-3" />
                          Analyzed
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs gap-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          <FileEdit className="w-3 h-3" />
                          Not Reanalyzed
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(version.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      {' • '}
                      {new Date(version.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  {/* Current Badge */}
                  {isCurrent && (
                    <Badge variant="default" className="text-xs">
                      Current
                    </Badge>
                  )}

                  {/* Restore Button */}
                  {!isCurrent && (
                    <Button
                      onClick={() => onRestore(version.description)}
                      size="sm"
                      variant="ghost"
                      className="gap-2 hover:bg-muted"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
