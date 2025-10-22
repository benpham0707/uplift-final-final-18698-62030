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
    <Card className={`${getScoreBg(overallScore)} border-2 shadow-strong overflow-hidden`}>
      <div className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-medium">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Overall Narrative Quality
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Based on rubric analysis
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`text-6xl font-bold tracking-tight ${getScoreColor(overallScore)}`}>
                {overallScore.toFixed(1)}
              </span>
              <span className="text-3xl font-semibold text-muted-foreground">/10</span>
            </div>
          </div>
          <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${
            overallScore >= 8 ? 'from-blue-500 to-purple-500' :
            overallScore >= 6 ? 'from-green-500 to-emerald-500' :
            overallScore >= 4 ? 'from-yellow-500 to-amber-500' :
            'from-red-500 to-orange-500'
          } flex items-center justify-center shadow-medium`}>
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <div className="space-y-3 bg-background/50 backdrop-blur-sm rounded-xl p-4 border">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">Issues Resolved</span>
            <span className="font-bold text-lg text-primary">
              {fixedCount}<span className="text-muted-foreground font-normal"> / {totalCount}</span>
            </span>
          </div>
          <Progress value={progressPercent} className="h-2.5" />
        </div>
        
        {overallScore >= 8.0 && fixedCount === totalCount ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-800 p-4 rounded-xl">
            <p className="text-sm font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Excellent work! Your narrative is ready for admissions officers.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground px-1">
            {totalCount - fixedCount > 0 ? (
              <>Address <span className="font-semibold text-foreground">{totalCount - fixedCount}</span> more issue{totalCount - fixedCount !== 1 ? 's' : ''} to improve your score</>
            ) : (
              <>All issues addressed! Keep refining for an even stronger narrative.</>
            )}
          </p>
        )}
      </div>
    </Card>
  );
};
