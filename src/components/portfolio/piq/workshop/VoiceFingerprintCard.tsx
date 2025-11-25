/**
 * Voice Fingerprint Card
 *
 * Displays the student's authentic writing identity:
 * - Sentence structure patterns
 * - Vocabulary level & signature words
 * - Pacing characteristics
 * - Tone analysis
 */

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, BookOpen, Gauge, Smile } from 'lucide-react';
import type { VoiceFingerprintData } from '@/components/portfolio/extracurricular/workshop/backendTypes';

interface VoiceFingerprintCardProps {
  voiceFingerprint: VoiceFingerprintData;
}

export const VoiceFingerprintCard: React.FC<VoiceFingerprintCardProps> = ({
  voiceFingerprint,
}) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Mic className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Voice Fingerprint</h3>
            <p className="text-sm text-muted-foreground">Your authentic writing identity</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sentence Structure */}
          {voiceFingerprint.sentenceStructure && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold">Sentence Structure</span>
              </div>
              <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium text-foreground">
                  {voiceFingerprint.sentenceStructure.pattern}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  "{voiceFingerprint.sentenceStructure.example}"
                </p>
              </div>
            </div>
          )}

          {/* Vocabulary */}
          {voiceFingerprint.vocabulary && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold">Vocabulary</span>
              </div>
              <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium text-foreground">
                  {voiceFingerprint.vocabulary.level}
                </p>
                {voiceFingerprint.vocabulary.signatureWords && voiceFingerprint.vocabulary.signatureWords.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {voiceFingerprint.vocabulary.signatureWords.map((word, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {word}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pacing */}
          {voiceFingerprint.pacing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold">Pacing</span>
              </div>
              <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Speed:</span>
                  <span className="text-sm font-medium">{voiceFingerprint.pacing.speed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Rhythm:</span>
                  <span className="text-sm font-medium">{voiceFingerprint.pacing.rhythm}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tone */}
          {voiceFingerprint.tone && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-semibold">Tone</span>
              </div>
              <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Primary:</span>
                  <Badge variant="default" className="text-xs">
                    {voiceFingerprint.tone.primary}
                  </Badge>
                </div>
                {voiceFingerprint.tone.secondary && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Secondary:</span>
                    <Badge variant="outline" className="text-xs">
                      {voiceFingerprint.tone.secondary}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-purple-200 dark:border-purple-800">
          <p className="text-xs text-muted-foreground">
            💡 Your voice fingerprint helps maintain authenticity as you revise
          </p>
        </div>
      </div>
    </Card>
  );
};
