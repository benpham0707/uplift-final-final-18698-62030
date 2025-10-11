import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pin, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DifferentiatorCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  colorFrom: string;
  colorTo: string;
  effect: string;
  evidence: string;
  isPinned?: boolean;
  onPin?: (id: string) => void;
}

export function DifferentiatorCard({
  title,
  description,
  icon: Icon,
  colorFrom,
  colorTo,
  effect,
  evidence,
  isPinned = false,
  onPin,
  id,
}: DifferentiatorCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "border-border/50 backdrop-blur-sm",
        isPinned && "ring-2 ring-primary"
      )}
      style={{
        background: `linear-gradient(135deg, ${colorFrom}15 0%, ${colorTo}15 100%)`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${colorFrom}25 0%, ${colorTo}25 100%)`,
            }}
          >
            <Icon className="h-5 w-5" style={{ color: colorFrom }} />
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <button
          onClick={() => onPin?.(id)}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            isPinned 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent text-muted-foreground hover:text-foreground"
          )}
          title={isPinned ? "Unpin" : "Pin to prioritize"}
        >
          <Pin className={cn("h-4 w-4", isPinned && "fill-current")} />
        </button>
      </div>

      {/* Description */}
      <p className="px-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Evidence Trail */}
      <div className="px-4 py-3 mt-2 border-t border-border/50 space-y-2">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5">
          Evidence Trail
        </div>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="text-xs font-normal gap-1">
                  📍 {effect}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Activities where this strength appears</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs font-normal gap-1">
                  ✓ {evidence}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supporting evidence from your portfolio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
}
