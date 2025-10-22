import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, TrendingUp } from 'lucide-react';

interface OverallScoreCardProps {
  overallScore: number;
  fixedCount: number;
  totalCount: number;
}

export const OverallScoreCard: React.FC<OverallScoreCardProps> = ({
  overallScore,
  fixedCount,
  totalCount
}) => {
  const progressPercent = totalCount > 0 ? (fixedCount / totalCount) * 100 : 0;
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-blue-600 dark:text-blue-400';
    if (score >= 6) return 'text-green-600 dark:text-green-400';
    if (score >= 4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-blue-50 dark:bg-blue-950/20';
    if (score >= 6) return 'bg-green-50 dark:bg-green-950/20';
    if (score >= 4) return 'bg-yellow-50 dark:bg-yellow-950/20';
    return 'bg-red-50 dark:bg-red-950/20';
  };

  return (
    <Card className="border-2 border-primary/20 overflow-hidden">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Award className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Overall Narrative Quality
              </h3>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore.toFixed(1)}
            </span>
            <span className="text-2xl font-semibold text-muted-foreground">/10</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Issues Resolved</span>
            <span className="font-semibold">
              {fixedCount} / {totalCount}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        
        {overallScore >= 8.0 && fixedCount === totalCount ? (
          <p className="text-sm text-primary font-medium">
            Excellent work! Your narrative is ready for admissions officers.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {totalCount - fixedCount > 0 ? (
              <>Address {totalCount - fixedCount} more issue{totalCount - fixedCount !== 1 ? 's' : ''} to improve your score</>
            ) : (
              <>All issues addressed! Keep refining for an even stronger narrative.</>
            )}
          </p>
        )}
      </div>
    </Card>
  );
};
