import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ExpandableSectionProps {
  title: string;
  preview: string;
  fullContent: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  defaultExpanded?: boolean;
  className?: string;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  preview,
  fullContent,
  variant = 'default',
  defaultExpanded = false,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary/20 bg-primary/5';
      case 'secondary':
        return 'border-secondary/20 bg-secondary/5';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className={cn(
        'transition-all duration-300 hover:shadow-medium',
        getVariantClasses(),
        className
      )}>
        <CardHeader className="pb-4">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto hover:bg-transparent group"
            >
              <div className="text-left space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                {!isExpanded && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {preview}
                  </p>
                )}
              </div>
              <div className={cn(
                'ml-4 p-2 rounded-full transition-all duration-300',
                'group-hover:bg-primary/10 group-hover:text-primary',
                isExpanded ? 'rotate-180 bg-primary/10 text-primary' : 'text-muted-foreground'
              )}>
                <ChevronDown className="h-4 w-4" />
              </div>
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <CardContent className="pt-0">
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              {fullContent}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};