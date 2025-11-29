import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ThemedPillVariant = 'red' | 'green' | 'purple';

interface ThemedPillButtonProps {
  variant: ThemedPillVariant;
  isExpanded: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ThemedPillVariant, string> = {
  red: cn(
    'bg-gradient-to-r from-red-50 to-pink-50',
    'dark:from-red-950/30 dark:to-pink-950/30',
    'border border-red-200 dark:border-red-800',
    'hover:border-red-300 dark:hover:border-red-700',
    'text-red-900 dark:text-red-100'
  ),
  green: cn(
    'bg-gradient-to-r from-green-50 to-emerald-50',
    'dark:from-green-950/30 dark:to-emerald-950/30',
    'border border-green-200 dark:border-green-800',
    'hover:border-green-300 dark:hover:border-green-700',
    'text-green-900 dark:text-green-100'
  ),
  purple: cn(
    'bg-gradient-to-r from-purple-50 to-blue-50',
    'dark:from-purple-950/30 dark:to-blue-950/30',
    'border border-purple-200 dark:border-purple-800',
    'hover:border-purple-300 dark:hover:border-purple-700',
    'text-purple-900 dark:text-purple-100'
  ),
};

export const ThemedPillButton: React.FC<ThemedPillButtonProps> = ({
  variant,
  isExpanded,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'hover:shadow-sm transition-all',
        'text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
      {isExpanded ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
    </button>
  );
};

export default ThemedPillButton;
