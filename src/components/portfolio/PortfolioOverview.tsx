import { useState } from 'react';
import { DifferentiatorCard } from './DifferentiatorCard';
import { ImpactMetricCard } from './ImpactMetricCard';
import { Brain, Lightbulb, Users, Network, Award, UserCheck, DollarSign, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - these values are hard coded as placeholders for demonstration
// In production, this data would come from API analysis of the user's portfolio
const MOCK_DIFFERENTIATORS = [
  {
    id: 'systems-thinking',
    title: 'Systems Thinking',
    description: 'Consistently demonstrates ability to map complex interconnections across research workflows, identifying leverage points that amplify project impact.',
    icon: Brain,
    colorFrom: 'hsl(var(--primary))',
    colorTo: 'hsl(var(--primary))',
    effect: 'Research & Leadership',
    evidence: '3 projects, 2 recommendations',
    isPinned: false,
  },
  {
    id: 'community-builder',
    title: 'Community Builder',
    description: 'Natural ability to cultivate inclusive environments where diverse perspectives thrive, resulting in sustained engagement and measurable outcomes.',
    icon: Users,
    colorFrom: 'hsl(var(--chart-1))',
    colorTo: 'hsl(var(--chart-2))',
    effect: 'Volunteering & Leadership',
    evidence: '500+ people reached',
    isPinned: true,
  },
  {
    id: 'innovative-problem-solver',
    title: 'Innovative Problem Solver',
    description: 'Approaches challenges with creative frameworks that bridge technical and human-centered design, leading to novel solutions.',
    icon: Lightbulb,
    colorFrom: 'hsl(var(--chart-3))',
    colorTo: 'hsl(var(--chart-4))',
    effect: 'Projects & Research',
    evidence: '2 competitions, 1 patent',
    isPinned: false,
  },
  {
    id: 'cross-disciplinary',
    title: 'Cross-Disciplinary Integration',
    description: 'Seamlessly connects insights from multiple fields to create holistic solutions that address root causes rather than symptoms.',
    icon: Network,
    colorFrom: 'hsl(var(--chart-5))',
    colorTo: 'hsl(var(--accent))',
    effect: 'Academic & Projects',
    evidence: 'Coursework + 2 projects',
    isPinned: false,
  },
];

// Mock impact data - hard coded placeholder values for demonstration
// Would come from aggregated portfolio analytics in production
const MOCK_IMPACT_METRICS = [
  {
    label: 'People Reached',
    value: 1247,
    unit: 'individuals',
    trend: 'up' as const,
    trendValue: '+23%',
    icon: UserCheck,
    color: 'hsl(var(--chart-1))',
    sparklineData: [
      { value: 800 }, { value: 950 }, { value: 1100 }, { value: 1050 }, 
      { value: 1150 }, { value: 1200 }, { value: 1247 }
    ],
    verificationStatus: 'verified' as const,
  },
  {
    label: 'Funds Raised',
    value: 15400,
    unit: 'USD',
    trend: 'up' as const,
    trendValue: '+12%',
    icon: DollarSign,
    color: 'hsl(var(--chart-2))',
    sparklineData: [
      { value: 10000 }, { value: 11500 }, { value: 12000 }, { value: 13500 }, 
      { value: 14200 }, { value: 14800 }, { value: 15400 }
    ],
    verificationStatus: 'verified' as const,
  },
  {
    label: 'Service Hours',
    value: 342,
    unit: 'hours',
    trend: 'up' as const,
    trendValue: '+8%',
    icon: Clock,
    color: 'hsl(var(--chart-3))',
    sparklineData: [
      { value: 250 }, { value: 270 }, { value: 285 }, { value: 300 }, 
      { value: 315 }, { value: 330 }, { value: 342 }
    ],
    verificationStatus: 'pending' as const,
  },
  {
    label: 'Testimonials',
    value: 18,
    unit: 'received',
    trend: 'stable' as const,
    trendValue: '0%',
    icon: MessageSquare,
    color: 'hsl(var(--chart-4))',
    sparklineData: [
      { value: 15 }, { value: 16 }, { value: 16 }, { value: 17 }, 
      { value: 18 }, { value: 18 }, { value: 18 }
    ],
    verificationStatus: 'unverified' as const,
  },
];

export function PortfolioOverview() {
  const [differentiators, setDifferentiators] = useState(MOCK_DIFFERENTIATORS);
  const [showAllDifferentiators, setShowAllDifferentiators] = useState(false);
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const handlePin = (id: string) => {
    setDifferentiators(prev => {
      const updated = prev.map(d => 
        d.id === id ? { ...d, isPinned: !d.isPinned } : d
      );
      // Sort: pinned first
      return updated.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    });
  };

  const displayedDifferentiators = showAllDifferentiators 
    ? differentiators 
    : differentiators.slice(0, 3);

  const displayedMetrics = showAllMetrics 
    ? MOCK_IMPACT_METRICS 
    : MOCK_IMPACT_METRICS.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Portfolio Overview</h2>
        <p className="text-sm text-muted-foreground">
          Your standout strengths and measurable impact at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Differentiators Section - 60% width on desktop */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Differentiators
            </h3>
            <span className="text-xs text-muted-foreground">
              {differentiators.filter(d => d.isPinned).length} pinned
            </span>
          </div>
          
          <div className="space-y-3">
            {displayedDifferentiators.map((diff, index) => (
              <div 
                key={diff.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DifferentiatorCard {...diff} onPin={handlePin} />
              </div>
            ))}
          </div>

          {differentiators.length > 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllDifferentiators(!showAllDifferentiators)}
              className="w-full"
            >
              {showAllDifferentiators ? 'Show Less' : `Show ${differentiators.length - 3} More`}
            </Button>
          )}
        </div>

        {/* Impact Summary Section - 40% width on desktop */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-chart-1" />
              Impact Summary
            </h3>
          </div>

          <div className="space-y-3">
            {displayedMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ImpactMetricCard {...metric} />
              </div>
            ))}
          </div>

          {MOCK_IMPACT_METRICS.length > 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllMetrics(!showAllMetrics)}
              className="w-full"
            >
              {showAllMetrics ? 'Show Less' : `Show ${MOCK_IMPACT_METRICS.length - 3} More`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
