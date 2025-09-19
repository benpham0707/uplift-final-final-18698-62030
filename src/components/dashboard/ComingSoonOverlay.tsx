import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Sparkles, Crown } from 'lucide-react';

interface ComingSoonOverlayProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  children,
  title = "Expert Mode Feature",
  description = "Advanced analytics and insights coming soon!",
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Compact Coming Soon Block */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="max-w-xs shadow-large border-2 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-md border-transparent" 
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))',
                borderImage: 'linear-gradient(135deg, hsl(var(--primary) / 0.6), hsl(var(--accent) / 0.6)) 1'
              }}>
          <CardContent className="p-4 text-center space-y-3">
            <div className="flex justify-center items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-primary text-white shadow-soft">
                <Crown className="h-4 w-4" />
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30 text-xs">
                <Lock className="h-2.5 w-2.5 mr-1" />
                Expert Mode
              </Badge>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1 flex items-center justify-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {title}
              </h4>
              
              <p className="text-muted-foreground text-xs leading-relaxed">
                {description}
              </p>
            </div>
            
            <div className="pt-2 border-t border-border/30">
              <p className="text-[10px] text-muted-foreground">
                More features in Expert Mode
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};