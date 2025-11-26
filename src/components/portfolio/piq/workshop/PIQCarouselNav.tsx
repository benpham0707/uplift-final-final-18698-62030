import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UC_PIQ_PROMPTS } from './PIQPromptSelector';
import GradientText from '@/components/ui/GradientText';

interface PIQCarouselNavProps {
  currentPromptId: string;
  onPromptChange?: (promptId: string) => void;
  /** If true, use URL navigation instead of callback */
  useRoutes?: boolean;
}

export const PIQCarouselNav: React.FC<PIQCarouselNavProps> = ({
  currentPromptId,
  onPromptChange,
  useRoutes = true
}) => {
  const navigate = useNavigate();
  const currentIndex = UC_PIQ_PROMPTS.findIndex(p => p.id === currentPromptId);
  const currentPrompt = UC_PIQ_PROMPTS[currentIndex];

  const handleNavigate = (prompt: typeof UC_PIQ_PROMPTS[0]) => {
    if (useRoutes) {
      navigate(`/piq-workshop/${prompt.number}`);
    } else if (onPromptChange) {
      onPromptChange(prompt.id);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : UC_PIQ_PROMPTS.length - 1;
    handleNavigate(UC_PIQ_PROMPTS[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < UC_PIQ_PROMPTS.length - 1 ? currentIndex + 1 : 0;
    handleNavigate(UC_PIQ_PROMPTS[nextIndex]);
  };

  const handleDotClick = (index: number) => {
    handleNavigate(UC_PIQ_PROMPTS[index]);
  };

  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Navigation row with pipes */}
      <div className="flex items-center justify-center gap-3 w-full">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground/50 text-lg">|</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-default whitespace-nowrap">
                  <GradientText 
                    colors={["#a855f7", "#8b5cf6", "#c084fc", "#a78bfa", "#a855f7"]}
                    className="text-xl font-bold"
                  >
                    PIQ #{currentIndex + 1}: {currentPrompt?.title || 'Leadership experience'}
                  </GradientText>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{currentPrompt?.prompt}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-muted-foreground/50 text-lg">|</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {UC_PIQ_PROMPTS.map((prompt, index) => (
          <TooltipProvider key={prompt.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleDotClick(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-purple-500 scale-125'
                      : 'border border-muted-foreground/30 hover:border-muted-foreground/50 hover:scale-110'
                  }`}
                  aria-label={`Go to PIQ ${index + 1}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">PIQ #{index + 1}: {prompt.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
