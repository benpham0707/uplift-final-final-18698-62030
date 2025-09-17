import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Crown, Sparkles } from 'lucide-react';

interface ExpertAnalysisCardProps {
  title: string;
  content: string | React.ReactNode;
  category?: string;
  className?: string;
}

export const ExpertAnalysisCard: React.FC<ExpertAnalysisCardProps> = ({
  title,
  content,
  category,
  className
}) => {
  return (
    <Card className={cn(
      'group relative overflow-hidden border-gradient shadow-large hover-glow-subtle transition-all duration-500',
      'bg-gradient-to-br from-card via-card to-card/95',
      className
    )}>
      {/* Premium background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Sparkle decoration */}
      <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
        <Sparkles className="h-5 w-5" />
      </div>
      
      <CardHeader className="pb-4 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                <Crown className="h-4 w-4" />
              </div>
              <Badge variant="outline" className="text-xs font-medium bg-primary/5 text-primary border-primary/20">
                Expert Analysis
              </Badge>
            </div>
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground leading-tight pt-2">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0 relative">
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
          {typeof content === 'string' ? (
            <p className="text-sm">{content}</p>
          ) : (
            content
          )}
        </div>
      </CardContent>
    </Card>
  );
};