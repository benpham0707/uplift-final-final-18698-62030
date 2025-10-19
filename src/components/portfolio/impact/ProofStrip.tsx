import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image, Video, BarChart, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArtifactModal } from './ArtifactModal';
import { cn } from '@/lib/utils';

export interface Artifact {
  id: string;
  type: 'screenshot' | 'document' | 'video' | 'data' | 'quote';
  thumbnail?: string;
  title: string;
  description: string;
  link?: string;
  date: string;
}

interface ProofStripProps {
  artifacts: Artifact[];
}

const typeConfig = {
  screenshot: { icon: Image, color: 'text-blue-500' },
  document: { icon: FileText, color: 'text-green-500' },
  video: { icon: Video, color: 'text-purple-500' },
  data: { icon: BarChart, color: 'text-amber-500' },
  quote: { icon: Quote, color: 'text-pink-500' },
};

export const ProofStrip: React.FC<ProofStripProps> = ({ artifacts }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="relative">
        {/* Scroll Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow-lg"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-lg"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Artifact Strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {artifacts.map((artifact) => {
            const config = typeConfig[artifact.type];
            const Icon = config.icon;
            const compactQuote = artifact.type === 'quote' && !artifact.thumbnail
              ? (artifact.description?.length > 80
                ? `${artifact.description.slice(0, 80)}…`
                : artifact.description)
              : null;

            return (
              <TooltipProvider key={artifact.id} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card
                      className="flex-shrink-0 w-64 snap-start border-primary/20 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedArtifact(artifact)}
                    >
                      <CardContent className="p-4 space-y-3">
                        {/* Type Icon */}
                        <div className="flex items-center justify-between">
                          <Icon className={cn("w-5 h-5", config.color)} />
                          {artifact.link && (
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>

                        {/* Thumbnail (if available) */}
                        {artifact.thumbnail && (
                          <div className="w-full h-32 bg-muted rounded-md overflow-hidden">
                            <img
                              src={artifact.thumbnail}
                              alt={artifact.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Inline preview for items without thumbnails */}
                        {!artifact.thumbnail && compactQuote && (
                          <div className="w-full h-32 rounded-md bg-pink-50 text-pink-700 p-3 text-xs leading-relaxed border border-pink-200">
                            “{compactQuote}”
                          </div>
                        )}
                        {!artifact.thumbnail && artifact.type === 'document' && (
                          <div className="w-full h-32 rounded-md bg-green-50 text-green-700 p-3 text-xs leading-relaxed border border-green-200 flex items-center justify-center text-center">
                            Document preview
                          </div>
                        )}
                        {!artifact.thumbnail && artifact.type === 'data' && (
                          <div className="w-full h-32 rounded-md bg-amber-50 text-amber-700 p-3 text-xs leading-relaxed border border-amber-200 flex items-center justify-center text-center">
                            Data artifact
                          </div>
                        )}

                        {/* Title */}
                        <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                          {artifact.title}
                        </h4>

                        {/* Date */}
                        <div className="text-xs text-muted-foreground">
                          {artifact.date}
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{artifact.title}</p>
                      <p className="text-xs text-muted-foreground">{artifact.date}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      <ArtifactModal
        artifact={selectedArtifact}
        isOpen={!!selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    </>
  );
};