/**
 * Draft Version History Modal
 * 
 * Simple version history viewer for essay drafts showing:
 * - Timeline of draft versions
 * - Score changes
 * - Quick restore functionality
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';

interface DraftVersion {
  id: string;
  description: string;
  timestamp: number;
  score: number;
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
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Version History</h2>
            <p className="text-sm opacity-90">{versions.length} saved versions</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-primary-foreground hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Version List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {versions.map((version, index) => {
            const isCurrent = version.id === currentVersionId;
            const prevVersion = versions[index + 1];
            const scoreDelta = prevVersion ? version.score - prevVersion.score : 0;

            return (
              <div
                key={version.id}
                className={`border rounded-lg p-4 transition-all ${
                  isCurrent 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {new Date(version.timestamp).toLocaleString()}
                      </span>
                      {isCurrent && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                      {index === 0 && !isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Latest
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">
                        {version.score}
                      </span>
                      <span className="text-muted-foreground">/100</span>
                      {scoreDelta !== 0 && (
                        <div className="flex items-center gap-1">
                          {scoreDelta > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              scoreDelta > 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {scoreDelta > 0 ? '+' : ''}{scoreDelta}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!isCurrent && (
                    <Button
                      onClick={() => onRestore(version.description)}
                      size="sm"
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </Button>
                  )}
                </div>

                {/* Draft Preview */}
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Draft Preview:
                  </h4>
                  <div className="p-3 bg-muted/50 rounded text-sm max-h-32 overflow-y-auto whitespace-pre-wrap">
                    {version.description.length > 300 
                      ? `${version.description.substring(0, 300)}...` 
                      : version.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
