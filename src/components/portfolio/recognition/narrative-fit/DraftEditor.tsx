import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, FileEdit, Save } from 'lucide-react';
import { Check } from 'lucide-react';

interface DraftEditorProps {
  draft: string;
  onDraftChange: (draft: string) => void;
  wordCount: number;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  versionInfo: string;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({ 
  draft, 
  onDraftChange, 
  wordCount,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  versionInfo
}) => {
  const targetMin = 90;
  const targetMax = 170;
  const progress = Math.min((wordCount / targetMax) * 100, 100);
  
  const getProgressColor = () => {
    if (wordCount < targetMin) return 'bg-warning';
    if (wordCount > targetMax) return 'bg-destructive';
    return 'bg-success';
  };

  const insertText = (text: string) => {
    onDraftChange(draft + (draft.endsWith(' ') ? '' : ' ') + text);
  };

  return (
    <div className="bg-gradient-to-br from-background via-primary/5 to-background border-b shadow-soft">
      <div className="max-w-4xl mx-auto p-8 space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
                <FileEdit className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Your Draft</h3>
            </div>
            <div className="flex items-center gap-3">
              {(canUndo || canRedo) && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {versionInfo}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="h-8 w-8 p-0"
                    title="Undo"
                  >
                    <Undo2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRedo}
                    disabled={!canRedo}
                    className="h-8 w-8 p-0"
                    title="Redo"
                  >
                    <Redo2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-1.5 rounded-md">
                <Save className="w-3.5 h-3.5" />
                Autosaved
              </div>
            </div>
          </div>
          <Textarea
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder="Write about your recognition here... Aim for 90-170 words with specific metrics, selectivity context, and thematic connection."
            className="min-h-[180px] text-base leading-relaxed resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className={`text-lg font-bold ${
                wordCount < 90 ? 'text-yellow-600 dark:text-yellow-400' : 
                wordCount > 170 ? 'text-red-600 dark:text-red-400' : 
                'text-green-600 dark:text-green-400'
              }`}>
                {wordCount}
              </span>
              <div>
                <div className="font-medium text-foreground">words</div>
                <div className="text-xs text-muted-foreground">Target: 90-170</div>
              </div>
            </div>
            {wordCount >= 90 && wordCount <= 170 && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-1.5 rounded-md">
                <Check className="w-3.5 h-3.5" />
                Perfect Range
              </div>
            )}
          </div>
          <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                wordCount < 90 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 
                wordCount > 170 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 
                'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}
              style={{ width: `${Math.min((wordCount / 170) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-3">Quick Insert Templates:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => insertText('This directly reinforces my [theme name] narrative. ')}
              variant="outline"
              size="sm"
              className="text-xs h-8"
            >
              Theme Connection
            </Button>
            <Button
              onClick={() => insertText('(Top X of Y applicants) ')}
              variant="outline"
              size="sm"
              className="text-xs h-8"
            >
              Selectivity Context
            </Button>
            <Button
              onClick={() => insertText('which resulted in ')}
              variant="outline"
              size="sm"
              className="text-xs h-8"
            >
              Cause & Effect
            </Button>
            <Button
              onClick={() => insertText('This experience taught me ')}
              variant="outline"
              size="sm"
              className="text-xs h-8"
            >
              Reflection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
