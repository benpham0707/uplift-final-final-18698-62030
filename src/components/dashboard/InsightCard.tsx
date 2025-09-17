import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InsightCardProps {
  title: string;
  content: string | React.ReactNode;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  content,
  icon: Icon,
  variant = 'default',
  className
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'gradient-card-primary text-white';
      case 'secondary':
        return 'gradient-card-secondary text-white';
      case 'success':
        return 'gradient-score-excellent text-white';
      case 'warning':
        return 'gradient-score-warning text-white';
      default:
        return 'bg-card border-gradient';
    }
  };

  return (
    <Card className={cn(
      'group hover-lift cursor-pointer transition-all duration-300 overflow-hidden',
      getVariantClasses(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            'p-3 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110',
            variant === 'default' ? 'bg-primary/10 text-primary' : 'bg-white/20 text-white'
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className={cn(
              'font-semibold text-lg leading-tight',
              variant === 'default' ? 'text-foreground' : 'text-white'
            )}>
              {title}
            </h3>
            <div className={cn(
              'text-sm leading-relaxed',
              variant === 'default' ? 'text-muted-foreground' : 'text-white/90'
            )}>
              {typeof content === 'string' ? (
                <p>{content}</p>
              ) : (
                content
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};