import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home,
  Rocket,
  Briefcase,
  MessageSquare,
  ChevronRight,
  Star,
  Lightbulb,
  Target,
  Brain,
  Globe,
  Code,
  Heart,
  Palette
} from 'lucide-react';

/*
  Hard coded data values for demo purposes:
  - discoveryInsights: AI analysis about interests, problems, skills, uniqueness
  - collaborationModes: Available AI collaboration modes and usage stats
  - projectTypes: Categories with strategies, examples, difficulty, time
  - projectPipeline: In-progress projects with progress and milestones
*/
const discoveryInsights = [
  {
    id: 1,
    type: 'Interest Mining',
    insight: 'Your passion for environmental issues + coding skills = sustainability tech opportunity',
    confidence: 92,
    timestamp: '2 hours ago',
    actionable: true,
    category: 'discovery'
  },
  {
    id: 2,
    type: 'Problem Identification',
    insight: 'Campus food waste could be reduced by 40% with a student-dining hall connection app',
    confidence: 87,
    timestamp: '5 hours ago',
    actionable: true,
    category: 'problem'
  },
  {
    id: 3,
    type: 'Skill Gap Analysis',
    insight: 'You have 80% of skills needed for ML projects — add data visualization',
    confidence: 94,
    timestamp: '1 day ago',
    actionable: false,
    category: 'skills'
  },
  {
    id: 4,
    type: 'Uniqueness Check',
    insight: 'Mental health chatbots are saturated — consider physical wellness or habit systems',
    confidence: 89,
    timestamp: '2 days ago',
    actionable: true,
    category: 'uniqueness'
  }
];

const collaborationModes = [
  {
    mode: 'Socratic Mode',
    description: 'AI asks probing questions to help you discover your own ideas',
    active: true,
    examples: [
      'What problems do you encounter daily that frustrate you?',
      'What would need to be true for this solution to work?',
      'Who would benefit most from this? How would you reach them?'
    ],
    icon: MessageSquare,
    color: 'from-blue-500/20 to-indigo-500/20',
    sessions: 12,
    avgDuration: '15 min'
  },
  {
    mode: 'Development Partner',
    description: 'Architecture, feature prioritization, roadmapping, testing, launch planning',
    active: false,
    examples: [
      "Let's break down your app architecture",
      'How should we prioritize these features?',
      "What's the minimal viable version?"
    ],
    icon: Code,
    color: 'from-green-500/20 to-emerald-500/20',
    sessions: 8,
    avgDuration: '25 min'
  }
];

const projectTypes = [
  {
    type: 'Technical Projects',
    description: 'Open source, hackathons, research, apps with real users',
    icon: Code,
    strategies: [
      'Open source contributions strategy',
      'Hackathon project development',
      'Research project formulation',
      'App/tool development with real users'
    ],
    examples: [
      'Contribute to a popular library',
      'Productivity app for students',
      'Research tool for professors'
    ],
    difficulty: 'Medium',
    timeCommitment: '2-6 months',
    color: 'from-blue-500/10 to-indigo-500/10'
  },
  {
    type: 'Social Impact Projects',
    description: 'Community problem identification and stakeholder engagement',
    icon: Heart,
    strategies: [
      'Community problem identification',
      'Stakeholder engagement planning',
      'Impact measurement frameworks',
      'Sustainability planning'
    ],
    examples: [
      'Food waste initiative',
      'Mental health awareness',
      'Digital literacy for seniors'
    ],
    difficulty: 'High',
    timeCommitment: '3-12 months',
    color: 'from-red-500/10 to-pink-500/10'
  },
  {
    type: 'Creative Projects',
    description: 'Portfolio development, content creation, audience building',
    icon: Palette,
    strategies: [
      'Portfolio piece development',
      'Content creation strategy',
      'Audience building approach',
      'Monetization exploration'
    ],
    examples: [
      'YouTube study series',
      'Campus photography project',
      'Interview podcast'
    ],
    difficulty: 'Low',
    timeCommitment: '1-4 months',
    color: 'from-purple-500/10 to-violet-500/10'
  }
];

const projectPipeline = [
  {
    id: 1,
    title: 'Campus Sustainability Tracker',
    type: 'Technical',
    stage: 'Development',
    progress: 75,
    description: 'Mobile app tracking individual and dorm sustainability metrics',
    nextMilestone: 'Beta testing with 3 dorms',
    uniquenessScore: 8.5,
    impact: 'Medium',
    collaborationMode: 'Development Partner',
    estimatedCompletion: '3 weeks'
  },
  {
    id: 2,
    title: 'Study Abroad Financial Planning',
    type: 'Social Impact',
    stage: 'Ideation',
    progress: 30,
    description: 'Platform for planning and budgeting for study abroad',
    nextMilestone: 'Market research interviews',
    uniquenessScore: 9.2,
    impact: 'High',
    collaborationMode: 'Socratic Mode',
    estimatedCompletion: '8 weeks'
  }
];

function getInsightIcon(category: string) {
  switch (category) {
    case 'discovery': return Lightbulb;
    case 'problem': return Target;
    case 'skills': return Brain;
    default: return Star;
  }
}

function getStageColor(stage: string) {
  switch (stage) {
    case 'Development': return 'bg-blue-500/10 text-blue-700 border-blue-200';
    case 'Ideation': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
    case 'Planning': return 'bg-purple-500/10 text-purple-700 border-purple-200';
    case 'Testing': return 'bg-green-500/10 text-green-700 border-green-200';
    default: return 'bg-muted text-foreground border-border';
  }
}

const ProjectIncubationSystem = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  // Basic SEO tags
  useEffect(() => {
    document.title = 'Project Incubation System – Next Moves Engine';
    const desc = 'AI-collaborative project development that ensures uniqueness and impact.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/extracurricular-optimizer/projects');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center space-x-2 text-xl font-bold text-primary">
            <Home className="h-5 w-5" />
            <span>Uplift</span>
          </Button>

          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm" onClick={() => navigate('/extracurricular-optimizer')}>
              Back to Extracurricular
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/academic-planner')}>
              Academic Planner
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            {loading ? (
              <div className="h-4 w-16 bg-muted animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign Out</Button>
              </div>
            ) : (
              <Button variant="default" size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Project Incubation System</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Build projects that actually matter</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-collaborative project development that ensures uniqueness and impact. From discovery to launch.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span>Project Pipeline</span>
                  </span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{projectPipeline.length} Active</Badge>
                </CardTitle>
                <CardDescription>Your current projects in development with AI collaboration</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  {/* Scroll cutoff enhancer */}
                  <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/60 mb-4">
                    <div className="h-3 bg-gradient-to-b from-border/40 to-transparent"></div>
                  </div>
                  <div className="space-y-4">
                    {projectPipeline.map((project) => (
                      <Card key={project.id} className="border-l-4 border-l-primary/50 hover:border-l-primary transition-colors">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">{project.title}</h4>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                            <Badge className={getStageColor(project.stage)}>{project.stage}</Badge>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <span className="text-xs text-muted-foreground">Progress</span>
                              <Progress value={project.progress} className="w-20" />
                              <span className="text-xs font-medium">{project.progress}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs font-medium">{project.uniquenessScore}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>Next: {project.nextMilestone}</span>
                            <span>{project.estimatedCompletion}</span>
                          </div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="h-3 w-3" />
                              <span className="text-xs">{project.collaborationMode}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Project Types & Strategies</span>
                </CardTitle>
                <CardDescription>Different approaches to project development with strategic guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectTypes.map((type) => {
                    const Icon = type.icon as any;
                    return (
                      <Card key={type.type} className={`border transition-all hover:scale-105 cursor-pointer bg-gradient-to-br ${type.color}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Icon className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold">{type.type}</h4>
                            </div>
                            <Badge variant="outline" className="text-xs text-muted-foreground">{type.difficulty}</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            {type.strategies.map((s, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></span>
                                <span className="text-foreground/90">{s}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>Project Discovery Insights</span>
                </CardTitle>
                <CardDescription>AI-curated signals from your interests, skills, and market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discoveryInsights.map((insight) => {
                    const Icon = getInsightIcon(insight.category);
                    return (
                      <div key={insight.id} className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="font-medium text-foreground">{insight.type}</span>
                          </div>
                          <Badge variant={insight.actionable ? 'default' : 'secondary'} className="text-xs">
                            {insight.actionable ? 'Actionable' : 'Info'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{insight.insight}</p>
                        <div className="text-xs text-muted-foreground mt-2">{insight.timestamp}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>AI Collaboration Modes</span>
                </CardTitle>
                <CardDescription>Pick how you want to work with the AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {collaborationModes.map((m) => {
                    const Icon = m.icon as any;
                    return (
                      <div key={m.mode} className={`p-3 rounded-lg border bg-gradient-to-br ${m.color}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <div className="font-medium text-foreground">{m.mode}</div>
                          </div>
                          <Badge variant={m.active ? 'default' : 'secondary'} className="text-xs">{m.active ? 'Active' : 'Available'}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">{m.description}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ProjectIncubationSystem;
