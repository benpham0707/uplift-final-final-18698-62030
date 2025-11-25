/**
 * PIQ Prompt Selector
 *
 * Dropdown component for selecting which UC PIQ prompt the essay responds to.
 * Essential for providing context to the surgical workshop analysis.
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// UC PIQ Prompts (all 8)
export const UC_PIQ_PROMPTS = [
  {
    id: 'piq1',
    number: 1,
    title: 'Leadership Experience',
    prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.',
  },
  {
    id: 'piq2',
    number: 2,
    title: 'Creative Side',
    prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.',
  },
  {
    id: 'piq3',
    number: 3,
    title: 'Greatest Talent or Skill',
    prompt: 'What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?',
  },
  {
    id: 'piq4',
    number: 4,
    title: 'Educational Opportunity or Barrier',
    prompt: 'Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.',
  },
  {
    id: 'piq5',
    number: 5,
    title: 'Significant Challenge',
    prompt: 'Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement?',
  },
  {
    id: 'piq6',
    number: 6,
    title: 'Inspiring Academic Subject',
    prompt: 'Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom.',
  },
  {
    id: 'piq7',
    number: 7,
    title: 'Community Contribution',
    prompt: 'What have you done to make your school or your community a better place?',
  },
  {
    id: 'piq8',
    number: 8,
    title: 'What Sets You Apart',
    prompt: 'Beyond what has already been shared in your application, what do you believe makes you a strong candidate for admissions to the University of California?',
  },
];

interface PIQPromptSelectorProps {
  selectedPromptId: string | null;
  onPromptSelect: (promptId: string) => void;
  className?: string;
}

export const PIQPromptSelector: React.FC<PIQPromptSelectorProps> = ({
  selectedPromptId,
  onPromptSelect,
  className = '',
}) => {
  const selectedPrompt = UC_PIQ_PROMPTS.find(p => p.id === selectedPromptId);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Select value={selectedPromptId || undefined} onValueChange={onPromptSelect}>
          <SelectTrigger className="h-9 flex-1 bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500 text-sm">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span className="truncate">
                {selectedPrompt ? `PIQ #${selectedPrompt.number}: ${selectedPrompt.title}` : "Select UC PIQ Prompt..."}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {UC_PIQ_PROMPTS.map((prompt) => (
              <SelectItem key={prompt.id} value={prompt.id} className="text-sm">
                <span className="font-medium mr-2">#{prompt.number}</span>
                {prompt.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedPrompt && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-9 w-9 p-0 text-muted-foreground hover:text-indigo-600"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Selected Prompt Display - Collapsible */}
      {selectedPrompt && isExpanded && (
        <div className="text-xs text-muted-foreground bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-md border border-indigo-100 dark:border-indigo-900/50 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
          {selectedPrompt.prompt}
        </div>
      )}
    </div>
  );
};
