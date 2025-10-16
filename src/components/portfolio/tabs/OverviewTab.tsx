import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCard from '@/components/portfolio/ProfileCard';
import { Rocket, Target, TrendingUp, ArrowRight, LayoutDashboard, Award, MapPin, FileText, Lightbulb, Sparkles } from 'lucide-react';
import { HolisticSummary, renderRich } from '../portfolioInsightsData';
import { NavigationControls } from '../NavigationControls';
import { ScoreIndicator } from '../ScoreIndicator';

interface OverviewTabProps {
  summary: HolisticSummary;
  onNavigateToTab?: (tab: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ summary, onNavigateToTab, activeTab = 'overview', onTabChange }) => {
  const overall100 = Math.round(summary.overallScore * 10);
  const insight = summary.overarchingInsight;

  if (!insight) return null;

  return (
    <div className="space-y-8">
      {/* Player Card */}
      <div className="flex justify-center">
        <ProfileCard
          name={'Your Portfolio'}
          title={`${summary.tierName} • ${summary.tierPercentile}`}
          handle="portfolio"
          status="Analyzed"
          avatarUrl={undefined}
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
        >
          <div className="pc-sides">
            <div className="pc-side-col">
              <div className="pc-side-line">
                <div className="pc-side-num">7.8</div>
                <div className="pc-side-label">Academic</div>
              </div>
              <div className="pc-side-line">
                <div className="pc-side-num">8.5</div>
                <div className="pc-side-label">Readiness</div>
              </div>
            </div>
            <div className="pc-side-col">
              <div className="pc-side-line">
                <div className="pc-side-num">8.5</div>
                <div className="pc-side-label">Leadership</div>
              </div>
              <div className="pc-side-line">
                <div className="pc-side-num">8.3</div>
                <div className="pc-side-label">Community</div>
              </div>
            </div>
          </div>
          <div className="pc-overall-plaque">
            <div className="pc-overall-num">{overall100}</div>
            <div className="pc-overall-label">Overall</div>
          </div>
        </ProfileCard>
      </div>

      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Your Portfolio Verdict</h2>
        <p className="text-muted-foreground">The backbone of your narrative, your strengths to amplify, and critical improvements needed</p>
      </div>

      {/* Tab Navigation */}
      {onTabChange && (
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto gap-2 bg-muted/50 p-2">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-background">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
            <TabsTrigger value="recognition" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Recognition</span>
            </TabsTrigger>
            <TabsTrigger value="trajectory" className="flex items-center gap-2 data-[state=active]:bg-background">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Trajectory</span>
            </TabsTrigger>
            <TabsTrigger value="coherence" className="flex items-center gap-2 data-[state=active]:bg-background">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Coherence</span>
            </TabsTrigger>
            <TabsTrigger value="evidence" className="flex items-center gap-2 data-[state=active]:bg-background">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Evidence</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Actions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <OverviewContent insight={insight} onNavigateToTab={onNavigateToTab} />
          </TabsContent>

          <TabsContent value="impact" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Impact Footprint tab coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="recognition" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Recognition Mix tab coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="trajectory" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Trajectory & Durability tab coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="coherence" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Coherence (with contextual factors) coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="evidence" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Evidence & Analysis tab coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Recommendations tab coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

// Separate component for overview content
const OverviewContent: React.FC<{ insight: any; onNavigateToTab?: (tab: string) => void }> = ({ insight, onNavigateToTab }) => {
  const [spineIndex, setSpineIndex] = React.useState(0);
  const [spikeIndex, setSpikeIndex] = React.useState(0);
  const [liftIndex, setLiftIndex] = React.useState(0);
  const [storyIndex, setStoryIndex] = React.useState(0);

  const { verdictOptions, storyTellingOptions } = insight;

  // Auto-select highest-scored options on mount
  React.useEffect(() => {
    const findHighestIndex = (options: any[]) => {
      return options.reduce((maxIdx, curr, idx, arr) => 
        curr.score > arr[maxIdx].score ? idx : maxIdx, 0
      );
    };

    setSpineIndex(findHighestIndex(verdictOptions.spine));
    setSpikeIndex(findHighestIndex(verdictOptions.spike));
    setLiftIndex(findHighestIndex(verdictOptions.lift));
    setStoryIndex(findHighestIndex(storyTellingOptions));
  }, [verdictOptions, storyTellingOptions]);

  const currentSpine = verdictOptions.spine[spineIndex];
  const currentSpike = verdictOptions.spike[spikeIndex];
  const currentLift = verdictOptions.lift[liftIndex];
  const currentStory = storyTellingOptions[storyIndex];

  const isHighestScore = (options: any[], index: number) => {
    return options[index].score === Math.max(...options.map(o => o.score));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* SPINE - Full width at top (most important) */}
      <Card className="relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Your Narrative Thread</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                The cohesive story connecting all your activities
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <ScoreIndicator 
                score={currentSpine.score} 
                isRecommended={isHighestScore(verdictOptions.spine, spineIndex)}
              />
              <NavigationControls
                current={spineIndex}
                total={verdictOptions.spine.length}
                onPrev={() => setSpineIndex(prev => Math.max(0, prev - 1))}
                onNext={() => setSpineIndex(prev => Math.min(verdictOptions.spine.length - 1, prev + 1))}
              />
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-foreground">
            {renderRich(currentSpine.text)}
          </p>

          {currentSpine.reasoning && (
            <p className="text-xs text-muted-foreground pt-3 border-t">
              <strong>Why this works:</strong> {currentSpine.reasoning}
            </p>
          )}
        </div>
      </Card>

      {/* SPIKE & LIFT - Side by side (more room for each) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SPIKE - What to amplify */}
        <Card className="relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-foreground" />
                  <h3 className="text-base font-semibold">What Stands Out</h3>
                </div>
                <p className="text-xs text-muted-foreground">Your strongest differentiators</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <ScoreIndicator 
                  score={currentSpike.score}
                  isRecommended={isHighestScore(verdictOptions.spike, spikeIndex)}
                />
                <NavigationControls
                  current={spikeIndex}
                  total={verdictOptions.spike.length}
                  onPrev={() => setSpikeIndex(prev => Math.max(0, prev - 1))}
                  onNext={() => setSpikeIndex(prev => Math.min(verdictOptions.spike.length - 1, prev + 1))}
                />
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-foreground/90">
              {renderRich(currentSpike.text)}
            </p>

            {currentSpike.reasoning && (
              <p className="text-xs text-muted-foreground pt-2 border-t">
                {currentSpike.reasoning}
              </p>
            )}
          </div>
        </Card>

        {/* LIFT - Biggest improvement */}
        <Card className="relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-foreground" />
                  <h3 className="text-base font-semibold">What to Improve</h3>
                </div>
                <p className="text-xs text-muted-foreground">Critical gaps to address</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <ScoreIndicator 
                  score={currentLift.score}
                  isRecommended={isHighestScore(verdictOptions.lift, liftIndex)}
                />
                <NavigationControls
                  current={liftIndex}
                  total={verdictOptions.lift.length}
                  onPrev={() => setLiftIndex(prev => Math.max(0, prev - 1))}
                  onNext={() => setLiftIndex(prev => Math.min(verdictOptions.lift.length - 1, prev + 1))}
                />
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-foreground/90">
              {renderRich(currentLift.text)}
            </p>

            {currentLift.reasoning && (
              <p className="text-xs text-muted-foreground pt-2 border-t">
                {currentLift.reasoning}
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Story Coherence */}
      <Card className="shadow-sm">
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold text-foreground">Story Coherence</h3>
            </div>
            <span className="text-lg font-bold text-primary">{insight.storyCoherencePercent}%</span>
          </div>
          <Progress value={insight.storyCoherencePercent} className="h-2" />
          <p className="text-sm text-foreground/90 leading-relaxed">
            {renderRich(insight.storyCoherenceLine)}
          </p>
        </div>
      </Card>

      {/* How to Tell This Story */}
      <Card className="relative overflow-hidden shadow-sm">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Strategic Positioning
              </p>
              <h3 className="text-xl font-bold text-foreground">{currentStory.positioning}</h3>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <ScoreIndicator 
                score={currentStory.score}
                isRecommended={isHighestScore(storyTellingOptions, storyIndex)}
              />
              <NavigationControls
                current={storyIndex}
                total={storyTellingOptions.length}
                onPrev={() => setStoryIndex(prev => Math.max(0, prev - 1))}
                onNext={() => setStoryIndex(prev => Math.min(storyTellingOptions.length - 1, prev + 1))}
              />
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-foreground/90">
            {renderRich(currentStory.narrative)}
          </p>

          {currentStory.reasoning && (
            <p className="text-xs text-muted-foreground pt-3 border-t">
              <strong>Rationale:</strong> {currentStory.reasoning}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button 
              size="default"
              onClick={() => onNavigateToTab?.('evidence')}
              className="gap-2"
            >
              View Evidence
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="default"
              onClick={() => onNavigateToTab?.('recommendations')}
              className="gap-2"
            >
              See Actions
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
