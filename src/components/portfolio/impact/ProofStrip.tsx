import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image, Video, BarChart, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground">Supporting Evidence</h3>
      
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

            return (
              <Card
                key={artifact.id}
                className="flex-shrink-0 w-64 snap-start border-primary/20 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                onClick={() => artifact.link && window.open(artifact.link, '_blank')}
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

                  {/* Title and Description */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                      {artifact.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {artifact.description}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-muted-foreground">
                    {artifact.date}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
