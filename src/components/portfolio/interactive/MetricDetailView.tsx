import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MetricType } from './InteractivePortfolioCard';
import { TrendingUp, CheckCircle, AlertCircle, Target } from 'lucide-react';

interface MetricDetailViewProps {
  metricType: MetricType | null;
}

// Hard-coded mock data for metric details
const METRIC_DETAILS: Record<string, any> = {
  academic: {
    score: 7.8,
    percentile: 78,
    strengths: [
      'Strong GPA of 3.9 unweighted',
      'Consistent performance across all subjects',
      'Advanced coursework in STEM fields',
    ],
    improvements: [
      'Consider taking more AP courses',
      'Strengthen standardized test scores',
      'Pursue academic competitions',
    ],
    breakdown: [
      { label: 'GPA', score: 8.5, max: 10 },
      { label: 'Course Rigor', score: 7.5, max: 10 },
      { label: 'Test Scores', score: 7.0, max: 10 },
      { label: 'Academic Awards', score: 8.0, max: 10 },
    ],
    comparison: {
      yourScore: 7.8,
      ivy: 9.2,
      topPublic: 8.5,
      average: 6.5,
    },
  },
  leadership: {
    score: 8.5,
    percentile: 85,
    strengths: [
      'Founded and led community service organization',
      'Mentored 20+ younger students',
      'Organized multiple large-scale events',
    ],
    improvements: [
      'Document leadership outcomes with metrics',
      'Expand leadership to state/national level',
      'Develop more leadership philosophy',
    ],
    breakdown: [
      { label: 'Initiative', score: 9.0, max: 10 },
      { label: 'Impact', score: 8.5, max: 10 },
      { label: 'Team Building', score: 8.0, max: 10 },
      { label: 'Innovation', score: 8.5, max: 10 },
    ],
    comparison: {
      yourScore: 8.5,
      ivy: 9.5,
      topPublic: 8.8,
      average: 6.8,
    },
  },
  extracurricular: {
    score: 9.1,
    percentile: 91,
    strengths: [
      'Deep commitment to chosen activities',
      'Multiple leadership positions',
      'State and national recognition',
    ],
    improvements: [
      'Connect activities to career interests',
      'Seek summer programs at top universities',
      'Publish work or present at conferences',
    ],
    breakdown: [
      { label: 'Depth', score: 9.5, max: 10 },
      { label: 'Breadth', score: 8.5, max: 10 },
      { label: 'Achievement', score: 9.0, max: 10 },
      { label: 'Passion', score: 9.5, max: 10 },
    ],
    comparison: {
      yourScore: 9.1,
      ivy: 9.3,
      topPublic: 8.9,
      average: 7.2,
    },
  },
  readiness: {
    score: 8.5,
    percentile: 85,
    strengths: [
      'Strong essay drafts completed',
      'Clear narrative across applications',
      'Solid recommendation letters secured',
    ],
    improvements: [
      'Polish essays with professional feedback',
      'Prepare for interviews',
      'Complete supplemental essays early',
    ],
    breakdown: [
      { label: 'Essays', score: 8.5, max: 10 },
      { label: 'Recommendations', score: 9.0, max: 10 },
      { label: 'Test Strategy', score: 8.0, max: 10 },
      { label: 'Timeline', score: 8.5, max: 10 },
    ],
    comparison: {
      yourScore: 8.5,
      ivy: 9.0,
      topPublic: 8.7,
      average: 7.5,
    },
  },
  community: {
    score: 8.3,
    percentile: 83,
    strengths: [
      '200+ volunteer hours documented',
      'Consistent community engagement',
      'Focus on educational equity',
    ],
    improvements: [
      'Quantify community impact',
      'Start a community initiative',
      'Partner with local organizations',
    ],
    breakdown: [
      { label: 'Service Hours', score: 8.5, max: 10 },
      { label: 'Impact', score: 8.0, max: 10 },
      { label: 'Leadership', score: 8.5, max: 10 },
      { label: 'Consistency', score: 8.5, max: 10 },
    ],
    comparison: {
      yourScore: 8.3,
      ivy: 9.0,
      topPublic: 8.6,
      average: 7.0,
    },
  },
  courseRigor: {
    score: 7.5,
    percentile: 75,
    strengths: [
      '8 AP courses taken or in progress',
      'Honors courses in most subjects',
      'Strong performance in advanced classes',
    ],
    improvements: [
      'Take more AP/IB courses senior year',
      'Consider dual enrollment',
      'Pursue independent study projects',
    ],
    breakdown: [
      { label: 'AP/IB Courses', score: 7.5, max: 10 },
      { label: 'Course Selection', score: 7.0, max: 10 },
      { label: 'Performance', score: 8.0, max: 10 },
      { label: 'Challenge Level', score: 7.5, max: 10 },
    ],
    comparison: {
      yourScore: 7.5,
      ivy: 9.5,
      topPublic: 8.8,
      average: 6.5,
    },
  },
};

export const MetricDetailView: React.FC<MetricDetailViewProps> = ({ metricType }) => {
  if (!metricType) return null;

  const details = METRIC_DETAILS[metricType];
  if (!details) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Overview */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-primary">{details.score}</div>
              <div className="text-sm text-muted-foreground">Your Score</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-foreground">{details.percentile}th</div>
              <div className="text-sm text-muted-foreground">Percentile</div>
            </div>
          </div>
          <Progress value={details.score * 10} className="h-3" />
        </CardContent>
      </Card>

      {/* Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Score Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {details.breakdown.map((item: any, idx: number) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-sm text-muted-foreground">
                  {item.score} / {item.max}
                </span>
              </div>
              <Progress value={(item.score / item.max) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Key Strengths
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {details.strengths.map((strength: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{strength}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="h-5 w-5" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {details.improvements.map((improvement: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-amber-500/5 rounded-lg border border-amber-500/20">
              <TrendingUp className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{improvement}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* School Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>School Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">Your Score</span>
              <Badge variant="default" className="text-base">{details.comparison.yourScore}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Ivy League Average</span>
              <span className="text-sm font-medium text-foreground">{details.comparison.ivy}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Top Public Universities</span>
              <span className="text-sm font-medium text-foreground">{details.comparison.topPublic}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">National Average</span>
              <span className="text-sm font-medium text-foreground">{details.comparison.average}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
