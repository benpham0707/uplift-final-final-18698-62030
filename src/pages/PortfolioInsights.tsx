import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Award, Target, Sparkles, Trophy, Lock, Zap, BookOpen, Crown, Brain, Feather, Heart, Compass } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { apiFetch } from '@/lib/utils';

type DetailedInsights = {
  overallScore?: number;
  narrativeSummary?: string;
  hiddenStrengths?: string[];
  prioritizedRecommendations?: { priority: number; action: string; impact?: string; timeline?: string }[];
  dimensions?: Record<string, {
    score?: number;
    evidence?: string[];
    feedback?: string;
    strengths?: string[];
    growthAreas?: string[];
  }>;
};

const DIMENSION_META = [
  { label: 'Academic Excellence', key: 'academicExcellence', icon: BookOpen, color: 'hsl(250 70% 60%)' },
  { label: 'Leadership', key: 'leadershipPotential', icon: Crown, color: 'hsl(145 70% 50%)' },
  { label: 'Intellectual Curiosity', key: 'futureReadiness', icon: Brain, color: 'hsl(195 85% 55%)' },
  { label: 'Storytelling', key: 'overall', icon: Feather, color: 'hsl(280 80% 65%)' },
  { label: 'Character & Community', key: 'communityImpact', icon: Heart, color: 'hsl(35 90% 60%)' },
  { label: 'Future Readiness', key: 'futureReadiness', icon: Compass, color: 'hsl(200 85% 60%)' },
];

const getTierInfo = (score: number | null) => {
  if (!score) return { name: 'Unranked', color: 'hsl(210 15% 60%)', gradient: 'from-gray-400 to-gray-500' };
  if (score >= 9) return { name: 'Elite Scholar', color: 'hsl(280 80% 65%)', gradient: 'from-purple-500 to-pink-500' };
  if (score >= 8.5) return { name: 'Diamond Achiever', color: 'hsl(200 90% 65%)', gradient: 'from-cyan-400 to-blue-500' };
  if (score >= 7) return { name: 'Gold Candidate', color: 'hsl(45 95% 55%)', gradient: 'from-yellow-400 to-orange-500' };
  if (score >= 5) return { name: 'Silver Aspirant', color: 'hsl(210 15% 60%)', gradient: 'from-gray-300 to-gray-400' };
  return { name: 'Bronze Beginner', color: 'hsl(25 70% 50%)', gradient: 'from-orange-600 to-orange-700' };
};

export default function PortfolioInsights() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { search } = useLocation();
  const qp = useMemo(() => new URLSearchParams(search), [search]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overall, setOverall] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<Record<string, number>>({});
  const [detailed, setDetailed] = useState<DetailedInsights | null>(null);

  useEffect(() => {
    let cancelled = false;
    const normalizeDimensions = (raw: any): Record<string, any> => {
      if (!raw || typeof raw !== 'object') return {};
      const map: Record<string, string> = {
        academic: 'academicExcellence',
        leadership: 'leadershipPotential',
        growth: 'futureReadiness',
        readiness: 'futureReadiness',
        community: 'communityImpact',
        uniqueness: 'uniqueValue',
        overall: 'overall',
        academicExcellence: 'academicExcellence',
        leadershipPotential: 'leadershipPotential',
        futureReadiness: 'futureReadiness',
        communityImpact: 'communityImpact',
      };
      const result: Record<string, any> = {};
      Object.entries(raw).forEach(([key, val]) => {
        const target = map[key] || key;
        result[target] = val as any;
      });
      return result;
    };
    async function fetchInsights() {
      try {
        setLoading(true);
        setError(null);
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        const resp = await apiFetch('/api/v1/analytics/portfolio-strength', {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        });
        if (!resp.ok) throw new Error(await resp.text());
        const json = await resp.json();
        if (cancelled) return;
        setOverall(typeof json?.overall === 'number' ? Number(json.overall) : null);
        const normalizedDims = normalizeDimensions(json?.dimensions || {});
        setDimensions(normalizedDims);
        const normalizedDetailed = json?.detailed ? {
          ...json.detailed,
          dimensions: normalizeDimensions(json.detailed.dimensions || {})
        } : null;
        setDetailed(normalizedDetailed);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load insights');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (user) fetchInsights();
    return () => { cancelled = true; };
  }, [user]);

  const targetTop25 = 9.2;
  const gapToTop25 = overall ? Math.max(0, Number((targetTop25 - overall).toFixed(1))) : null;
  const tierInfo = getTierInfo(overall);
  const progress = overall ? (overall / 10) * 100 : 0;

  // Calculate stats
  const masteredCount = Object.values(dimensions).filter(score => score > 8).length;
  const hiddenStrengthsCount = detailed?.hiddenStrengths?.length || 0;
  const questsCount = detailed?.prioritizedRecommendations?.length || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-muted-foreground text-lg">Loading your character sheet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-destructive text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/portfolio-scanner')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tierInfo.gradient} flex items-center justify-center text-white font-bold shadow-lg`}>
                {overall?.toFixed(1) || '—'}
              </div>
              <div>
                <div className="font-semibold text-sm">Character Stats</div>
                <div className="text-xs text-muted-foreground">{tierInfo.name}</div>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Updated in real-time</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section - Character Card */}
        <section className="animate-fade-in">
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 border-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
            <div className="relative p-12">
              <div className="grid md:grid-cols-3 gap-12 items-center">
                {/* Left: Score Circle */}
                <div className="flex justify-center">
                  <div className="relative">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="hsl(220 15% 90%)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke={tierInfo.color}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${progress * 5.53} ${553 - progress * 5.53}`}
                        className="transition-all duration-1000"
                        style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-6xl font-bold" style={{ color: tierInfo.color }}>
                        {overall?.toFixed(1) || '—'}
                      </div>
                      <div className="text-sm text-muted-foreground">/ 10</div>
                    </div>
                  </div>
                </div>

                {/* Center: Character Info */}
                <div className="space-y-4">
                  <div>
                    <Badge className={`bg-gradient-to-r ${tierInfo.gradient} text-white border-0 px-4 py-1 text-sm font-semibold mb-3`}>
                      {tierInfo.name}
                    </Badge>
                    <h1 className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      Your Character Profile
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                      {detailed?.narrativeSummary || 'Your unique journey is being analyzed. Complete your profile to unlock your personalized narrative.'}
                    </p>
                  </div>
                  {gapToTop25 !== null && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">XP to Elite Tier</span>
                        <span className="font-semibold">{gapToTop25} points</span>
                      </div>
                      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(overall || 0) / 10 * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Quick Stats */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-purple-200/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{masteredCount}</div>
                      <div className="text-xs text-muted-foreground">Dimensions Mastered</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-blue-200/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{hiddenStrengthsCount}</div>
                      <div className="text-xs text-muted-foreground">Hidden Abilities</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-orange-200/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{questsCount}</div>
                      <div className="text-xs text-muted-foreground">Active Quests</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Skills Tree - Dimensional Breakdown */}
        <section className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold">Skills & Attributes</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIMENSION_META.map((dim, idx) => {
              const dimData = detailed?.dimensions?.[dim.key] || {};
              const score = typeof dimData?.score === 'number' ? Number(dimData.score) : (dimensions as any)?.[dim.key] || null;
              const Icon = dim.icon;
              
              return (
                <Card 
                  key={dim.key} 
                  className="relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Icon className="w-full h-full" />
                  </div>
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${dim.color}, ${dim.color}dd)` }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{dim.label}</h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold" style={{ color: dim.color }}>
                              {score !== null ? score.toFixed(1) : '—'}
                            </span>
                            <span className="text-sm text-muted-foreground">/10</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (score || 0) * 10))}%`,
                          background: `linear-gradient(90deg, ${dim.color}, ${dim.color}dd)`
                        }}
                      />
                    </div>

                    {dimData.strengths && dimData.strengths.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">✓ Perks Unlocked</div>
                        {dimData.strengths.slice(0, 2).map((s: string, i: number) => (
                          <div key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dimData.growthAreas && dimData.growthAreas.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">⚡ Skill Points to Unlock</div>
                        {dimData.growthAreas.slice(0, 2).map((s: string, i: number) => (
                          <div key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Lock className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quest Board - Priority Actions */}
        <section className="space-y-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-orange-600" />
            <h2 className="text-3xl font-bold">Quest Board</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {detailed?.prioritizedRecommendations && detailed.prioritizedRecommendations.length > 0 ? (
              detailed.prioritizedRecommendations.map((rec, i) => (
                <Card key={i} className="relative overflow-hidden border-2 border-orange-200/50 bg-gradient-to-br from-orange-50/50 to-yellow-50/50 hover:shadow-lg transition-all">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-bl-full" />
                  <div className="relative p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-lg pr-4">{rec.action}</h3>
                      <Badge variant="secondary" className="flex-shrink-0">
                        {'★'.repeat(rec.priority || 1)}
                      </Badge>
                    </div>
                    {rec.impact && (
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        <span className="text-muted-foreground">Reward:</span>
                        <span className="font-semibold text-yellow-700">{rec.impact}</span>
                      </div>
                    )}
                    {rec.timeline && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">⏳ Duration:</span>
                        <span className="font-semibold">{rec.timeline}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center col-span-2 bg-gradient-to-br from-gray-50 to-gray-100">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">Complete your profile assessment to unlock personalized quests</p>
              </Card>
            )}
          </div>
        </section>

        {/* Hidden Abilities */}
        <section className="space-y-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold">Hidden Abilities Discovered</h2>
          </div>
          {detailed?.hiddenStrengths && detailed.hiddenStrengths.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {detailed.hiddenStrengths.map((s, i) => (
                <Badge 
                  key={i} 
                  className="px-6 py-3 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {s}
                </Badge>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50">
              <Lock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <p className="text-muted-foreground">Hidden strengths will be revealed as you complete your profile</p>
            </Card>
          )}
        </section>

        {/* Power-Up Opportunities */}
        <section className="space-y-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl font-bold">Power-Up Opportunities</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(() => {
              const entries = Object.entries((detailed?.dimensions || {})).map(([key, val]: any) => ({
                key,
                score: typeof val?.score === 'number' ? Number(val.score) : (dimensions as any)?.[key] ?? null,
                growthAreas: val?.growthAreas || [],
              })).filter(e => e.score !== null);
              const target = 9.2;
              const sorted = entries
                .map(e => ({ ...e, gap: Math.max(0, Number((target - (e.score as number)).toFixed(1))) }))
                .sort((a, b) => b.gap - a.gap)
                .slice(0, 3);
              
              if (sorted.length === 0) {
                return (
                  <Card className="p-12 text-center col-span-3 bg-gradient-to-br from-green-50 to-emerald-50">
                    <Trophy className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-green-700">All systems optimal! Keep up the great work.</p>
                  </Card>
                );
              }
              
              return sorted.map((e) => {
                const meta = DIMENSION_META.find(m => m.key === e.key);
                return (
                  <Card 
                    key={e.key} 
                    className="relative overflow-hidden border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50"
                  >
                    <div className="absolute top-0 right-0 text-8xl opacity-5">⚠️</div>
                    <div className="relative p-6 space-y-4">
                      <div>
                        <Badge className="bg-red-500 text-white border-0 mb-2">Needs Attention</Badge>
                        <h3 className="font-bold text-xl">{meta?.label || e.key}</h3>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-red-600">-{e.gap}</span>
                        <span className="text-sm text-muted-foreground">point gap</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current</span>
                          <span className="font-semibold">{(e.score as number).toFixed(1)}</span>
                        </div>
                        <Progress value={(e.score as number) * 10} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Target</span>
                          <span>{target}</span>
                        </div>
                      </div>
                      {e.growthAreas.length > 0 && (
                        <div className="space-y-1 pt-2 border-t border-red-200">
                          <div className="text-xs font-semibold uppercase tracking-wide">Quick Wins:</div>
                          {e.growthAreas.slice(0, 2).map((ga: string, idx: number) => (
                            <div key={idx} className="text-sm">• {ga}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              });
            })()}
          </div>
        </section>
      </div>
    </div>
  );
}


