import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quote: string;
  author?: string;
  context?: string;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  context,
  variant = 'default',
  className
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'gradient-card-primary text-white';
      case 'secondary':
        return 'gradient-card-secondary text-white';
      default:
        return 'bg-gradient-accent border border-border/50';
    }
  };

  return (
    <Card className={cn(
      'group hover-lift transition-all duration-300 shadow-soft relative overflow-hidden',
      getVariantClasses(),
      className
    )}>
      {/* Quote decoration */}
      <div className={cn(
        'absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300',
        variant === 'default' ? 'text-primary' : 'text-white'
      )}>
        <Quote className="h-8 w-8" />
      </div>
      
      <CardContent className="p-6 relative">
        <div className="space-y-4">
          <blockquote className={cn(
            'text-lg leading-relaxed italic font-medium',
            variant === 'default' ? 'text-foreground' : 'text-white'
          )}>
            "{quote}"
          </blockquote>
          
          {author && (
            <footer className="space-y-1">
              <cite className={cn(
                'text-sm font-semibold not-italic',
                variant === 'default' ? 'text-primary' : 'text-white/90'
              )}>
                — {author}
              </cite>
              {context && (
                <p className={cn(
                  'text-xs',
                  variant === 'default' ? 'text-muted-foreground' : 'text-white/70'
                )}>
                  {context}
                </p>
              )}
            </footer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};