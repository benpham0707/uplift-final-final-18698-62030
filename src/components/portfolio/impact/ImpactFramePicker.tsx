import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Scale, Heart, Zap, FileText, Microscope, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// HARD-CODED DATA: Rich text segments with inline evidence
export type RichSegment = string | { text: string; evidence: string };

export interface ImpactFrame {
  id: 'scale' | 'depth' | 'catalyst' | 'policy' | 'research';
  label: string;
  description: string;
  narrative: RichSegment[];
  supportingMetrics: Array<{
    metric: string;
    value: string | number;
    context: string;
  }>;
  strengthScore: number;
}

interface ImpactFramePickerProps {
  frames: ImpactFrame[];
  defaultFrame?: string;
}

const frameIcons = {
  scale: Scale,
  depth: Heart,
  catalyst: Zap,
  policy: FileText,
  research: Microscope,
};

export const ImpactFramePicker: React.FC<ImpactFramePickerProps> = ({
  frames,
  defaultFrame = 'scale',
}) => {
  const [activeFrame, setActiveFrame] = useState(defaultFrame);

  const renderNarrative = (narrative: RichSegment[]) => {
    return narrative.map((segment, idx) => {
      if (typeof segment === 'string') {
        return <span key={idx}>{segment}</span>;
      } else {
        return (
          <TooltipProvider key={idx}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-primary font-semibold underline decoration-dotted cursor-help">
                  {segment.text}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">{segment.evidence}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    });
  };

  const getStrengthColor = (score: number) => {
    if (score >= 9) return 'text-green-500';
    if (score >= 8) return 'text-blue-500';
    if (score >= 7) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">Impact Perspectives</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                View your impact through different strategic lenses. Each frame is a valid way to 
                tell your story—choose the one that best fits your narrative goals.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs value={activeFrame} onValueChange={setActiveFrame} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          {frames.map((frame) => {
            const Icon = frameIcons[frame.id];
            return (
              <TabsTrigger key={frame.id} value={frame.id} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{frame.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {frames.map((frame) => (
          <TabsContent key={frame.id} value={frame.id} className="mt-4">
            <Card className="border-primary/20">
              <CardContent className="p-6 md:p-8 space-y-6">
                {/* Frame Description */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {frame.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {frame.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className={cn("text-2xl font-extrabold", getStrengthColor(frame.strengthScore))}>
                      {frame.strengthScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      / 10 strength
                    </div>
                  </div>
                </div>

                {/* Narrative with Evidence */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-base text-foreground leading-relaxed">
                    {renderNarrative(frame.narrative)}
                  </p>
                </div>

                {/* Supporting Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                  {frame.supportingMetrics.map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {metric.value}
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {metric.metric}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.context}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
