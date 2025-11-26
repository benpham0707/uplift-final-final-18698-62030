/**
 * PIQ Tabs Navigation
 * 
 * Horizontal scrollable tabs showing all 8 UC PIQ prompts.
 * Makes it easy to switch between questions with a single click.
 */

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight, FileText, Check, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UC_PIQ_PROMPTS } from './PIQPromptSelector';

interface PIQTabsNavProps {
  currentPromptId: string;
  onPromptChange: (promptId: string) => void;
  /** Optional: map of promptId to essay status for showing completion indicators */
  essayStatus?: Record<string, 'empty' | 'draft' | 'complete'>;
  className?: string;
}

export const PIQTabsNav: React.FC<PIQTabsNavProps> = ({
  currentPromptId,
  onPromptChange,
  essayStatus = {},
  className,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check if we need scroll arrows
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Scroll active tab into view on mount and when current changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const activeTab = container.querySelector('[data-active="true"]');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentPromptId]);

  const getStatusIcon = (promptId: string) => {
    const status = essayStatus[promptId];
    if (status === 'complete') {
      return <Check className="w-3 h-3 text-green-500" />;
    }
    if (status === 'draft') {
      return <Pencil className="w-3 h-3 text-amber-500" />;
    }
    return null;
  };

  // Shortened titles for tabs
  const getShortTitle = (title: string): string => {
    const shortTitles: Record<string, string> = {
      'Leadership Experience': 'Leadership',
      'Creative Side': 'Creative',
      'Greatest Talent or Skill': 'Talent',
      'Educational Opportunity or Barrier': 'Education',
      'Significant Challenge': 'Challenge',
      'Inspiring Academic Subject': 'Academic',
      'Community Contribution': 'Community',
      'What Sets You Apart': 'Unique',
    };
    return shortTitles[title] || title;
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      )}

      {/* Tabs container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-1 overflow-x-auto scrollbar-hide px-1 py-1 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {UC_PIQ_PROMPTS.map((prompt) => {
          const isActive = prompt.id === currentPromptId;
          const statusIcon = getStatusIcon(prompt.id);
          
          return (
            <TooltipProvider key={prompt.id}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <button
                    data-active={isActive}
                    onClick={() => onPromptChange(prompt.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20"
                        : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                    )}
                  >
                    <span className={cn(
                      "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-muted-foreground/10 text-muted-foreground"
                    )}>
                      {prompt.number}
                    </span>
                    <span className="hidden sm:inline">{getShortTitle(prompt.title)}</span>
                    {statusIcon && <span className="ml-0.5">{statusIcon}</span>}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="font-medium">PIQ #{prompt.number}: {prompt.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prompt.prompt}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Right scroll arrow */}
      {showRightArrow && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default PIQTabsNav;
